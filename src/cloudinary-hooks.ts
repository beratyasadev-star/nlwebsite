import { v2 as cloudinary } from 'cloudinary'
import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload/types'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const cloudinaryEnabled = process.env.CLOUDINARY_ENABLED === 'true'

// Upload to Cloudinary after file upload
export const syncToCloudinary: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
  if (!cloudinaryEnabled || operation !== 'create' || !doc.filename) {
    return doc
  }

  try {
    const filePath = `public/media/${doc.filename}`
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'nlwebsite',
      public_id: doc.filename.replace(/\.[^.]+$/, ''),
    })

    // Generate Cloudinary URLs for sizes
    const baseUrl = result.secure_url.split('/upload/')[0] + '/upload/'
    const imagePath = result.secure_url.split('/upload/')[1]

    const thumbnailUrl = `${baseUrl}w_400,h_300,c_fill/${imagePath}`
    const cardUrl = `${baseUrl}w_768,h_432,c_fill/${imagePath}`

    // Update document directly (no separate API call)
    doc.url = result.secure_url
    doc.cloudinaryURL = result.secure_url

    if (doc.sizes) {
      if (doc.sizes.thumbnail) {
        doc.sizes.thumbnail.url = thumbnailUrl
      }
      if (doc.sizes.card) {
        doc.sizes.card.url = cardUrl
      }
    }

    // Do a silent background update to persist to DB
    setTimeout(async () => {
      try {
        const updateData: any = {
          url: result.secure_url,
          cloudinaryURL: result.secure_url,
        }

        // Update sizes if they exist
        if (doc.sizes) {
          updateData.sizes = {
            ...doc.sizes,
            thumbnail: {
              ...doc.sizes.thumbnail,
              url: thumbnailUrl,
            },
            card: {
              ...doc.sizes.card,
              url: cardUrl,
            },
          }
        }

        await req.payload.update({
          collection: 'medya',
          id: doc.id,
          data: updateData,
        })
        console.log(`✅ Uploaded to Cloudinary: ${result.secure_url}`)
      } catch (err) {
        console.error('Background update error:', err)
      }
    }, 1000)
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error)
  }

  return doc
}

// Delete from Cloudinary after file deletion
export const deleteFromCloudinary: CollectionAfterDeleteHook = async ({ doc }) => {
  if (!cloudinaryEnabled || !doc.filename) {
    return
  }

  try {
    const publicId = `nlwebsite/${doc.filename.replace(/\.[^.]+$/, '')}`
    await cloudinary.uploader.destroy(publicId)
    console.log(`✅ Deleted from Cloudinary: ${publicId}`)
  } catch (error) {
    console.error('❌ Cloudinary delete error:', error)
  }
}
