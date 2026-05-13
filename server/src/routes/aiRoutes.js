import express from 'express'
import Order from '../models/Order.js'
import { getAIInsights } from '../controllers/aiAnalyticsController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/insights', protect, getAIInsights)

router.get('/insights', async (req, res) => {
  try {
    const orders = await Order.find()

    const totalRevenue = orders.reduce(
      (sum, o) => sum + (o.total || 0),
      0
    )

    const today = new Date().toDateString()

    const todayOrders = orders.filter(
      o => new Date(o.createdAt).toDateString() === today
    )

    const yesterdayOrders = orders.filter(o => {
      const d = new Date(o.createdAt)
      const y = new Date()
      y.setDate(y.getDate() - 1)
      return d.toDateString() === y.toDateString()
    })

    const growth =
      yesterdayOrders.length === 0
        ? 100
        : ((todayOrders.length - yesterdayOrders.length) /
            yesterdayOrders.length) *
          100

    // -----------------------------
    // 🧠 BUSINESS INSIGHTS LOGIC
    // -----------------------------

    const insights = []

    // Revenue insight
    if (totalRevenue > 10000) {
      insights.push({
        type: 'success',
        message: 'Revenue is performing strongly above baseline.'
      })
    } else {
      insights.push({
        type: 'warning',
        message: 'Revenue is below expected ERP threshold.'
      })
    }

    // Growth insight
    if (growth > 10) {
      insights.push({
        type: 'success',
        message: `Orders increased by ${growth.toFixed(1)}% compared to yesterday.`
      })
    } else if (growth < 0) {
      insights.push({
        type: 'danger',
        message: `Orders dropped by ${Math.abs(growth).toFixed(1)}%. Investigate demand.`
      })
    } else {
      insights.push({
        type: 'info',
        message: 'Order volume is stable.'
      })
    }

    // Activity insight
    if (todayOrders.length === 0) {
      insights.push({
        type: 'danger',
        message: 'No orders recorded today — possible system or demand issue.'
      })
    }

    res.json({
      totalRevenue,
      todayOrders: todayOrders.length,
      growth,
      insights
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router