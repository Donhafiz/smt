import { useEffect, useState } from 'react'
import axios from 'axios'

interface Order {
  _id: string
  customerName: string
  total: number
  status: string
  createdAt: string
}

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders')
      setOrders(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    await axios.put(`/api/orders/${id}`, { status })
    fetchOrders()
  }

  const deleteOrder = async (id: string) => {
    await axios.delete(`/api/orders/${id}`)
    fetchOrders()
  }

  return (
    <div className="space-y-6 text-white">

      <h1 className="text-3xl font-bold">Order Management</h1>

      {loading && <p className="text-gray-400">Loading orders...</p>}

      <div className="space-y-4">

        {orders.map(order => (
          <div key={order._id} className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">

            <div className="flex justify-between">
              <div>
                <p className="font-bold">{order.customerName}</p>
                <p className="text-gray-400 text-sm">
                  GHS {order.total}
                </p>
              </div>

              <span className="text-sm text-blue-400">
                {order.status}
              </span>
            </div>

            <div className="flex gap-2 mt-3">

              <button
                onClick={() => updateStatus(order._id, 'processing')}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Processing
              </button>

              <button
                onClick={() => updateStatus(order._id, 'completed')}
                className="bg-green-600 px-3 py-1 rounded"
              >
                Completed
              </button>

              <button
                onClick={() => deleteOrder(order._id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}