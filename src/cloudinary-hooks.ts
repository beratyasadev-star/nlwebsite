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

    // Update document with Cloudinary URL (both url and cloudinaryURL)
    await req.payload.update({
      collection: 'medya',
      id: doc.id,
      data: {
        url: result.secure_url,
        cloudinaryURL: result.secure_url,
      },
    })

    console.log(`✅ Uploaded to Cloudinary: ${result.secure_url}`)
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
