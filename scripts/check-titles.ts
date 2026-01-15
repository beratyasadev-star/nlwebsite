import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function check() {
  const client = new MongoClient(process.env.MONGODB_URI!)
  await client.connect()
  const db = client.db('hollanda-rehberi')

  // İlk 5 haberi kontrol et
  const habers = await db.collection('habers')
    .find({})
    .sort({ publishedDate: -1 })
    .limit(10)
    .toArray()

  console.log('📰 İLK 10 HABER (MongoDB):')
  console.log('='.repeat(60))

  for (const h of habers) {
    console.log(`\nSlug: ${h.slug}`)
    console.log(`Title type: ${typeof h.title}`)
    if (typeof h.title === 'object' && h.title !== null) {
      const tr = h.title?.tr
      const ku = h.title?.ku
      const ar = h.title?.ar
      console.log(`  tr: ${tr ? String(tr).substring(0, 40) + '...' : '[YOK]'}`)
      console.log(`  ku: ${ku ? String(ku).substring(0, 40) + '...' : '[YOK]'}`)
      console.log(`  ar: ${ar ? String(ar).substring(0, 40) + '...' : '[YOK]'}`)
    } else {
      console.log(`  Value: ${h.title} (FLAT - sorunlu!)`)
    }
  }

  await client.close()
}
check()
