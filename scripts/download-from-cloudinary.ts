import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import fs from 'fs'
import path from 'path'
import https from 'https'

dotenv.config()

const downloadFile = (url: string, targetPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(targetPath)
    https.get(url, (response) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', (err) => {
      fs.unlinkSync(targetPath)
      reject(err)
    })
  })
}

const download = async () => {
  try {
    console.log('🚀 Downloading media from Cloudinary to Render Disk...\n')

    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    console.log('✅ Connected to MongoDB\n')

    const db = client.db('hollanda-rehberi')
    const collection = db.collection('medyas')

    // Get all media files with Cloudinary URLs
    const medias = await collection.find({ cloudinaryURL: { $exists: true } }).toArray()
    console.log(`📊 Found ${medias.length} media files with Cloudinary URLs\n`)

    const targetDir = '/data/media'

    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
      console.log('✅ Created target directory:', targetDir, '\n')
    }

    let downloadCount = 0
    let skipCount = 0
    let errorCount = 0

    for (const media of medias) {
      try {
        const targetPath = path.join(targetDir, media.filename)

        // Skip if file already exists
        if (fs.existsSync(targetPath)) {
          console.log(`⏭️  Skipping ${media.filename} (already exists)`)
          skipCount++
          continue
        }

        // Download from Cloudinary
        console.log(`📥 Downloading: ${media.filename}`)
        await downloadFile(media.cloudinaryURL, targetPath)
        console.log(`✅ Downloaded: ${media.filename}\n`)
        downloadCount++
      } catch (error) {
        console.error(`❌ Error downloading ${media.filename}:`, error)
        errorCount++
      }
    }

    await client.close()

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📊 DOWNLOAD SUMMARY')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`✅ Downloaded: ${downloadCount}`)
    console.log(`⏭️  Skipped: ${skipCount}`)
    console.log(`❌ Errors: ${errorCount}`)
    console.log(`📊 Total: ${medias.length}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (downloadCount > 0) {
      console.log('🎉 Media files downloaded to Render Disk successfully!')
    }

    process.exit(0)
  } catch (error) {
    console.error('💥 Download failed:', error)
    process.exit(1)
  }
}

download()
