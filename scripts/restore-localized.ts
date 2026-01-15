/**
 * Backup'tan localized alanları restore eder
 * SADECE localized alanları günceller, diğer alanlara dokunmaz
 */

import { MongoClient, ObjectId } from 'mongodb'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const MONGODB_URI = process.env.MONGODB_URI || ''
const BACKUP_FILE = path.resolve(process.cwd(), 'backups/export-2026-01-12.json')

// Collection slug -> MongoDB collection name mapping
const COLLECTION_MAP: Record<string, string> = {
  haber: 'habers',
  blog: 'kose-yazilaris',
  duyurular: 'duyurulars',
  sss: 'ssses',
}

// Her collection için localized alanlar
const LOCALIZED_FIELDS: Record<string, string[]> = {
  haber: ['title', 'excerpt', 'content', 'translationStatus'],
  blog: ['title', 'excerpt', 'content', 'translationStatus'],
  duyurular: ['title', 'excerpt', 'content', 'translationStatus'],
  sss: ['question', 'answer', 'translationStatus'],
}

interface BackupData {
  exportDate: string
  apiUrl: string
  collections: Record<string, any[]>
}

async function restoreCollection(
  db: any,
  collectionSlug: string,
  backupDocs: any[],
  localizedFields: string[]
): Promise<{ updated: number; skipped: number; notFound: number }> {
  const collectionName = COLLECTION_MAP[collectionSlug]
  if (!collectionName) {
    console.log(`   ⚠️  Collection mapping bulunamadı: ${collectionSlug}`)
    return { updated: 0, skipped: 0, notFound: 0 }
  }

  const collection = db.collection(collectionName)
  let updated = 0
  let skipped = 0
  let notFound = 0

  for (const backupDoc of backupDocs) {
    const docId = backupDoc.id
    if (!docId) {
      skipped++
      continue
    }

    // Backup'tan sadece localized alanları al
    const updateFields: Record<string, any> = {}
    let hasLocalizedData = false

    for (const field of localizedFields) {
      const backupValue = backupDoc[field]

      // Sadece object (localized) formatındaki değerleri al
      if (backupValue && typeof backupValue === 'object' && !Array.isArray(backupValue)) {
        // En az bir locale var mı kontrol et
        const locales = Object.keys(backupValue)
        if (locales.some(l => ['tr', 'ku', 'ar'].includes(l))) {
          updateFields[field] = backupValue
          hasLocalizedData = true
        }
      }
      // Array ise (richText content gibi) ve içinde locale var mı kontrol et
      else if (backupValue && typeof backupValue === 'object' &&
               Object.keys(backupValue).some(k => ['tr', 'ku', 'ar'].includes(k))) {
        updateFields[field] = backupValue
        hasLocalizedData = true
      }
    }

    if (!hasLocalizedData) {
      skipped++
      continue
    }

    // MongoDB'de güncelle
    try {
      // ObjectId olarak dene, başarısız olursa string olarak dene
      let filter: any
      try {
        filter = { _id: new ObjectId(docId) }
      } catch {
        filter = { _id: docId }
      }

      const result = await collection.updateOne(filter, { $set: updateFields })

      if (result.matchedCount > 0) {
        updated++
        const title = updateFields.title || updateFields.question
        const titlePreview = typeof title === 'object'
          ? Object.values(title)[0]?.toString().substring(0, 30)
          : 'N/A'
        console.log(`   ✅ ${docId.substring(0, 8)}... "${titlePreview}..."`)
      } else {
        notFound++
        console.log(`   ❌ ${docId} bulunamadı`)
      }
    } catch (error: any) {
      console.log(`   ❌ ${docId} hata: ${error.message}`)
      notFound++
    }
  }

  return { updated, skipped, notFound }
}

async function main() {
  console.log('🔄 Backup restore başlıyor...\n')

  // Backup dosyasını oku
  if (!fs.existsSync(BACKUP_FILE)) {
    console.error('❌ Backup dosyası bulunamadı:', BACKUP_FILE)
    process.exit(1)
  }

  const backupData: BackupData = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf-8'))
  console.log('📅 Backup tarihi:', backupData.exportDate)
  console.log('📂 Collection sayısı:', Object.keys(backupData.collections).length)
  console.log()

  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log('✅ MongoDB bağlantısı başarılı\n')

    const db = client.db('hollanda-rehberi')

    let totalUpdated = 0
    let totalSkipped = 0
    let totalNotFound = 0

    for (const [collectionSlug, docs] of Object.entries(backupData.collections)) {
      const fields = LOCALIZED_FIELDS[collectionSlug]
      if (!fields) {
        console.log(`⏭️  ${collectionSlug} atlandı (localized alan yok)`)
        continue
      }

      console.log(`📂 ${collectionSlug.toUpperCase()} restore ediliyor (${docs.length} döküman)...`)

      const result = await restoreCollection(db, collectionSlug, docs, fields)

      console.log(`   📊 Sonuç: ${result.updated} güncellendi, ${result.skipped} atlandı, ${result.notFound} bulunamadı\n`)

      totalUpdated += result.updated
      totalSkipped += result.skipped
      totalNotFound += result.notFound
    }

    console.log('=' .repeat(50))
    console.log('📊 TOPLAM SONUÇ:')
    console.log(`   ✅ Güncellendi: ${totalUpdated}`)
    console.log(`   ⏭️  Atlandı: ${totalSkipped}`)
    console.log(`   ❌ Bulunamadı: ${totalNotFound}`)
    console.log('=' .repeat(50))

  } catch (error: any) {
    console.error('❌ Hata:', error.message)
  } finally {
    await client.close()
  }
}

main()
