import { NextRequest, NextResponse } from 'next/server'
import {
  translateWithClaude,
  translateRichText,
  TargetLanguage,
} from '@/src/lib/claude'

const PAYLOAD_API = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3001/api'

// Koleksiyonlar ve çevrilecek field'ları
const collectionFields: Record<string, string[]> = {
  haber: ['title', 'excerpt', 'content'],
  blog: ['title', 'excerpt', 'content'],
  duyurular: ['title', 'excerpt', 'content'],
  rehber: ['title', 'excerpt', 'content'],
  sss: ['question', 'answer'],
}

interface TranslateRequest {
  collection: string
  docId: string
  targetLocales?: TargetLanguage[]
}

export async function POST(req: NextRequest) {
  try {
    const body: TranslateRequest = await req.json()
    const { collection, docId, targetLocales = ['ku', 'ar', 'nl', 'en'] } = body

    // Validation
    if (!collection || !docId) {
      return NextResponse.json(
        { error: 'collection ve docId gerekli' },
        { status: 400 }
      )
    }

    const fields = collectionFields[collection]
    if (!fields) {
      return NextResponse.json(
        { error: `Desteklenmeyen koleksiyon: ${collection}` },
        { status: 400 }
      )
    }

    // 1. Türkçe içeriği al
    const docRes = await fetch(`${PAYLOAD_API}/${collection}/${docId}?locale=tr&depth=0`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!docRes.ok) {
      return NextResponse.json(
        { error: 'Döküman bulunamadı' },
        { status: 404 }
      )
    }

    const doc = await docRes.json()

    // 2. Her hedef dil için çeviri yap
    const results: Record<string, any> = {}

    for (const locale of targetLocales) {
      const translatedFields: Record<string, any> = {}

      for (const field of fields) {
        const fieldValue = doc[field]

        if (!fieldValue) {
          continue
        }

        // RichText field (array formatında)
        if (Array.isArray(fieldValue)) {
          translatedFields[field] = await translateRichText(fieldValue, locale)
        }
        // Normal text field
        else if (typeof fieldValue === 'string') {
          translatedFields[field] = await translateWithClaude({
            text: fieldValue,
            targetLang: locale,
            contentType: field === 'title' ? 'title' : 'excerpt',
          })
        }
      }

      // translationStatus'u otomatik olarak işaretle
      translatedFields.translationStatus = 'auto'

      // 3. Çeviriyi Payload'a kaydet
      const updateRes = await fetch(`${PAYLOAD_API}/${collection}/${docId}?locale=${locale}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(translatedFields),
      })

      if (!updateRes.ok) {
        const errorData = await updateRes.json()
        console.error(`Çeviri kaydetme hatası (${locale}):`, errorData)
        results[locale] = { success: false, error: errorData }
      } else {
        results[locale] = { success: true, fields: Object.keys(translatedFields) }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Çeviri tamamlandı',
      results,
    })

  } catch (error) {
    console.error('Translation API error:', error)
    return NextResponse.json(
      {
        error: 'Çeviri işlemi başarısız',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    )
  }
}

// Çeviri durumunu kontrol et
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const collection = searchParams.get('collection')
  const docId = searchParams.get('docId')

  if (!collection || !docId) {
    return NextResponse.json(
      { error: 'collection ve docId parametreleri gerekli' },
      { status: 400 }
    )
  }

  try {
    const statuses: Record<string, any> = {}

    for (const locale of ['tr', 'ku', 'ar', 'nl', 'en']) {
      const res = await fetch(
        `${PAYLOAD_API}/${collection}/${docId}?locale=${locale}&depth=0`,
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (res.ok) {
        const doc = await res.json()
        statuses[locale] = {
          hasContent: Boolean(doc.title || doc.question),
          translationStatus: doc.translationStatus || 'original',
        }
      } else {
        statuses[locale] = { hasContent: false, translationStatus: null }
      }
    }

    return NextResponse.json({ statuses })

  } catch (error) {
    return NextResponse.json(
      { error: 'Durum kontrolü başarısız' },
      { status: 500 }
    )
  }
}
