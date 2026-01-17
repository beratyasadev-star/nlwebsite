/**
 * KAPSAMLI DEBUG HOOK'LARI
 * Localization sorununu tespit etmek için
 */

import { CollectionBeforeChangeHook, CollectionAfterChangeHook, CollectionAfterReadHook } from 'payload/types'

// Localized alanlar - her collection için
const LOCALIZED_FIELDS: Record<string, string[]> = {
  haber: ['title', 'excerpt', 'content', 'translationStatus'],
  blog: ['title', 'excerpt', 'content', 'translationStatus'],
  duyurular: ['title', 'excerpt', 'content', 'translationStatus'],
  rehber: ['title', 'excerpt', 'content', 'translationStatus'],
  sss: ['question', 'answer', 'translationStatus'],
}

// Yardımcı: Objeyi güvenli şekilde JSON'a çevir
function safeStringify(obj: any, maxLength: number = 500): string {
  try {
    const str = JSON.stringify(obj, (key, value) => {
      // Circular reference'ları ve büyük objeleri atla
      if (key === 'req' || key === 'payload' || key === 'res') return '[SKIPPED]'
      if (typeof value === 'function') return '[FUNCTION]'
      return value
    }, 2)
    return str.length > maxLength ? str.substring(0, maxLength) + '...[TRUNCATED]' : str
  } catch (e) {
    return '[STRINGIFY_ERROR]'
  }
}

// Yardımcı: Localized alan değerlerini logla
function logLocalizedFields(label: string, data: any, fields: string[]) {
  console.log(`\n  📋 ${label} - Localized Alanlar:`)
  for (const field of fields) {
    const value = data?.[field]
    if (value === undefined) {
      console.log(`     ${field}: [UNDEFINED]`)
    } else if (value === null) {
      console.log(`     ${field}: [NULL]`)
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      // Localized obje mi kontrol et
      const locales = Object.keys(value)
      if (locales.some(l => ['tr', 'ku', 'ar'].includes(l))) {
        console.log(`     ${field}: {`)
        for (const locale of ['tr', 'ku', 'ar']) {
          const localeValue = value[locale]
          if (localeValue === undefined) {
            console.log(`       ${locale}: [UNDEFINED]`)
          } else if (localeValue === null) {
            console.log(`       ${locale}: [NULL]`)
          } else if (typeof localeValue === 'string') {
            console.log(`       ${locale}: "${localeValue.substring(0, 50)}${localeValue.length > 50 ? '...' : ''}"`)
          } else if (Array.isArray(localeValue)) {
            console.log(`       ${locale}: [ARRAY length=${localeValue.length}]`)
          } else {
            console.log(`       ${locale}: [OBJECT]`)
          }
        }
        console.log(`     }`)
      } else {
        console.log(`     ${field}: [OBJECT keys=${locales.join(',')}]`)
      }
    } else if (typeof value === 'string') {
      console.log(`     ${field}: "${value.substring(0, 50)}${value.length > 50 ? '...' : ''}" (flat string - NOT localized object!)`)
    } else if (Array.isArray(value)) {
      console.log(`     ${field}: [ARRAY length=${value.length}] (flat array - NOT localized object!)`)
    } else {
      console.log(`     ${field}: ${typeof value}`)
    }
  }
}

/**
 * BEFORE CHANGE HOOK
 * Payload'a gelen veriyi loglar - UPDATE/CREATE öncesi
 */
export const debugBeforeChange: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
  context,
}) => {
  const collection = req.collection?.config?.slug || 'unknown'
  const fields = LOCALIZED_FIELDS[collection] || []

  if (fields.length === 0) return data // Localized alan yoksa atla

  console.log('\n' + '='.repeat(80))
  console.log(`🔵 BEFORE_CHANGE [${collection.toUpperCase()}]`)
  console.log('='.repeat(80))

  // 1. Temel bilgiler
  console.log(`\n  ⚙️  Operation: ${operation}`)
  console.log(`  🌍 req.locale: ${req.locale || '[UNDEFINED]'}`)
  console.log(`  🔄 req.fallbackLocale: ${(req as any).fallbackLocale || '[UNDEFINED]'}`)
  console.log(`  📝 Document ID: ${originalDoc?.id || data?.id || '[NEW]'}`)

  // 2. Request detayları
  console.log(`\n  📨 Request Details:`)
  console.log(`     Method: ${req.method || '[UNDEFINED]'}`)
  console.log(`     URL: ${req.url || '[UNDEFINED]'}`)
  console.log(`     Query locale: ${req.query?.locale || '[UNDEFINED]'}`)
  console.log(`     Body locale: ${(req.body as any)?.locale || '[UNDEFINED]'}`)

  // 3. Gelen DATA objesi - localized alanlar
  logLocalizedFields('INCOMING DATA (güncelleme verisi)', data, fields)

  // 4. ORIGINAL DOC - mevcut döküman
  if (originalDoc) {
    logLocalizedFields('ORIGINAL DOC (DB\'deki mevcut veri)', originalDoc, fields)
  } else {
    console.log(`\n  📋 ORIGINAL DOC: [YOK - yeni döküman]`)
  }

  // 5. Context
  console.log(`\n  🔧 Context:`)
  console.log(`     ${safeStringify(context, 200)}`)

  // 6. Tüm data objesi (kısa)
  console.log(`\n  📦 Full DATA object keys: ${Object.keys(data || {}).join(', ')}`)

  // 7. UYARI: Eğer data'da localized alan flat ise
  for (const field of fields) {
    const value = data?.[field]
    if (value !== undefined && typeof value === 'string') {
      console.log(`\n  ⚠️  UYARI: ${field} alanı FLAT STRING olarak geliyor!`)
      console.log(`     Bu, diğer locale'lerin silinmesine neden olabilir!`)
    }
  }

  console.log('\n' + '-'.repeat(80))

  return data
}

