import http from 'http'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import app from './app.js'
import connectDB from './config/db.js'
import { startAICronJob } from './jobs/aiCronJob.js'

dotenv.config()

const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
})

// WebSocket connection
io.on('connection', (socket) => {
  console.log('🔌 Client connected')
  
  // Simulate live visitors
  const visitorInterval = setInterval(() => {
    const count = Math.floor(Math.random() * 50) + 10
    socket.emit('visitorUpdate', count)
  }, 5000)

  // Simulate new orders
  const orderInterval = setInterval(() => {
    if (Math.random() > 0.7) {
      socket.emit('newOrder', {
        _id: Date.now().toString(),
        customerName: 'New Customer',
        total: Math.floor(Math.random() * 5000) + 100,
        status: 'pending',
        createdAt: new Date().toISOString()
      })
    }
  }, 10000)

  socket.on('disconnect', () => {
    clearInterval(visitorInterval)
    clearInterval(orderInterval)
    console.log('🔌 Client disconnected')
  })
})

// Make io accessible
app.set('io', io)

connectDB().then(() => {
  server.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    console.log('ENV CHECK:', process.env.OPENAI_API_KEY ? 'OK' : 'MISSING')
    startAICronJob()
  })
})