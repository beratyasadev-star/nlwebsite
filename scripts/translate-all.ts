/**
 * Tüm içerikleri Kürtçe ve Arapça'ya çevirir
 * Kullanım: npx tsx scripts/translate-all.ts
 */

import Anthropic from '@anthropic-ai/sdk'
import * as dotenv from 'dotenv'
import * as path from 'path'

// .env dosyasını yükle (override ile)
const envPath = path.resolve(process.cwd(), '.env')
dotenv.config({ path: envPath, override: true })

const PAYLOAD_API = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3001/api'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

type TargetLanguage = 'ku' | 'ar' | 'nl' | 'en'

const languageConfigs: Record<TargetLanguage, { name: string; notes: string }> = {
  ku: {
    name: 'Kürtçe (Kurmancî)',
    notes: `- Latin alfabesi kullan (Kurmancî standart yazımı)
- Doğal Kurmancî dilbilgisi uygula
- Türkçe veya Arapça kelimeler yerine Kürtçe karşılıkları tercih et
- Resmi ama samimi bir ton kullan`
  },
  ar: {
    name: 'Arapça',
    notes: `- Modern Standart Arapça (Fusha) kullan
- Mültecilere uygun sade ve anlaşılır bir dil kullan
- Teknik terimleri açık şekilde ifade et
- Resmi ama samimi bir ton kullan`
  },
  nl: {
    name: 'Hollandaca',
    notes: `- Standart Hollandaca (ABN) kullan
- Hollanda'daki resmi kurumların kullandığı terminolojiyi tercih et
- Açık ve anlaşılır bir dil kullan
- Resmi ama samimi bir ton kullan
- Hollandaca'ya özgü deyimleri uygun şekilde kullan`
  },
  en: {
    name: 'İngilizce',
    notes: `- Açık ve basit İngilizce kullan (Plain English)
- Uluslararası okuyuculara uygun bir dil kullan
- Teknik terimleri açık şekilde ifade et
- Resmi ama samimi bir ton kullan
- Karmaşık cümle yapılarından kaçın`
  }
}

// Koleksiyonlar ve çevrilecek alanlar (sadece text alanları - content fallback kullanacak)
const collections: Record<string, string[]> = {
  haber: ['title', 'excerpt'],
  blog: ['title', 'excerpt'],
  duyurular: ['title', 'excerpt'],
  rehber: ['title', 'excerpt'],
  sss: ['question'],  // answer richText, fallback kullanacak
}

async function translateText(text: string, targetLang: TargetLanguage): Promise<string> {
  if (!text || text.trim() === '') return ''

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
- Sadece çeviriyi döndür, açıklama veya not ekleme`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `Aşağıdaki Türkçe metni ${config.name} diline çevir:\n\n${text}`
    }],
    system: systemPrompt,
  })

  if (response.content[0].type === 'text') {
    return response.content[0].text.trim()
  }
  return ''
}

function slateToPlainText(nodes: any[]): string {
  if (!nodes || !Array.isArray(nodes)) return ''

  return nodes.map(node => {
    if (node.text !== undefined) return node.text
    if (node.children && Array.isArray(node.children)) {
      const childText = slateToPlainText(node.children)
      if (['paragraph', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'].includes(node.type)) {
        return childText + '\n\n'
      }
      return childText
    }
    return ''
  }).join('').trim()
}

function plainTextToSlate(text: string): any[] {
  if (!text || text.trim() === '') {
    return [{ type: 'paragraph', children: [{ text: '' }] }]
  }
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim())
  return paragraphs.map(paragraph => ({
    type: 'paragraph',
    children: [{ text: paragraph.trim() }]
  }))
}

async function translateDocument(
  collection: string,
  doc: any,
  fields: string[],
  targetLang: TargetLanguage
): Promise<Record<string, any>> {
  const translated: Record<string, any> = {}

  for (const field of fields) {
    const value = doc[field]
    if (!value) continue

    // RichText (array)
    if (Array.isArray(value)) {
      const plainText = slateToPlainText(value)
      if (plainText) {
        const translatedText = await translateText(plainText, targetLang)
        translated[field] = plainTextToSlate(translatedText)
      }
    }
    // Normal text
    else if (typeof value === 'string') {
      translated[field] = await translateText(value, targetLang)
    }
  }

  return translated
}

async function saveTranslation(
  collection: string,
  docId: string,
  locale: string,
  originalDoc: any,
  translatedFields: Record<string, any>
): Promise<boolean> {
  try {
    // Tüm localized alanları orijinalden kopyala, çevrilenleri üzerine yaz
    const payload: Record<string, any> = {}

    // Collection'a göre alanları ayarla (sadece title/excerpt - content fallback kullanacak)
    if (collection === 'sss') {
      // SSS için question (answer richText olduğu için atlıyoruz)
      if (translatedFields.question) {
        payload.question = translatedFields.question
      }
    } else {
      // Haber, Blog, Duyuru için sadece title ve excerpt
      if (translatedFields.title) {
        payload.title = translatedFields.title
      }
      if (translatedFields.excerpt) {
        payload.excerpt = translatedFields.excerpt
      }
    }

    // Çeviri durumunu işaretle
    payload.translationStatus = 'auto'

    const res = await fetch(`${PAYLOAD_API}/${collection}/${docId}?locale=${locale}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error(`\n   HATA: ${JSON.stringify(err)}`)
    }
    return res.ok
  } catch (e) {
    console.error(`\n   EXCEPTION: ${e}`)
    return false
  }
}

async function main() {
  console.log('🌍 Çeviri işlemi başlıyor...\n')

  const targetLocales: TargetLanguage[] = ['ku', 'ar', 'nl', 'en']
  let totalTranslated = 0
  let totalFailed = 0

  for (const [collection, fields] of Object.entries(collections)) {
    console.log(`\n📂 ${collection.toUpperCase()} koleksiyonu işleniyor...`)

    // Tüm dökümanları al (depth=1 ile content'i de al)
    const res = await fetch(`${PAYLOAD_API}/${collection}?locale=tr&limit=100&depth=1`)
    if (!res.ok) {
      console.log(`   ❌ ${collection} alınamadı`)
      continue
    }

    const { docs } = await res.json()
    console.log(`   📄 ${docs.length} döküman bulundu`)

    for (const doc of docs) {
      const title = doc.title || doc.question || doc.id
      process.stdout.write(`   → "${title.substring(0, 40)}..." `)

      for (const locale of targetLocales) {
        try {
          const translated = await translateDocument(collection, doc, fields, locale)
          const saved = await saveTranslation(collection, doc.id, locale, doc, translated)

          if (saved) {
            process.stdout.write(`[${locale}✓] `)
            totalTranslated++
          } else {
            process.stdout.write(`[${locale}✗] `)
            totalFailed++
          }
        } catch (error: any) {
          console.error(`\n   TRANSLATE ERROR: ${error.message}`)
          process.stdout.write(`[${locale}✗] `)
          totalFailed++
        }

        // Rate limit için kısa bekleme
        await new Promise(r => setTimeout(r, 500))
      }
      console.log('')
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`✅ Başarılı: ${totalTranslated}`)
  console.log(`❌ Başarısız: ${totalFailed}`)
  console.log('='.repeat(50))
}

main().catch(console.error)
