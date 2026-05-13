import { getIO } from '../socket.js'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import User from '../models/User.js'

// =========================
// LIVE METRICS STREAM
// =========================
export const pushLiveMetrics = async (tenantId) => {
  try {

    const orders = await Order.find({ tenantId })
    const products = await Product.find({ tenantId })
    const users = await User.find({ tenantId })

    const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)

    const lowStock = products.filter(p => p.stock <= 5).length

    const payload = {
      revenue,
      orders: orders.length,
      products: products.length,
      users: users.length,
      lowStock,
      timestamp: new Date()
    }

    // Emit to tenant room (real-time dashboard)
    const io = getIO()

    io.to(tenantId.toString()).emit('live-metrics', payload)

  } catch (err) {

    console.error('Analytics Stream Error:', err.message)

  }
}