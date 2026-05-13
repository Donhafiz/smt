import Order from '../models/Order.js'
import Product from '../models/Product.js'

export const runAutonomousAI = async (tenantId) => {

  const orders = await Order.find({ tenantId })
  const products = await Product.find({ tenantId })

  const revenue = orders.reduce((s, o) => s + o.total, 0)

  const actions = []

  if (revenue < 2000) {
    actions.push({
      type: 'discount_suggestion',
      message: 'Revenue low → suggest 10% discount campaign'
    })
  }

  const lowStock = products.filter(p => p.stock <= 3)

  if (lowStock.length > 0) {
    actions.push({
      type: 'auto_restock',
      message: `Auto-restock ${lowStock.length} items recommended`
    })
  }

  return {
    status: 'AI ACTIVE',
    actions
  }
}