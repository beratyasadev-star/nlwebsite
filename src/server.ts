import express from 'express'
import dotenv from 'dotenv'
import payload from 'payload'

dotenv.config()

console.log('📌 Server starting...')
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✓' : '✗')
console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✓' : '✗')

const start = async () => {
  try {
    const app = express()

    console.log('⚙️  Initializing Payload...')

    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      express: app,
      onInit: async (payload) => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
      },
    })

    console.log('✅ Payload initialized, starting listener...')

    const PORT = 3001
    app.listen(PORT, () => {
      console.log('\n✅ SERVER RUNNING\n')
      console.log('Admin: http://localhost:3001/admin')
    })

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

start()

