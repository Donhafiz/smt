import { getIO } from '../socket.js'
import Order from '../models/Order.js'

// ================================
// MULTI-CHANNEL ALERT SYSTEM
// ================================
export const runSmartAlerts = async (tenantId) => {
  const orders = await Order.find({ tenantId })

  const today = new Date().toDateString()

  const todayOrders = orders.filter(
    o => new Date(o.createdAt).toDateString() === today
  )

  const io = getIO()

  // 🚀 SPIKE ALERT
  if (todayOrders.length > 10) {
    io.emit('alert', {
      type: 'success',
      message: '🚀 Order spike detected'
    })
  }

  // ⚠️ LOW ACTIVITY ALERT
  if (todayOrders.length < 2) {
    io.emit('alert', {
      type: 'warning',
      message: '⚠️ Low business activity today'
    })
  }

  // 📈 GROWTH ALERT
  if (orders.length > 50) {
    io.emit('alert', {
      type: 'info',
      message: '📈 Business scaling detected'
    })
  }
}