import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts'

interface Stats {
  services: number
  staff: number
  products: number
  orders: number
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    staff: 0,
    products: 0,
    orders: 0
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [services, staff, products, orders] = await Promise.all([
        axios.get('/api/services'),
        axios.get('/api/staff'),
        axios.get('/api/products'),
        axios.get('/api/orders')
      ])

      setStats({
        services: services.data.length,
        staff: staff.data.length,
        products: products.data.length,
        orders: orders.data.length
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const chartData = [
    { name: 'Services', value: stats.services },
    { name: 'Staff', value: stats.staff },
    { name: 'Products', value: stats.products },
    { name: 'Orders', value: stats.orders }
  ]

  return (
    <div className="space-y-8 text-white">

      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-gray-400">System overview & performance</p>
      </div>

      {loading && <p className="text-gray-400">Loading charts...</p>}

      {/* CARDS */}
      <div className="grid md:grid-cols-4 gap-4">
        {chartData.map((item) => (
          <div key={item.name} className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
            <h2 className="text-gray-400">{item.name}</h2>
            <p className="text-2xl font-bold text-blue-400">{item.value}</p>
          </div>
        ))}
      </div>

      {/* BAR CHART */}
      <div className="bg-[#0f172a] p-6 rounded-xl border border-gray-800">
        <h2 className="mb-4 font-semibold">System Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LINE CHART */}
      <div className="bg-[#0f172a] p-6 rounded-xl border border-gray-800">
        <h2 className="mb-4 font-semibold">Growth Trend</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}