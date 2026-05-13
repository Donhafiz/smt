import express from 'express'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { getDashboardAnalytics } from '../controllers/analyticsController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/dashboard', protect, getDashboardAnalytics)

router.get('/kpis', protect, async (req, res) => {
  try {
    const orders = await Order.find({
      tenantId: req.tenantId
    })

    const revenue = orders.reduce(
      (sum, o) => sum + (o.total || 0),
      0
    )

    res.json({
      orders: orders.length,
      revenue
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router