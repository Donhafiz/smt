import Order from '../models/Order.js'
import Product from '../models/Product.js'

// ================================
// SELF-LEARNING INSIGHT ENGINE
// ================================
export const generateInsights = async (tenantId) => {
  const orders = await Order.find({ tenantId })
  const products = await Product.find({ tenantId })

  const insights = []

  // ================================
  // 1. REVENUE TREND ANALYSIS
  // ================================
  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)

  if (revenue > 10000) {
    insights.push({
      type: 'success',
      message: '📈 High revenue performance detected'
    })
  }

  if (revenue < 1000) {
    insights.push({
      type: 'warning',
      message: '⚠️ Revenue below expected threshold'
    })
  }

  // ================================
  // 2. ORDER ACTIVITY SPIKE DETECTION
  // ================================
  const today = new Date()
  const todayOrders = orders.filter(o =>
    new Date(o.createdAt).toDateString() === today.toDateString()
  )

  if (todayOrders.length > 10) {
    insights.push({
      type: 'info',
      message: '🚀 Order spike detected today'
    })
  }

  // ================================
  // 3. LOW STOCK INTELLIGENCE
  // ================================
  const lowStock = products.filter(p => p.stock <= 5)

  if (lowStock.length > 0) {
    insights.push({
      type: 'danger',
      message: `⚠️ ${lowStock.length} products low in stock`
    })
  }

  // ================================
  // 4. BUSINESS HEALTH SCORE
  // ================================
  const healthScore =
    (orders.length * 2) +
    (revenue / 100)

  if (healthScore > 80) {
    insights.push({
      type: 'success',
      message: '🟢 Business health is strong'
    })
  } else {
    insights.push({
      type: 'warning',
      message: '🟡 Business health needs attention'
    })
  }

  return {
    revenue,
    orderCount: orders.length,
    insights
  }
}