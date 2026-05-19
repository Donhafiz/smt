import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import Order from '../models/Order.js'

const router = express.Router()

// GET all orders — any logged-in user can see their orders
router.get('/', protect, async (req, res) => {
  try {
    // Regular users see only their orders, admins see all
    let query = {}
    if (req.user.role === 'user') {
      query = { customerEmail: req.user.email }
    }
    const orders = await Order.find(query).sort({ createdAt: -1 }).limit(50)
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// CREATE order — any logged-in user can create
router.post('/', protect, async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      customerEmail: req.user.email,
      tenantId: 'default-tenant'
    })
    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// UPDATE order status — admin only
router.put('/:id', protect, async (req, res) => {
  try {
    if (req.user.role === 'user') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(order)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE order — admin only
router.delete('/:id', protect, async (req, res) => {
  try {
    if (req.user.role === 'user') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    await Order.findByIdAndDelete(req.params.id)
    res.json({ message: 'Order deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router