import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import { ShoppingCart, Eye, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function OrderManager() {
  const { t } = useTranslation()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders')
      setOrders(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter)

  const statusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-400" />
      case 'pending': return <Clock size={16} className="text-yellow-400" />
      case 'cancelled': return <XCircle size={16} className="text-red-400" />
      default: return <Eye size={16} className="text-gray-400" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Orders
        </h1>
        <div className="flex gap-2">
          {['all', 'pending', 'completed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${
                filter === f ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
          <p>No orders found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map(order => (
            <div key={order._id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {statusIcon(order.status)}
                <div>
                  <p className="font-medium">{order.customerName || 'Customer'}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-cyan-400">GHS {order.total?.toLocaleString()}</p>
                <p className="text-xs text-gray-500 capitalize">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

