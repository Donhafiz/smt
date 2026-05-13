import Order from '../models/Order.js'
import Product from '../models/Product.js'

import { getIO } from '../socket.js'
import eventBus from '../events/eventBus.js'

import { sendEmail } from '../services/emailService.js'
import { emailTemplate } from '../utils/emailTemplate.js'

import { runAlertCenter } from '../services/alertCenter.js'
import { runInventoryAI } from '../services/inventoryAI.js'
import { runRestockAI } from '../services/restockAI.js'
import { evaluateRestockNeeds } from '../services/autoRestockAI.js'

import { notify } from '../services/notificationEngine.js'
import { createAuditLog } from '../services/auditService.js'
import { pushLiveMetrics } from '../services/analyticsStream.js'
import { generateInvoice } from '../services/invoiceService.js'
import { createPaymentIntent } from '../payments/paymentService.js'

/* =========================================================
   CREATE ORDER
========================================================= */
export const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, items, total, paymentMethod } = req.body
    const paymentIntent = await createPaymentIntent({
      order: {
        customerName,
        customerEmail,
        items,
        total,
        paymentMethod
      },
      tenantId: req.tenantId
    })
    // ---- STOCK VALIDATION ----
    const productCache = new Map()

    for (const item of items) {
      const product = await Product.findOne({
        _id: item.productId,
        tenantId: req.tenantId
      })

      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} out of stock`
        })
      }

      productCache.set(String(product._id), product)
    }

    // ---- CREATE ORDER ----
    const order = await Order.create({
      customerName,
      customerEmail,
      items,
      total,
      paymentMethod,
      paymentIntentId: paymentIntent.id,
      status: 'paid',
      tenantId: req.tenantId
    })

    eventBus.emit('order:created', order)

    // ---- STOCK DEDUCTION ----
    for (const item of items) {
      const product = productCache.get(String(item.productId))

      if (!product) continue

      product.stock -= item.quantity
      await product.save()

      if (product.stock <= 5) {
        getIO().emit('low-stock', {
          message: `⚠️ Low stock: ${product.name} (${product.stock})`
        })
      }
    }

    // ---- AI PIPELINE (ASYNC SAFE) ----
    runAlertCenter(req.tenantId).catch(console.error)
    runInventoryAI(req.tenantId).catch(console.error)
    runRestockAI(req.tenantId).catch(console.error)

    const restock = await evaluateRestockNeeds(req.tenantId)

    if (restock?.criticalCount > 0) {
      getIO().emit('ai-restock-alert', {
        message: '🚨 Critical stock detected',
        data: restock
      })
    }

    // ---- REALTIME EVENTS ----
    const io = getIO()

    io.emit('new-order', { order })
    io.emit('revenue-update', { total })

    // ---- ANALYTICS ----
    pushLiveMetrics(req.tenantId).catch(console.error)

    // ---- AUDIT ----
    createAuditLog({
      tenantId: req.tenantId,
      userId: req.user._id,
      action: 'order_created',
      entity: 'order',
      entityId: order._id,
      metadata: { customerName, customerEmail, items, total, paymentMethod },
      req
    }).catch(console.error)

    // ---- NOTIFICATION ----
    notify({
      channel: 'email',
      to: customerEmail,
      subject: 'Order Confirmation',
      message: `Order received: GHS ${total}`,
      html: `
        <div style="font-family:Arial">
          <h2>Order Confirmed</h2>
          <p>Hi ${customerName}</p>
          <p>Total: GHS ${total}</p>
        </div>
      `
    }).catch(console.error)

    // ---- ADMIN EMAIL ----
    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Order Received',
      html: emailTemplate({
        title: 'New Order',
        body: `
          <p>Customer: ${customerName}</p>
          <p>Total: GHS ${total}</p>
        `
      })
    }).catch(console.error)

    // ---- INVOICE ----
    const invoice = await generateInvoice(order)

    return res.status(201).json({ order, invoice })

  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

/* =========================================================
   GET ORDERS
========================================================= */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ tenantId: req.tenantId })
      .sort({ createdAt: -1 })

    return res.json(orders)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

/* =========================================================
   GET SINGLE ORDER
========================================================= */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      tenantId: req.tenantId
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    return res.json(order)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

/* =========================================================
   UPDATE ORDER STATUS
========================================================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body

    const order = await Order.findOne({
      _id: req.params.id,
      tenantId: req.tenantId
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    order.status = status
    await order.save()

    getIO().emit('order-status-updated', {
      orderId: order._id,
      status
    })

    return res.json({ message: 'Status updated', order })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

/* =========================================================
   DELETE ORDER
========================================================= */
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.tenantId
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    return res.json({ message: 'Order deleted' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}