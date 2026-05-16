import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { getIO } from '../socket.js'

// ========================
// CREATE ORDER (with email)
// ========================
export const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, items, total } = req.body

    // Stock validation and deduction
    for (const item of items) {
      const product = await Product.findById(item.productId || item._id)
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.name || item.productId}` })
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `${product.name} is out of stock` })
      }
      product.stock -= item.quantity
      await product.save()

      // Emit low stock warning
      if (product.stock <= 5) {
        const io = getIO()
        if (io) io.emit('low-stock', { message: `⚠️ Low stock: ${product.name} (${product.stock})` })
      }
    }

    // Create the order
    const order = await Order.create({
      customerName,
      customerEmail,
      items,
      total,
      status: 'completed'
    })

    // Emit real-time new order event
    const io = getIO()
    if (io) {
      io.emit('new-order', { order })
      io.emit('revenue-update', { total })
    }

    // Send confirmation email (dynamic import, fails silently)
    if (order.customerEmail) {
      import('../services/emailService.js')
        .then(m => m.sendOrderConfirmation(order.customerEmail, order))
        .catch(err => console.error('Order email failed:', err.message))
    }

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ========================
// GET ALL ORDERS
// ========================
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ========================
// GET SINGLE ORDER
// ========================
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ========================
// UPDATE ORDER STATUS
// ========================
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    const io = getIO()
    if (io) io.emit('order-status-updated', { orderId: order._id, status })

    res.json({ message: 'Status updated', order })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ========================
// DELETE ORDER
// ========================
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json({ message: 'Order deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}