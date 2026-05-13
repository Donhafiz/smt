import { Server } from 'socket.io'
import Order from './models/Order.js'

let io

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', (socket) => {
    console.log('⚡ Client connected:', socket.id)

    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
  })
}

// 🔴 LIVE EVENTS
export const emitNewOrder = async (order) => {
  if (!io) return

  io.emit('new-order', {
    message: `New order received: GHS ${order.total}`,
    order
  })
}

export const emitRevenueUpdate = async () => {
  if (!io) return

  const orders = await Order.find()

  const revenue = orders.reduce(
    (sum, o) => sum + (o.total || 0),
    0
  )

  io.emit('revenue-update', {
    revenue
  })
}

export const emitAIAlert = (message) => {
  if (!io) return

  io.emit('ai-alert', {
    message,
    time: new Date()
  })
}

export const getIO = () => {
  return io
}