import Order from '../models/Order.js'
import Product from '../models/Product.js'

// ================================
// ERP KPI DASHBOARD DATA
// ================================
export const getDashboardAnalytics = async (req, res) => {
  try {

    const tenantId = req.tenantId

    const orders = await Order.find({ tenantId })
    const products = await Product.find({ tenantId })

    // ================================
    // REVENUE CALCULATION
    // ================================
    const revenue = orders.reduce(
      (sum, o) => sum + (o.total || 0),
      0
    )

    // ================================
    // DAILY REVENUE (REAL AGGREGATION)
// ================================
    const dailyMap = {}

    orders.forEach(order => {
      const day = new Date(order.createdAt).toLocaleDateString()

      if (!dailyMap[day]) {
        dailyMap[day] = 0
      }

      dailyMap[day] += order.total || 0
    })

    const revenueTrend = Object.keys(dailyMap).map(date => ({
      name: date,
      revenue: dailyMap[date]
    }))

    // ================================
    // LOW STOCK PRODUCTS
    // ================================
    const lowStock = products.filter(p => p.stock <= 5)

    // ================================
    // RESPONSE
    // ================================
    res.json({
      kpis: {
        orders: orders.length,
        products: products.length,
        revenue
      },
      revenueTrend,
      lowStock
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}