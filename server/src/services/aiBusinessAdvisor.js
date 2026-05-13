import Order from '../models/Order.js'
import Product from '../models/Product.js'
import User from '../models/User.js'

export const generateBusinessInsights = async (tenantId) => {

  // =========================
  // DATA COLLECTION
  // =========================
  const orders = await Order.find({ tenantId })
  const products = await Product.find({ tenantId })
  const users = await User.find({ tenantId })

  // =========================
  // METRICS
  // =========================
  const revenue = orders.reduce(
    (sum, o) => sum + (o.total || 0),
    0
  )

  const lowStockItems = products.filter(
    p => p.stock <= 5
  )

  const totalOrders = orders.length

  const avgOrderValue =
    totalOrders > 0
      ? revenue / totalOrders
      : 0

  // =========================
  // INSIGHTS ENGINE
  // =========================
  const insights = []

  if (revenue < 1000) {
    insights.push({
      type: 'warning',
      message: 'Revenue is below target threshold'
    })
  }

  if (lowStockItems.length > 0) {
    insights.push({
      type: 'risk',
      message: `${lowStockItems.length} products are low in stock`
    })
  }

  if (avgOrderValue < 50) {
    insights.push({
      type: 'opportunity',
      message: 'Average order value is low — consider upselling strategies'
    })
  }

  if (users.length < 5) {
    insights.push({
      type: 'growth',
      message: 'Low user base — recommend marketing campaign'
    })
  }

  // =========================
  // EXECUTIVE SUMMARY
  // =========================
  const summary = `
Business Overview:

- Total Revenue: GHS ${revenue}
- Total Orders: ${totalOrders}
- Average Order Value: GHS ${avgOrderValue.toFixed(2)}
- Low Stock Items: ${lowStockItems.length}
- Users: ${users.length}

Status: ${
    revenue > 5000
      ? 'Healthy'
      : 'Needs Attention'
  }
`

  return {
    revenue,
    totalOrders,
    avgOrderValue,
    lowStockItems,
    insights,
    summary
  }
}