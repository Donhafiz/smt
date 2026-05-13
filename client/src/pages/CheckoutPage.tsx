import { useState } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: ''
  })

  const [loading, setLoading] = useState(false)

 const placeOrder = async () => {
  if (!form.name || !form.phone || !form.address) return

  setLoading(true)

  try {
    const res = await axios.post('/api/paystack/initialize', {
      email: 'customer@email.com',
      amount: total,
      orderData: {
        customerName: form.name,
        phone: form.phone,
        address: form.address,
        items: cart
      }
    })

    const { authorization_url } = res.data.data

    window.location.href = authorization_url
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}
  return (
    <div className="space-y-6 text-white">

      <h1 className="text-3xl font-bold">Checkout</h1>

      {/* FORM */}
      <div className="bg-[#0f172a] p-5 rounded-xl space-y-3">

        <input
          placeholder="Full Name"
          className="w-full p-2 bg-black border rounded"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Phone"
          className="w-full p-2 bg-black border rounded"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Address"
          className="w-full p-2 bg-black border rounded"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />

      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-[#0f172a] p-5 rounded-xl">
        <h2 className="font-bold mb-3">Order Summary</h2>

        {cart.map(item => (
          <div key={item._id} className="text-sm text-gray-400">
            {item.name} × {item.quantity}
          </div>
        ))}

        <div className="mt-3 font-bold">
          Total: GHS {total}
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={placeOrder}
        disabled={loading}
        className="bg-green-600 px-4 py-2 rounded w-full"
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>

    </div>
  )
}