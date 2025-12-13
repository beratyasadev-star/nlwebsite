import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { MongoClient } from 'mongodb'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
let mongoClient: MongoClient | null = null

// JSON body parser
app.use(express.json())

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is not defined in .env')
  }
  
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env')
  }

  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // MongoDB connection for contact form
  mongoClient = new MongoClient(process.env.MONGODB_URI!)
  await mongoClient.connect()
  const db = mongoClient.db('hollanda-rehberi')
  const contactsCollection = db.collection('contacts')

  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body

      if (!name || !email || !subject || !message) {
        console.log('Eksik alanlar:', { name, email, subject, message })
        return res.status(400).json({ error: 'Tüm alanlar gereklidir' })
      }

      console.log('Contact mesajı kaydediliyor:', { name, email, subject, message })

      const result = await contactsCollection.insertOne({
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
      })

      console.log('Mesaj başarıyla kaydedildi:', result.insertedId)
      return res.status(200).json({ 
        success: true, 
        message: 'Mesaj başarıyla gönderildi',
        data: { id: result.insertedId } 
      })
    } catch (error) {
      console.error('Contact endpoint hatası:', error)
      return res.status(500).json({ 
        error: 'Mesaj kaydedilemedi', 
        details: error instanceof Error ? error.message : String(error) 
      })
    }
  })

  app.listen(3001, async () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ Payload Admin Panel BAŞLATILDI')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📝 Admin Panel: http://localhost:3001/admin`)
    console.log(`📝 İlk kullanıcıyı oluşturmak için yukarıdaki adrese gidin`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  })
}

start().catch((err) => {
  console.error('❌ Error starting server:', err)
  process.exit(1)
})
