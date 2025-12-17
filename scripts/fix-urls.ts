import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const fix = async () => {
  try {
    console.log('🚀 Fixing URLs in MongoDB...\n')

    // Connect to MongoDB directly
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    console.log('✅ Connected to MongoDB\n')

    const db = client.db('hollanda-rehberi')
    const collection = db.collection('medyas')

    // Get all media files
    const medias = await collection.find({}).toArray()
    console.log(`📊 Found ${medias.length} media files\n`)

    let updateCount = 0

    for (const media of medias) {
      if (!media.cloudinaryURL) {
        console.log(`⏭️  Skipping ${media.filename} (no Cloudinary URL)`)
        continue
      }

      // Generate Cloudinary URLs for sizes
      const baseUrl = media.cloudinaryURL.split('/upload/')[0] + '/upload/'
      const imagePath = media.cloudinaryURL.split('/upload/')[1]

      const thumbnailUrl = `${baseUrl}w_400,h_300,c_fill/${imagePath}`
      const cardUrl = `${baseUrl}w_768,h_432,c_fill/${imagePath}`

      // Update with raw MongoDB query
      await collection.updateOne(
        { _id: media._id },
        {
          $set: {
            url: media.cloudinaryURL,
            'sizes.thumbnail.url': thumbnailUrl,
            'sizes.card.url': cardUrl,
          },
        }
      )

      console.log(`✅ Fixed: ${media.filename}`)
      console.log(`   Main URL: ${media.cloudinaryURL}`)
      console.log(`   Thumbnail: ${thumbnailUrl}`)
      console.log(`   Card: ${cardUrl}\n`)
      updateCount++
    }

    await client.close()

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📊 FIX SUMMARY')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`✅ Fixed: ${updateCount}`)
    console.log(`📊 Total: ${medias.length}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (updateCount > 0) {
      console.log('🎉 URLs fixed successfully!')
      console.log('🌐 Refresh production admin panel to see changes!')
    }

    process.exit(0)
  } catch (error) {
    console.error('💥 Fix failed:', error)
    process.exit(1)
  }
}

fix()
