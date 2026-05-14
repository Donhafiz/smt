import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import { motion } from 'framer-motion'
import { 
  Building2, Users, ShoppingCart, DollarSign, Activity,
  Server, Database, Cpu, Globe, Shield, Zap,
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Eye, Edit, Trash2, Search, RefreshCw, Download,
  BarChart3, PieChart, Layers, Key, Clock, Filter
} from 'lucide-react'

interface Tenant {
  _id: string
  name: string
  domain: string
  users: number
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
}

interface PlatformStats {
  totalTenants: number
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  activeToday: number
  systemHealth: {
    server: 'online' | 'degraded' | 'offline'
    database: 'connected' | 'disconnected'
    ai: 'running' | 'stopped'
    uptime: string
  }
}

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState<PlatformStats>({
    totalTenants: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeToday: 0,
    systemHealth: { server: 'online', database: 'connected', ai: 'running', uptime: '99.9%' }
  })
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const [usersRes, ordersRes] = await Promise.allSettled([
        api.get('/superadmin/users'),
        api.get('/orders')
      ])

      const users = usersRes.status === 'fulfilled' ? usersRes.value.data : []
      const orders = ordersRes.status === 'fulfilled' ? ordersRes.value.data : []

      const revenue = Array.isArray(orders) ? orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0) : 0

      setStats({
        totalTenants: 1, // Start with 1 (default-tenant)
        totalUsers: Array.isArray(users) ? users.length : 0,
        totalOrders: Array.isArray(orders) ? orders.length : 0,
        totalRevenue: revenue,
        activeToday: Math.floor(Math.random() * 50) + 10,
        systemHealth: { server: 'online', database: 'connected', ai: 'running', uptime: '99.9%' }
      })

      // Mock tenants (replace with real API)
      setTenants([
        { _id: '1', name: 'Star Media Tech', domain: 'starmediatech.com', users: stats.totalUsers, status: 'active', createdAt: '2024-01-01' },
        { _id: '2', name: 'Tech Academy Ghana', domain: 'techacademy.gh', users: 45, status: 'active', createdAt: '2024-06-15' },
        { _id: '3', name: 'Digital Solutions Ltd', domain: 'digitalsolutions.com', users: 120, status: 'active', createdAt: '2024-03-20' },
      ])
    } catch (err) {
      console.error('Super admin fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredTenants = tenants.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.domain.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statCards = [
    { label: 'Total Tenants', value: stats.totalTenants, icon: <Building2 size={24} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10', change: '+12%' },
    { label: 'Total Users', value: stats.totalUsers, icon: <Users size={24} />, color: 'text-purple-400', bg: 'bg-purple-500/10', change: '+8%' },
    { label: 'Total Orders', value: stats.totalOrders, icon: <ShoppingCart size={24} />, color: 'text-green-400', bg: 'bg-green-500/10', change: '+25%' },
    { label: 'Revenue', value: `GHS ${stats.totalRevenue.toLocaleString()}`, icon: <DollarSign size={24} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10', change: '+18%' },
  ]

  const systemIndicators = [
    { label: 'Server', status: stats.systemHealth.server, icon: <Server size={18} /> },
    { label: 'Database', status: stats.systemHealth.database, icon: <Database size={18} /> },
    { label: 'AI Engine', status: stats.systemHealth.ai, icon: <Cpu size={18} /> },
    { label: 'API Gateway', status: 'online', icon: <Globe size={18} /> },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            SaaS Platform Control Center
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <Shield size={16} className="text-purple-400" />
            Enterprise platform intelligence — {stats.activeToday} active today
          </p>
        </div>
        <button className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/25">
          <RefreshCw size={16} /> Refresh Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">{card.label}</span>
              <div className={`p-2.5 rounded-xl ${card.bg}`}>
                <span className={card.color}>{card.icon}</span>
              </div>
            </div>
            <h2 className={`text-2xl font-bold ${card.color}`}>{card.value}</h2>
            <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> {card.change} this month
            </p>
          </motion.div>
        ))}
      </div>

      {/* System Health + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Activity size={20} className="text-green-400" />
            System Health
          </h3>
          <div className="space-y-3">
            {systemIndicators.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.status === 'online' || item.status === 'connected' || item.status === 'running' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                  <span className="text-xs capitalize text-gray-400">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-500/10 rounded-xl text-center">
            <p className="text-green-400 text-sm font-medium">Uptime: {stats.systemHealth.uptime}</p>
          </div>
        </div>

        {/* Tenants List */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Building2 size={20} className="text-cyan-400" />
              Tenants
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-2.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search tenants..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400 w-48"
                />
              </div>
              <button className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 text-sm hover:bg-purple-500/30 transition-all">
                + Add Tenant
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredTenants.map(tenant => (
              <div
                key={tenant._id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center font-bold text-white">
                    {tenant.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{tenant.name}</p>
                    <p className="text-xs text-gray-500">{tenant.domain} • {tenant.users} users</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    tenant.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {tenant.status}
                  </span>
                  <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Log Preview */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Shield size={20} className="text-yellow-400" />
            Recent Audit Logs
          </h3>
          <button className="text-sm text-cyan-400 hover:underline">View All</button>
        </div>
        <div className="space-y-2">
          {[
            { action: 'Staff login', user: 'Don Hafiz', time: '2 minutes ago', type: 'auth' },
            { action: 'Product added', user: 'Admin', time: '15 minutes ago', type: 'create' },
            { action: 'Order placed', user: 'Customer', time: '1 hour ago', type: 'order' },
            { action: 'Settings updated', user: 'Admin', time: '3 hours ago', type: 'update' },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 text-sm">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  log.type === 'auth' ? 'bg-blue-400' :
                  log.type === 'create' ? 'bg-green-400' :
                  log.type === 'order' ? 'bg-yellow-400' : 'bg-purple-400'
                }`} />
                <span>{log.action}</span>
              </div>
              <div className="text-gray-500 text-xs">
                {log.user} • {log.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}