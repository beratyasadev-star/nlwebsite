/**
 * Mevcut verileri localized formata migrate eder
 * content → { tr: content }
 */

import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URI || ''

// Collection ve localized alanlar
const collectionsToMigrate = [
  {
    name: 'habers',
    fields: ['title', 'excerpt', 'content']
  },
  {
    name: 'kose-yazilaris', // blog collection
    fields: ['title', 'excerpt', 'content']
  },
  {
    name: 'duyurulars',
    fields: ['title', 'excerpt', 'content']
  },
  {
    name: 'ssses', // sss collection
    fields: ['question', 'answer']
  },
]

async function migrateCollection(
  db: any,
  collectionName: string,
  fields: string[]
): Promise<{ migrated: number; skipped: number }> {
  const collection = db.collection(collectionName)
  const docs = await collection.find({}).toArray()

  let migrated = 0
  let skipped = 0

  for (const doc of docs) {
    const updates: Record<string, any> = {}
    let needsUpdate = false

    for (const field of fields) {
      const value = doc[field]

      // Zaten localized formatta mı kontrol et
      if (value && typeof value === 'object' && !Array.isArray(value) && value.tr !== undefined) {
        // Zaten migrate edilmiş
        continue
      }

      // Değer varsa ve localized değilse, migrate et
      if (value !== undefined && value !== null) {
        updates[field] = { tr: value }
        needsUpdate = true
      }
    }

    if (needsUpdate) {
      await collection.updateOne(
        { _id: doc._id },
        { $set: updates }
      )
      migrated++
    } else {
      skipped++
    }
  }

  return { migrated, skipped }
}

async function main() {
  console.log('🔄 Veritabanı migration başlıyor...\n')
  console.log('MongoDB URI:', MONGODB_URI.substring(0, 30) + '...\n')

  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log('✅ MongoDB bağlantısı başarılı\n')

    const db = client.db()

    for (const { name, fields } of collectionsToMigrate) {
      process.stdout.write(`📂 ${name} migrate ediliyor... `)

      try {
        const result = await migrateCollection(db, name, fields)
        console.log(`✅ ${result.migrated} migrated, ${result.skipped} skipped`)
      } catch (error: any) {
        console.log(`❌ Hata: ${error.message}`)
      }
    }

    console.log('\n✅ Migration tamamlandı!')

  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error)
  } finally {
    await client.close()
  }
}

main()
