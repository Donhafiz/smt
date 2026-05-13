import axios from 'axios'

const PAYSTACK_URL = 'https://api.paystack.co'

export const initializePayment = async (data) => {
  const response = await axios.post(
    `${PAYSTACK_URL}/transaction/initialize`,
    data,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )

  return response.data
}

export const verifyPayment = async (reference) => {
  const response = await axios.get(
    `${PAYSTACK_URL}/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    }
  )

  return response.data
}