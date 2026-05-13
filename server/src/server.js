import http from 'http'
import dotenv from 'dotenv'
dotenv.config()  // Load .env FIRST

import app from './app.js'
import connectDB from './config/db.js'
import { initSocket } from './socket.js'
import { startAICronJob } from './jobs/aiCronJob.js'

const PORT = process.env.PORT || 5000

const server = http.createServer(app)

initSocket(server)

// START SERVER FIRST (don't wait for DB)
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log('ENV CHECK:', process.env.OPENAI_API_KEY ? 'OK' : 'MISSING')
  
  // Connect to DB after server is already running
  connectDB()
    .then(() => {
      console.log('✅ MongoDB connected')
      startAICronJob()
    })
    .catch((err) => {
      console.error('❌ MongoDB connection failed:', err.message)
      console.log('⚠️  Server running without database')
    })
})