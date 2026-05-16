import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js'
import api from '../../lib/axios'
import { BarChart3, TrendingUp, ShoppingCart, Users, DollarSign, Package, GraduationCap, Wrench } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler)

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/analytics/dashboard')
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl border-4 border-cyan-500/30 border-t-cyan-400" />
      </div>
    )
  }

  const statCards = [
    { label: 'Revenue', value: `GHS ${(data?.totalRevenue || 0).toLocaleString()}`, icon: <DollarSign size={22} />, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Orders', value: data?.totalOrders || 0, icon: <ShoppingCart size={22} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Products', value: data?.totalProducts || 0, icon: <Package size={22} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Courses', value: data?.totalCourses || 0, icon: <GraduationCap size={22} />, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Staff', value: data?.totalStaff || 0, icon: <Users size={22} />, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { label: 'Users', value: data?.totalUsers || 0, icon: <Users size={22} />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ]

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#94a3b8' } } },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs">{card.label}</span>
              <div className={`p-1.5 rounded-lg ${card.bg}`}><span className={card.color}>{card.icon}</span></div>
            </div>
            <h2 className={`text-xl font-bold ${card.color}`}>{card.value}</h2>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp size={20} className="text-cyan-400" /> Revenue Trend</h3>
          <div className="h-72">
            {data?.revenueChart && <Line data={data.revenueChart} options={chartOptions} />}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BarChart3 size={20} className="text-purple-400" /> Order Status</h3>
          <div className="h-72 flex items-center justify-center">
            {data?.orderStatusChart && <Doughnut data={data.orderStatusChart} options={{ ...chartOptions, cutout: '65%' }} />}
          </div>
        </motion.div>
      </div>
    </div>
  )
}