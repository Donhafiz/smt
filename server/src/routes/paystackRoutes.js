import express from 'express'
import crypto from 'crypto'
import Order from '../models/Order.js'
import { getIO } from '../socket.js'

const router = express.Router()

router.post('/webhook', async (req, res) => {
  try {

    const secret = process.env.PAYSTACK_SECRET_KEY

    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex')

    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(401).send('Invalid signature')
    }

    const event = req.body

    // ================================
    // PAYMENT SUCCESS
    // ================================
    if (event.event === 'charge.success') {

      const reference = event.data.reference

      const order = await Order.findOne({ reference })

      if (order) {
        order.status = 'paid'
        await order.save()

        // REAL-TIME ERP UPDATE
        getIO().emit('payment-success', {
          message: '💰 Payment confirmed',
          order
        })

        getIO().emit('revenue-update', {})
      }
    }

    res.sendStatus(200)

  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

export default router