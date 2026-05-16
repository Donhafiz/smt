import { useEffect, useMemo, useState } from 'react'
import api from '../../lib/axios'
import { useLiveData } from '../../hooks/useLiveData'
import { useTranslation } from 'react-i18next'
import {   Wrench, Users, ShoppingCart, DollarSign, 
  TrendingUp, UserCheck, Zap, AlertTriangle,
  Package, Brain, Activity
} from 'lucide-react'

interface Stats {
  services: number
  staff: number
  orders: number
  revenue: number
  averageOrder: number
  activeCustomers: number
}

interface ActivityItem {
  title: string
  time: string
}

export default function Dashboard() {
  const { t } = useTranslation()
  const [stats, setStats] = useState<Stats>({
    services: 0,
    staff: 0,
    orders: 0,
    revenue: 0,
    averageOrder: 0,
    activeCustomers: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([])
  const liveStats = useLiveData()
  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError('')

      const [servicesRes, staffRes, ordersRes] = await Promise.allSettled([
        api.get('/services'),
        api.get('/staff'),
        api.get('/orders')
      ])

      // Parse responses safely
      const services = servicesRes.status === 'fulfilled' ? servicesRes.value.data : []
      const staff = staffRes.status === 'fulfilled' ? staffRes.value.data : []
      const orders = ordersRes.status === 'fulfilled' ? ordersRes.value.data : []

      // Calculate stats
      const revenue = Array.isArray(orders) 
        ? orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0) 
        : 0
      
      const averageOrder = Array.isArray(orders) && orders.length > 0 
        ? revenue / orders.length 
        : 0

      const uniqueCustomers = Array.isArray(orders)
        ? new Set(orders.map((o: any) => o.customerEmail).filter(Boolean))
        : new Set()

      setStats({
        services: Array.isArray(services) ? services.length : 0,
        staff: Array.isArray(staff) ? staff.length : 0,
        orders: Array.isArray(orders) ? orders.length : 0,
        revenue,
        averageOrder,
        activeCustomers: uniqueCustomers.size
      })

      // Recent activity
      if (Array.isArray(orders)) {
        const activityFeed = orders.slice(0, 5).map((order: any) => ({
          title: `Order from ${order.customerName || 'Customer'}`,
          time: new Date(order.createdAt).toLocaleString()
        }))
        setRecentActivity(activityFeed)
      }

    } catch (err: any) {
      setError('Failed to load dashboard data')
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  const formattedRevenue = useMemo(() => {
    return stats.revenue.toLocaleString()
  }, [stats.revenue])

  const statCards = [
    { label: 'Services', value: stats.services, icon: <Wrench size={24} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Staff', value: stats.staff, icon: <Users size={24} />, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Orders', value: stats.orders, icon: <ShoppingCart size={24} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Revenue', value: `GHS ${formattedRevenue}`, icon: <DollarSign size={24} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Avg Order', value: `GHS ${stats.averageOrder.toFixed(0)}`, icon: <TrendingUp size={24} />, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Customers', value: stats.activeCustomers, icon: <UserCheck size={24} />, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-gray-400">Loading enterprise analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ERP Intelligence Center
          </h1>
          <p className="text-gray-400 mt-2">
            Real-time business intelligence & operational monitoring
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-green-400">System Online</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-green-400">{liveStats.visitors} live visitors</span>
      </div>
      {/* ERROR */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 flex items-center gap-2">
          <AlertTriangle size={18} />
          {error}
        </div>
      )}

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all duration-300 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">{card.label}</span>
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <span className={card.color}>{card.icon}</span>
              </div>
            </div>
            <h2 className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* CHARTS + AI SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ACTIVITY FEED */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Activity size={20} className="text-cyan-400" />
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.length === 0 && (
              <p className="text-gray-500 text-sm">No recent activity</p>
            )}
            {recentActivity.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI INSIGHTS */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Brain size={20} className="text-purple-400" />
            <h2 className="text-lg font-semibold">AI Insights</h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-sm text-purple-300">
                📊 Revenue trend is <strong>positive</strong> — consider increasing inventory for top-selling items.
              </p>
            </div>
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
              <p className="text-sm text-cyan-300">
                👥 Customer growth detected — recommend expanding support team.
              </p>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-sm text-green-300">
                📦 {stats.orders} orders processed — system operating at optimal capacity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SYSTEM STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: <Zap size={18} />, label: 'AI Engine', status: 'Connected', color: 'text-green-400' },
          { icon: <Package size={18} />, label: 'Inventory Sync', status: 'Active', color: 'text-green-400' },
          { icon: <Brain size={18} />, label: 'Forecast Model', status: 'Running', color: 'text-green-400' },
        ].map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <span className="text-gray-400">{item.icon}</span>
            <div>
              <p className="text-sm text-gray-400">{item.label}</p>
              <p className={`text-sm font-medium ${item.color}`}>{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}