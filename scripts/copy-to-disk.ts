import fs from 'fs'
import path from 'path'

const copyMediaToDisk = () => {
  try {
    console.log('🚀 Copying media files to Render Disk...\n')

    const sourceDir = path.join(process.cwd(), 'public/media')
    const targetDir = '/data/media'

    // Check if source directory exists
    if (!fs.existsSync(sourceDir)) {
      console.log('⚠️  Source directory does not exist:', sourceDir)
      console.log('ℹ️  This is normal if running on Render for the first time')
      process.exit(0)
    }

    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
      console.log('✅ Created target directory:', targetDir)
    }

    // Get all files from source directory
    const files = fs.readdirSync(sourceDir)
    console.log(`📊 Found ${files.length} files in source directory\n`)

    let copyCount = 0
    let skipCount = 0

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file)
      const targetPath = path.join(targetDir, file)

      // Skip if not a file
      if (!fs.statSync(sourcePath).isFile()) {
        continue
      }

      // Skip if file already exists in target
      if (fs.existsSync(targetPath)) {
        console.log(`⏭️  Skipping ${file} (already exists)`)
        skipCount++
        continue
      }

      // Copy file
      fs.copyFileSync(sourcePath, targetPath)
      console.log(`✅ Copied: ${file}`)
      copyCount++
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📊 COPY SUMMARY')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`✅ Copied: ${copyCount}`)
    console.log(`⏭️  Skipped: ${skipCount}`)
    console.log(`📊 Total: ${files.length}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (copyCount > 0) {
      console.log('🎉 Media files copied to Render Disk successfully!')
    }

    process.exit(0)
  } catch (error) {
    console.error('💥 Copy failed:', error)
    process.exit(1)
  }
}

copyMediaToDisk()
