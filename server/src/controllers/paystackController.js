import axios from 'axios'

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY
const PAYSTACK_BASE = 'https://api.paystack.co'

export const initializePayment = async (req, res) => {
  try {
    const { email, amount, phone, paymentMethod } = req.body
    
    const response = await axios.post(
      `${PAYSTACK_BASE}/transaction/initialize`,
      {
        email,
        amount: amount * 100,
        currency: 'GHS',
        channels: paymentMethod === 'momo' ? ['mobile_money'] : ['card', 'bank'],
        metadata: req.body.metadata || {}
      },
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}`, 'Content-Type': 'application/json' } }
    )
    
    res.json(response.data)
  } catch (err) {
    res.status(400).json({ message: err.response?.data?.message || 'Payment failed' })
  }
}

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body
    
    const response = await axios.get(
      `${PAYSTACK_BASE}/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } }
    )
    
    if (response.data.data.status === 'success') {
      res.json({ verified: true, data: response.data.data })
    } else {
      res.status(400).json({ verified: false, message: 'Payment not successful' })
    }
  } catch (err) {
    res.status(400).json({ message: 'Verification failed' })
  }
}