/**
 * AFTER CHANGE HOOK
 * MongoDB'ye yazılan veriyi loglar - UPDATE/CREATE sonrası
 */
export const debugAfterChange: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
  previousDoc,
  context,
}) => {
  const collection = req.collection?.config?.slug || 'unknown'
  const fields = LOCALIZED_FIELDS[collection] || []

  if (fields.length === 0) return doc

  console.log('\n' + '='.repeat(80))
  console.log(`🟢 AFTER_CHANGE [${collection.toUpperCase()}]`)
  console.log('='.repeat(80))

  // 1. Temel bilgiler
  console.log(`\n  ⚙️  Operation: ${operation}`)
  console.log(`  🌍 req.locale: ${req.locale || '[UNDEFINED]'}`)
  console.log(`  📝 Document ID: ${doc?.id || '[UNKNOWN]'}`)

  // 2. KAYDEDILEN DOC - şu an DB'de olan
  logLocalizedFields('SAVED DOC (DB\'ye yazılan)', doc, fields)

  // 3. PREVIOUS DOC - önceki hali
  if (previousDoc) {
    logLocalizedFields('PREVIOUS DOC (önceki hali)', previousDoc, fields)

    // 4. KARŞILAŞTIRMA - ne değişti?
    console.log(`\n  🔍 DEĞİŞİKLİK ANALİZİ:`)
    for (const field of fields) {
      const prev = previousDoc[field]
      const curr = doc[field]

      // Her locale için kontrol
      for (const locale of ['tr', 'ku', 'ar']) {
        const prevLocale = typeof prev === 'object' ? prev?.[locale] : prev
        const currLocale = typeof curr === 'object' ? curr?.[locale] : curr

        const prevExists = prevLocale !== undefined && prevLocale !== null
        const currExists = currLocale !== undefined && currLocale !== null

        if (prevExists && !currExists) {
          console.log(`     ❌ ${field}.${locale}: KAYBOLDU! (önceden vardı, şimdi yok)`)
        } else if (!prevExists && currExists) {
          console.log(`     ✅ ${field}.${locale}: YENİ EKLENDİ`)
        } else if (prevExists && currExists && prevLocale !== currLocale) {
          console.log(`     🔄 ${field}.${locale}: DEĞİŞTİ`)
        }
      }
    }
  } else {
    console.log(`\n  📋 PREVIOUS DOC: [YOK - yeni döküman]`)
  }

  console.log('\n' + '='.repeat(80) + '\n')

  return doc
}

/**
 * AFTER READ HOOK
 * DB'den okunan veriyi loglar
 */
export const debugAfterRead: CollectionAfterReadHook = async ({
  doc,
  req,
  query,
  findMany,
}) => {
  const collection = req.collection?.config?.slug || 'unknown'
  const fields = LOCALIZED_FIELDS[collection] || []

  // findMany ise çok fazla log olur, atla
  if (findMany || fields.length === 0) return doc

  console.log('\n' + '-'.repeat(60))
  console.log(`📖 AFTER_READ [${collection.toUpperCase()}] - ID: ${doc?.id}`)
  console.log(`   req.locale: ${req.locale || '[UNDEFINED]'}`)

  // Sadece localized alanların durumunu göster
  for (const field of fields) {
    const value = doc?.[field]
    if (typeof value === 'object' && !Array.isArray(value)) {
      const locales = ['tr', 'ku', 'ar'].filter(l => value?.[l] !== undefined)
      console.log(`   ${field}: locales=[${locales.join(',')}]`)
    } else if (value !== undefined) {
      console.log(`   ${field}: [flat value]`)
    }
  }
  console.log('-'.repeat(60))

  return doc
}

/**
 * Collection hook'larını oluştur
 */
export function createDebugHooks(collectionSlug: string) {
  return {
    beforeChange: [debugBeforeChange],
    afterChange: [debugAfterChange],
    // afterRead çok fazla log üretir, isteğe bağlı aç
    // afterRead: [debugAfterRead],
  }
}
