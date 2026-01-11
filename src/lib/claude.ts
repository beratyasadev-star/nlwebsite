import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

type TargetLanguage = 'ku' | 'ar'

interface TranslateOptions {
  text: string
  targetLang: TargetLanguage
  contentType?: 'title' | 'excerpt' | 'richtext'
}

interface LanguageConfig {
  name: string
  nativeName: string
  direction: 'ltr' | 'rtl'
  notes: string
}

const languageConfigs: Record<TargetLanguage, LanguageConfig> = {
  ku: {
    name: 'Kürtçe (Kurmancî)',
    nativeName: 'Kurdî (Kurmancî)',
    direction: 'ltr',
    notes: `- Latin alfabesi kullan (Kurmancî standart yazımı)
- Doğal Kurmancî dilbilgisi uygula
- Türkçe veya Arapça kelimeler yerine Kürtçe karşılıkları tercih et
- Resmi ama samimi bir ton kullan`
  },
  ar: {
    name: 'Arapça',
    nativeName: 'العربية',
    direction: 'rtl',
    notes: `- Modern Standart Arapça (Fusha) kullan
- Mültecilere uygun sade ve anlaşılır bir dil kullan
- Teknik terimleri açık şekilde ifade et
- Resmi ama samimi bir ton kullan`
  }
}

/**
 * Claude API ile metin çevirisi yapar
 */
export async function translateWithClaude({
  text,
  targetLang,
  contentType = 'richtext'
}: TranslateOptions): Promise<string> {

  if (!text || text.trim() === '') {
    return ''
  }

  const config = languageConfigs[targetLang]

  const systemPrompt = `Sen profesyonel bir Türkçe-${config.name} çevirmensin.
Hollanda'daki mültecilere yönelik bilgilendirici içerikleri çeviriyorsun.

TEMEL KURALLAR:
- Doğal ve akıcı bir çeviri yap, kelime kelime çevirme
- Cümle yapısını hedef dilin gramerine uygun şekilde düzenle
${config.notes}

ÖNEMLİ - AYNEN KORU (çevirme):
- Kurum isimleri: IND, COA, DigiD, BSN, UWV, DUO, RVO, SVB, CAK
- Ülke/şehir isimleri: Hollanda, Nederland, Amsterdam, Rotterdam, vb.
- Teknik terimler: verblijfsvergunning, inburgeringsexamen, vb.
- URL'ler ve e-posta adresleri
- Tarihler ve sayılar

FORMAT:
- Eğer metin HTML içeriyorsa HTML etiketlerini koru
- Eğer metin Markdown içeriyorsa Markdown formatını koru
- Sadece çeviriyi döndür, açıklama veya not ekleme`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `Aşağıdaki Türkçe metni ${config.name} diline çevir:

${text}`
      }],
      system: systemPrompt,
    })

    if (response.content[0].type === 'text') {
      return response.content[0].text.trim()
    }

    return ''
  } catch (error) {
    console.error(`Translation error (${targetLang}):`, error)
    throw new Error(`Çeviri başarısız: ${targetLang}`)
  }
}

/**
 * Birden fazla metni toplu olarak çevirir
 */
export async function translateBatch(
  texts: string[],
  targetLang: TargetLanguage
): Promise<string[]> {
  const results: string[] = []

  for (const text of texts) {
    if (text && text.trim()) {
      const translated = await translateWithClaude({ text, targetLang })
      results.push(translated)
    } else {
      results.push('')
    }
  }

  return results
}

/**
 * Slate RichText JSON'dan düz metin çıkarır
 */
export function slateToPlainText(nodes: any[]): string {
  if (!nodes || !Array.isArray(nodes)) {
    return ''
  }

  return nodes.map(node => {
    // Text node
    if (node.text !== undefined) {
      return node.text
    }

    // Element node with children
    if (node.children && Array.isArray(node.children)) {
      const childText = slateToPlainText(node.children)

      // Add appropriate spacing based on block type
      if (['paragraph', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'].includes(node.type)) {
        return childText + '\n\n'
      }

      return childText
    }

    return ''
  }).join('').trim()
}

/**
 * Çevrilmiş metni basit Slate JSON yapısına dönüştürür
 */
export function plainTextToSlate(text: string): any[] {
  if (!text || text.trim() === '') {
    return [{ type: 'paragraph', children: [{ text: '' }] }]
  }

  // Paragrafları ayır
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim())

  return paragraphs.map(paragraph => ({
    type: 'paragraph',
    children: [{ text: paragraph.trim() }]
  }))
}

/**
 * RichText içeriğini çevirir (Slate JSON formatında)
 */
export async function translateRichText(
  content: any[],
  targetLang: TargetLanguage
): Promise<any[]> {
  // Slate JSON'dan düz metin çıkar
  const plainText = slateToPlainText(content)

  if (!plainText.trim()) {
    return content
  }

  // Çevir
  const translatedText = await translateWithClaude({
    text: plainText,
    targetLang,
    contentType: 'richtext',
  })

  // Basit Slate yapısına dönüştür
  return plainTextToSlate(translatedText)
}

export { languageConfigs }
export type { TargetLanguage, TranslateOptions }
