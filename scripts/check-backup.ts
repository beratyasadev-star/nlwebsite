import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const MONGODB_URI = process.env.MONGODB_URI || ''

async function checkBackup() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log('✅ MongoDB bağlantısı başarılı\n')

    // Tüm database'leri listele
    const adminDb = client.db().admin()
    const dbs = await adminDb.listDatabases()

    console.log('📂 TÜM DATABASE\'LER:')
    for (const db of dbs.databases) {
      console.log(`   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`)
    }

    // Her database'deki collection'ları listele
    for (const dbInfo of dbs.databases) {
      if (dbInfo.name === 'admin' || dbInfo.name === 'local') continue

      const db = client.db(dbInfo.name)
      const collections = await db.listCollections().toArray()

      console.log(`\n📁 ${dbInfo.name} DATABASE - COLLECTION'LAR:`)
      for (const col of collections) {
        const count = await db.collection(col.name).countDocuments()

        // Backup veya yedek içeren collection'ları vurgula
        const isBackup = col.name.toLowerCase().includes('backup') ||
                        col.name.toLowerCase().includes('yedek') ||
                        col.name.toLowerCase().includes('_bak')

        if (isBackup) {
          console.log(`   ⭐ ${col.name}: ${count} döküman [BACKUP]`)
        } else {
          console.log(`   - ${col.name}: ${count} döküman`)
        }
      }
    }

  } catch (error: any) {
    console.error('❌ Hata:', error.message)
  } finally {
    await client.close()
  }
}

checkBackup()
