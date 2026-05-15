import express from 'express'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, async (req, res) => {
  res.json({ message: 'Delivery system active' })
})

router.post('/track', protect, async (req, res) => {
  res.json({ message: 'Tracking info', orderId: req.body.orderId })
})

export default router