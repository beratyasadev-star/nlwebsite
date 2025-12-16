import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import payload from 'payload'
import fs from 'fs'
import path from 'path'

dotenv.config()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const migrate = async () => {
  try {
    console.log('🚀 Starting Cloudinary migration...\n')

    // Initialize Payload
    await payload.init({
      secret: process.env.PAYLOAD_SECRET!,
      local: true,
    })

    console.log('✅ Payload initialized\n')

    // Get all media from MongoDB
    const medias = await payload.find({
      collection: 'medya',
      limit: 1000,
    })

    console.log(`📊 Found ${medias.docs.length} media files in database\n`)

    let successCount = 0
    let skipCount = 0
    let errorCount = 0

    for (const media of medias.docs) {
      try {
        // Skip if already has Cloudinary URL
        if (media.cloudinaryURL) {
          console.log(`⏭️  Skipping ${media.filename} (already in Cloudinary)`)
          skipCount++
          continue
        }

        const filePath = path.join(process.cwd(), 'public/media', media.filename)

        // Check if file exists locally
        if (!fs.existsSync(filePath)) {
          console.log(`⚠️  File not found: ${media.filename}`)
          errorCount++
          continue
        }

        // Upload to Cloudinary
        console.log(`📤 Uploading: ${media.filename}`)
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'nlwebsite',
          public_id: media.filename.replace(/\.[^.]+$/, ''),
        })

        // Update MongoDB
        await payload.update({
          collection: 'medya',
          id: media.id,
          data: {
            url: result.secure_url,
            cloudinaryURL: result.secure_url,
          },
        })

        console.log(`✅ Uploaded: ${result.secure_url}\n`)
        successCount++
      } catch (error) {
        console.error(`❌ Error uploading ${media.filename}:`, error)
        errorCount++
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📊 MIGRATION SUMMARY')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`✅ Successfully migrated: ${successCount}`)
    console.log(`⏭️  Skipped (already migrated): ${skipCount}`)
    console.log(`❌ Errors: ${errorCount}`)
    console.log(`📊 Total: ${medias.docs.length}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (successCount > 0) {
      console.log('🎉 Migration completed successfully!')
      console.log('🌐 Your media files are now on Cloudinary!')
    }

    process.exit(0)
  } catch (error) {
    console.error('💥 Migration failed:', error)
    process.exit(1)
  }
}

migrate()
