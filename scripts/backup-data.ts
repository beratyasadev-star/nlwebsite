/**
 * Tüm collection verilerini Payload API'den çekip JSON olarak yedekler
 * Kullanım: npx tsx scripts/backup-data.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const PAYLOAD_API = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3001/api'

// Yedeklenecek collection'lar
const collections = ['haber', 'blog', 'duyurular', 'rehber', 'sss', 'medya']

// Desteklenen locale'ler
const locales = ['tr', 'ku', 'ar', 'nl', 'en']

async function fetchCollection(collection: string): Promise<any[]> {
  const allDocs: any[] = []

  // Her locale için verileri çek
  for (const locale of locales) {
    try {
      const res = await fetch(`${PAYLOAD_API}/${collection}?locale=${locale}&limit=1000&depth=2`)
      if (res.ok) {
        const data = await res.json()

        // İlk locale için tüm dökümanları ekle
        if (locale === 'tr') {
          for (const doc of data.docs) {
            allDocs.push({
              ...doc,
              _localeData: { [locale]: extractLocalizedFields(doc) }
            })
          }
        } else {
          // Diğer locale'ler için mevcut dökümanlara ekle
          for (const doc of data.docs) {
            const existing = allDocs.find(d => d.id === doc.id)
            if (existing) {
              existing._localeData[locale] = extractLocalizedFields(doc)
            }
          }
        }
      }
    } catch (error) {
      console.error(`   Hata (${collection}/${locale}):`, error)
    }
  }

  return allDocs
}

function extractLocalizedFields(doc: any): any {
  // Localized olabilecek alanları çıkar
  const localizedFields: any = {}

  if (doc.title) localizedFields.title = doc.title
  if (doc.excerpt) localizedFields.excerpt = doc.excerpt
  if (doc.content) localizedFields.content = doc.content
  if (doc.question) localizedFields.question = doc.question
  if (doc.answer) localizedFields.answer = doc.answer
  if (doc.translationStatus) localizedFields.translationStatus = doc.translationStatus

  return localizedFields
}

async function main() {
  console.log('📦 Yedekleme başlıyor...')
  console.log(`   API: ${PAYLOAD_API}\n`)

  const backup: any = {
    exportDate: new Date().toISOString(),
    apiUrl: PAYLOAD_API,
    collections: {}
  }

  for (const collection of collections) {
    process.stdout.write(`   📂 ${collection}... `)

    try {
      const docs = await fetchCollection(collection)
      backup.collections[collection] = docs
      console.log(`${docs.length} döküman`)
    } catch (error) {
      console.log('HATA!')
      console.error(error)
    }
  }

  // Dosya adını tarih ve saatle oluştur
  const now = new Date()
  const date = now.toISOString().split('T')[0] // YYYY-MM-DD
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-') // HH-MM-SS
  const filename = `export-${date}_${time}.json`
  const backupDir = path.resolve(process.cwd(), 'backups')
  const filepath = path.join(backupDir, filename)

  // Backups klasörü yoksa oluştur
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
  }

  // JSON dosyasına kaydet
  fs.writeFileSync(filepath, JSON.stringify(backup, null, 2))

  console.log(`\n✅ Yedekleme tamamlandı!`)
  console.log(`   Dosya: ${filepath}`)

  // Dosya boyutunu göster
  const stats = fs.statSync(filepath)
  console.log(`   Boyut: ${(stats.size / 1024).toFixed(2)} KB`)
}

main().catch(console.error)
