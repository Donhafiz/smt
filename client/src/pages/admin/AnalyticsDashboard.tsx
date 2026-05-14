import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import { BarChart3, TrendingUp, ShoppingCart, Users, DollarSign } from 'lucide-react'

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/analytics')
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  const metrics = [
    { label: 'Total Revenue', value: `GHS ${(data?.totalRevenue || 0).toLocaleString()}`, icon: <DollarSign size={24} />, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Total Orders', value: data?.totalOrders || 0, icon: <ShoppingCart size={24} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Customers', value: data?.totalCustomers || 0, icon: <Users size={24} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Products', value: data?.totalProducts || 0, icon: <BarChart3 size={24} />, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Analytics Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">{m.label}</span>
              <div className={`p-2 rounded-lg ${m.bg}`}>
                <span className={m.color}>{m.icon}</span>
              </div>
            </div>
            <h2 className={`text-2xl font-bold ${m.color}`}>{m.value}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          <TrendingUp size={48} className="opacity-30" />
          <span className="ml-3">Chart will render here with real data</span>
        </div>
      </div>
    </div>
  )
}