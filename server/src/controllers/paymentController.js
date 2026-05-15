import axios from 'axios'

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY
const PAYSTACK_BASE = 'https://api.paystack.co'

export const initializePayment = async (req, res) => {
  try {
    const { email, amount, metadata } = req.body

    const response = await axios.post(
      `${PAYSTACK_BASE}/transaction/initialize`,
      {
        email,
        amount: amount * 100, // Convert to kobo/pesewas
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
    res.status(400).json({ message: err.response?.data?.message || 'Payment initialization failed' })
  }
}

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params

    const response = await axios.get(
      `${PAYSTACK_BASE}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`
        }
      }
    )

    res.json(response.data)
  } catch (err) {
    res.status(400).json({ message: 'Payment verification failed' })
  }
}