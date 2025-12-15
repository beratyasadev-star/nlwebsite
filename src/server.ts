import express from 'express'
import dotenv from 'dotenv'
import payload from 'payload'
import path from 'path'

dotenv.config()

console.log('📌 Server starting...')

console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✓' : '✗')
console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✓' : '✗')

if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET environment variable is not set');
}
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

const start = async () => {
  try {
    const app = express()

    console.log('⚙️  Initializing Payload...')

    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      express: app,
      onInit: async () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
      },
    })

    console.log('✅ Payload initialized, starting listener...')

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log('\n✅ SERVER RUNNING\n')
      console.log(`Admin: http://localhost:${PORT}/admin`)
    })

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

start()

