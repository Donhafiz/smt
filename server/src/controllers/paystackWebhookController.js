import crypto from 'crypto'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { getIO } from '../socket.js'
import { runInventoryAI } from '../services/inventoryAI.js'
import { runRestockAI } from '../services/restockAI.js'
import Subscription from '../models/Subscription.js'
import Tenant from '../models/Tenant.js'

export const paystackWebhook = async (req, res) => {

  try {

    const secret = process.env.PAYSTACK_SECRET_KEY

    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex')

    // =========================
    // VERIFY WEBHOOK
    // =========================
    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(401).json({ message: 'Invalid signature' })
    }

    const event = req.body

    // =========================
    // ONLY HANDLE SUCCESSFUL PAYMENTS
    // =========================
    if (event.event !== 'charge.success') {
      return res.status(200).send('ignored')
    }

    const data = event.data

    const items = data.metadata?.items || []

    const customerName = data.customer?.name || 'Customer'
    const customerEmail = data.customer?.email
    const total = data.amount / 100

    // =========================
    // CREATE ORDER
    // =========================
    const order = await Order.create({
      customerName,
      customerEmail,
      items,
      total,
      paymentMethod: 'paystack',
      status: 'paid'
    })

    const io = getIO()

    // =========================
    // STOCK DEDUCTION
    // =========================
    for (const item of items) {

      const product = await Product.findById(item.productId)

      if (!product) continue

      product.stock -= item.quantity
      await product.save()

    }

    // =========================
    // REAL-TIME EVENTS
    // =========================
    io.emit('new-order', {
      message: '🛒 Paystack order received',
      order
    })

    io.emit('payment-success', {
      message: `💳 Payment confirmed: GHS ${total}`
    })

    const tenantId = data.metadata?.tenantId

    const plan = data.metadata?.plan || 'starter'

    if (tenantId) {

      await Subscription.findOneAndUpdate(
    { tenantId },
    {
      tenantId,
      plan,
      status: 'active',
      amount: total,
      nextBillingDate:
        new Date(
          Date.now() +
          30 * 24 * 60 * 60 * 1000
        )
    },
    { upsert: true }
  )

  await Tenant.findByIdAndUpdate(
    tenantId,
    { plan }
  )
}



    // =========================
    // TRIGGER INTELLIGENCE SYSTEMS
    // =========================
    await runInventoryAI()
    await runRestockAI()

    return res.status(200).json({ received: true })

  } catch (err) {

    console.error(err)

    return res.status(500).json({
      message: err.message
    })

  }
}