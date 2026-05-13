import http from 'http'
import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './config/db.js'

import { initSocket } from './socket.js'
import { startAICronJob } from './jobs/aiCronJob.js'

dotenv.config()

connectDB()

const PORT = process.env.PORT || 5000

const server = http.createServer(app)

initSocket(server)

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)

  console.log('ENV CHECK:', process.env.OPENAI_API_KEY ? 'OK' : 'MISSING')
  
  // Start AI cron job
  startAICronJob()
})