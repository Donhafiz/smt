import { useEffect, useState } from 'react'
import axios from 'axios'

interface Order {
  _id: string
  customerName: string
  phone: string
  address: string
  status: string
  totalAmount: number
  items: any[]
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/orders')
      setOrders(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await axios.patch(`/api/orders/${id}/status`, { status })
    fetchOrders()
  }

  const deleteOrder = async (id: string) => {
    await axios.delete(`/api/orders/${id}`)
    fetchOrders()
  }

  const filtered =
    filter === 'all'
      ? orders
      : orders.filter(o => o.status === filter)

  return (
    <div className="space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Order Management</h1>
        <p className="text-gray-400">
          Manage customer purchases and delivery flow
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 flex-wrap">

        {['all', 'pending', 'processing', 'delivered', 'cancelled'].map(
          status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded text-sm ${
                filter === status
                  ? 'bg-blue-600'
                  : 'bg-gray-700'
              }`}
            >
              {status}
            </button>
          )
        )}

      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-400">Loading orders...</p>}

      {/* ORDERS LIST */}
      <div className="space-y-4">

        {filtered.map(order => (
          <div
            key={order._id}
            className="bg-[#0f172a] border border-gray-800 p-5 rounded-xl space-y-3"
          >

            {/* TOP INFO */}
            <div className="flex justify-between flex-wrap gap-2">

              <div>
                <h2 className="font-bold">{order.customerName}</h2>
                <p className="text-gray-400 text-sm">
                  {order.phone} • {order.address}
                </p>
              </div>

              <div className="text-right">
                <p className="text-green-400 font-bold">
                  GHS {order.totalAmount}
                </p>
                <p className="text-xs text-gray-400">
                  {order.status}
                </p>
              </div>

            </div>

            {/* ITEMS */}
            <div className="text-sm text-gray-400">
              {order.items.map((item, idx) => (
                <div key={idx}>
                  {item.name} × {item.quantity}
                </div>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-2">

              <select
                value={order.status}
                onChange={e =>
                  updateStatus(order._id, e.target.value)
                }
                className="bg-black border border-gray-700 p-1 rounded"
              >
                <option value="pending">pending</option>
                <option value="processing">processing</option>
                <option value="delivered">delivered</option>
                <option value="cancelled">cancelled</option>
              </select>

              <button
                onClick={() => deleteOrder(order._id)}
                className="bg-red-600 px-3 py-1 rounded text-sm"
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