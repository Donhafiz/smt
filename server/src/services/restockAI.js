import Product from '../models/Product.js'
import Order from '../models/Order.js'
import { getIO } from '../socket.js'

export const runRestockAI = async () => {

  const io = getIO()

  const products = await Product.find()
  const orders = await Order.find()

  let recommendations = []

  products.forEach(product => {

    // =========================
    // CALCULATE SALES VELOCITY
    // =========================
    const productOrders = orders.filter(o =>
      o.items?.some(i => i.productId?.toString() === product._id.toString())
    )

    const totalSold = productOrders.reduce((sum, order) => {

      const item = order.items.find(i =>
        i.productId?.toString() === product._id.toString()
      )

      return sum + (item?.quantity || 0)

    }, 0)

    const daysTracked = Math.max(productOrders.length, 1)

    const dailySalesRate = totalSold / daysTracked

    // =========================
    // ESTIMATE DAYS LEFT
    // =========================
    const daysLeft = dailySalesRate > 0
      ? product.stock / dailySalesRate
      : 999

    // =========================
    // RESTOCK LOGIC
    // =========================
    if (daysLeft <= 7) {

      const suggestedRestock = Math.ceil(dailySalesRate * 14)

      recommendations.push({
        product: product.name,
        stock: product.stock,
        daysLeft: Math.round(daysLeft),
        suggestedRestock
      })
    }

  })

  // =========================
  // EMIT RESTOCK ALERTS
  // =========================
  if (recommendations.length > 0) {

    io.emit('restock-alert', {
      type: 'restock',
      message: `📦 ${recommendations.length} products need restocking`,
      data: recommendations
    })
  }

  return recommendations
}