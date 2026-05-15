import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js'
import api from '../../lib/axios'
import { BarChart3, TrendingUp, ShoppingCart, Users, DollarSign, Package } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler)

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [ordersRes, productsRes, staffRes] = await Promise.allSettled([
        api.get('/orders'), api.get('/products'), api.get('/staff')
      ])
      const orders = ordersRes.status === 'fulfilled' ? ordersRes.value.data : []
      const products = productsRes.status === 'fulfilled' ? productsRes.value.data : []
      const staff = staffRes.status === 'fulfilled' ? staffRes.value.data : []
      
      const revenue = Array.isArray(orders) ? orders.reduce((s: number, o: any) => s + (o.total || 0), 0) : 0
      
      // Monthly revenue
      const monthly: Record<string, number> = {}
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      if (Array.isArray(orders)) {
        orders.forEach((o: any) => {
          const m = new Date(o.createdAt).getMonth()
          monthly[months[m]] = (monthly[months[m]] || 0) + (o.total || 0)
        })
      }

      setData({
        totalRevenue: revenue,
        totalOrders: Array.isArray(orders) ? orders.length : 0,
        totalProducts: Array.isArray(products) ? products.length : 0,
        totalStaff: Array.isArray(staff) ? staff.length : 0,
        revenueChart: {
          labels: months,
          datasets: [{
            label: 'Revenue (GHS)',
            data: months.map(m => monthly[m] || 0),
            backgroundColor: 'rgba(6, 182, 212, 0.2)',
            borderColor: '#06b6d4',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#06b6d4'
          }]
        },
        orderStatus: {
          labels: ['Completed', 'Pending', 'Cancelled'],
          datasets: [{
            data: [
              Array.isArray(orders) ? orders.filter(o => o.status === 'completed').length : 0,
              Array.isArray(orders) ? orders.filter(o => o.status === 'pending').length : 0,
              Array.isArray(orders) ? orders.filter(o => o.status === 'cancelled').length : 0,
            ],
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
            borderWidth: 0
          }]
        }
      })
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96"><motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 rounded-2xl border-4 border-cyan-500/30 border-t-cyan-400" /></div>
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#94a3b8' } } },
    scales: { x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }, y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } } }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Analytics Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Revenue', value: `GHS ${(data?.totalRevenue || 0).toLocaleString()}`, icon: <DollarSign size={22} />, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Orders', value: data?.totalOrders || 0, icon: <ShoppingCart size={22} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Products', value: data?.totalProducts || 0, icon: <Package size={22} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Staff', value: data?.totalStaff || 0, icon: <Users size={22} />, color: 'text-orange-400', bg: 'bg-orange-500/10' },
        ].map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">{m.label}</span>
              <div className={`p-2 rounded-lg ${m.bg}`}><span className={m.color}>{m.icon}</span></div>
            </div>
            <h2 className={`text-2xl font-bold ${m.color}`}>{m.value}</h2>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp size={20} className="text-cyan-400" /> Revenue Trend</h3>
          <div className="h-72">{data?.revenueChart && <Line data={data.revenueChart} options={chartOptions} />}</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BarChart3 size={20} className="text-purple-400" /> Order Status</h3>
          <div className="h-72 flex items-center justify-center">
            {data?.orderStatus && <Doughnut data={data.orderStatus} options={{ ...chartOptions, cutout: '70%' }} />}
          </div>
        </motion.div>
      </div>
    </div>
  )
}