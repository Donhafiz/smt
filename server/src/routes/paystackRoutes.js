import express from 'express'
import crypto from 'crypto'
import axios from 'axios'
import Order from '../models/Order.js'
import { getIO } from '../socket.js'

const router = express.Router()

// ========================
// INITIALIZE PAYMENT (PUBLIC)
// ========================
router.post('/initialize', async (req, res) => {
  try {
    const { email, amount, metadata } = req.body
    const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: Math.round(amount * 100), // Convert to pesewas
        currency: 'GHS',
        metadata,
        callback_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-success`
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json'
        }
      }
    )

    res.json(response.data)
  } catch (err) {
    console.error('Paystack initialize error:', err.response?.data || err.message)
    res.status(400).json({ message: err.response?.data?.message || 'Payment initialization failed' })
  }
})

// ========================
// VERIFY PAYMENT (PUBLIC)
// ========================
router.post('/verify', async (req, res) => {
  try {
    const { reference } = req.body
    const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`
        }
      }
    )

    if (response.data.data.status === 'success') {
      res.json({ verified: true, data: response.data.data })
    } else {
      res.status(400).json({ verified: false, message: 'Payment not successful' })
    }
  } catch (err) {
    console.error('Paystack verify error:', err.response?.data || err.message)
    res.status(400).json({ message: 'Verification failed' })
  }
})

// ========================
// WEBHOOK (PAYSTACK CALLS THIS)
// ========================
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

    if (event.event === 'charge.success') {
      const reference = event.data.reference
      const order = await Order.findOne({ reference })

      if (order) {
        order.status = 'paid'
        await order.save()

        getIO().emit('payment-success', {
          message: '💳 Payment confirmed',
          order
        })
        getIO().emit('revenue-update', {})
      }
    }

    res.sendStatus(200)
  } catch (err) {
    console.error('Webhook error:', err)
    res.sendStatus(500)
  }
})

export default router