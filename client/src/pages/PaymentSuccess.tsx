import { useEffect } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'

export default function PaymentSuccess() {
  const { clearCart } = useCart()

  useEffect(() => {
    verify()
  }, [])

  const verify = async () => {
    const url = new URL(window.location.href)
    const reference = url.searchParams.get('reference')

    if (!reference) return

    await axios.get(`/api/paystack/verify/${reference}`)
    clearCart()
  }

  return (
    <div className="text-white p-10">
      <h1 className="text-2xl font-bold">Payment Successful 🎉</h1>
      <p>Your order has been confirmed.</p>
    </div>
  )
}