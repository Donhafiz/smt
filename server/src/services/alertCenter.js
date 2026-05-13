import { getIO } from '../socket.js'
import Order from '../models/Order.js'
import Product from '../models/Product.js'

export const runAlertCenter = async (tenantId) => {

  const io = getIO()

  const orders = await Order.find({ tenantId })
  const products = await Product.find({ tenantId })

  const today = new Date().toDateString()

  const todayOrders = orders.filter(
    o => new Date(o.createdAt).toDateString() === today
  )

  // =========================
  // 1. ORDER SPIKE DETECTION
  // =========================
  if (todayOrders.length >= 10) {
    io.emit('alert', {
      type: 'success',
      message: '🚀 Order spike detected in real-time'
    })
  }

  // =========================
  // 2. LOW ACTIVITY WARNING
  // =========================
  if (todayOrders.length <= 2) {
    io.emit('alert', {
      type: 'warning',
      message: '⚠️ Low order activity today'
    })
  }

  // =========================
  // 3. LOW STOCK INTELLIGENCE
  // =========================
  const lowStock = products.filter(p => p.stock <= 5)

  if (lowStock.length > 0) {
    io.emit('alert', {
      type: 'danger',
      message: `⚠️ ${lowStock.length} products are low in stock`
    })
  }

  // =========================
  // 4. REVENUE MOMENTUM CHECK
  // =========================
  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0)

  if (revenue > 10000) {
    io.emit('alert', {
      type: 'info',
      message: '📈 Strong revenue momentum detected'
    })
  }
}