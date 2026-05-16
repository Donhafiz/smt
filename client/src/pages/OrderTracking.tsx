import { useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export default function OrderTracking() {
  const { t } = useTranslation()
  const [reference, setReference] = useState('')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const trackOrder = async () => {
    if (!reference) return

    setLoading(true)

    try {
      const res = await axios.get(`/api/orders/${reference}`)
      setOrder(res.data)
    } catch (err) {
      console.log(err)
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const getStep = (status: string) => {
    const steps = ['pending', 'paid', 'processing', 'delivered']
    return steps.indexOf(status)
  }

  return (
    <div className="text-white space-y-6">

      <h1 className="text-3xl font-bold">Track Your Order</h1>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={reference}
          onChange={e => setReference(e.target.value)}
          placeholder="Enter Order ID"
          className="p-2 bg-black border border-gray-700 rounded w-full"
        />

        <button
          onClick={trackOrder}
          className="bg-blue-600 px-4 rounded"
        >
          Track
        </button>
      </div>

      {loading && <p className="text-gray-400">Searching...</p>}

      {/* ORDER DISPLAY */}
      {order && (
        <div className="bg-[#0f172a] p-5 rounded-xl space-y-3">

          <h2 className="font-bold">
            Order Status: {order.status}
          </h2>

          {/* TRACKING STEPS */}
          <div className="flex gap-2 text-xs">

            {['pending', 'paid', 'processing', 'delivered'].map((step, i) => (
              <div
                key={step}
                className={`px-2 py-1 rounded ${
                  i <= getStep(order.status)
                    ? 'bg-green-600'
                    : 'bg-gray-700'
                }`}
              >
                {step}
              </div>
            ))}

          </div>

          {/* DETAILS */}
          <div className="text-sm text-gray-400 space-y-1">
            <p>Name: {order.customerName}</p>
            <p>Total: GHS {order.total}</p>
          </div>

        </div>
      )}

    </div>
  )
}

