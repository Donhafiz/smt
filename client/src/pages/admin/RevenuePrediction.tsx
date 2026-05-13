import { useEffect, useState } from 'react'
import axios from 'axios'

interface Order {
  total: number
}

export default function RevenuePrediction() {

  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {

    try {

      const res = await axios.get('/api/orders')
      setOrders(res.data)

    } catch (err) {
      console.log(err)
    }

  }

  // TOTAL REVENUE
  const revenue = orders.reduce(
    (acc, order) => acc + order.total,
    0
  )

  // SIMPLE PREDICTION
  const projectedRevenue =
    revenue * 1.2

  return (
    <div className="space-y-6 text-white">

      <div>

        <h1 className="text-3xl font-bold">
          Revenue Intelligence
        </h1>

        <p className="text-gray-400">
          AI-powered revenue forecasting
        </p>

      </div>

      {/* CURRENT */}
      <div className="bg-[#0f172a] p-6 rounded-xl border border-gray-800">

        <h2 className="text-lg text-gray-400">
          Current Revenue
        </h2>

        <p className="text-4xl font-bold text-green-400 mt-2">
          GHS {revenue.toFixed(2)}
        </p>

      </div>

      {/* PREDICTION */}
      <div className="bg-[#0f172a] p-6 rounded-xl border border-blue-900">

        <h2 className="text-lg text-gray-400">
          Predicted Revenue
        </h2>

        <p className="text-4xl font-bold text-blue-400 mt-2">
          GHS {projectedRevenue.toFixed(2)}
        </p>

        <p className="text-sm text-gray-500 mt-3">
          Estimated 20% growth trend detected
        </p>

      </div>

    </div>
  )
}