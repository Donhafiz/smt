import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import api from '../../lib/axios'
import { 
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, 
  Users, Package, GraduationCap, Wrench, Eye,
  ArrowUp, ArrowDown, Clock, Zap, Sparkles,
  Plus, ArrowRight, MoreHorizontal, CheckCircle2,
  AlertTriangle, XCircle
} from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState<any>({
    revenue: 0, orders: 0, products: 0, staff: 0,
    courses: 0, services: 0, customers: 0, revenueChange: 0
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [recentStaff, setRecentStaff] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, productsRes, staffRes, coursesRes, servicesRes] = await Promise.allSettled([
        api.get('/orders'),
        api.get('/products'),
        api.get('/staff'),
        api.get('/courses'),
        api.get('/services')
      ])

      const orders = ordersRes.status === 'fulfilled' ? ordersRes.value.data : []
      const products = productsRes.status === 'fulfilled' ? productsRes.value.data : []
      const staff = staffRes.status === 'fulfilled' ? staffRes.value.data : []
      const courses = coursesRes.status === 'fulfilled' ? coursesRes.value.data : []
      const services = servicesRes.status === 'fulfilled' ? servicesRes.value.data : []

      const revenue = Array.isArray(orders) ? orders.reduce((s, o) => s + (o.total || 0), 0) : 0

      setStats({
        revenue,
        orders: Array.isArray(orders) ? orders.length : 0,
        products: Array.isArray(products) ? products.length : 0,
        staff: Array.isArray(staff) ? staff.length : 0,
        courses: Array.isArray(courses) ? courses.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        customers: Array.isArray(orders) ? new Set(orders.map(o => o.customerEmail).filter(Boolean)).size : 0,
        revenueChange: 12.5
      })

      setRecentOrders(Array.isArray(orders) ? orders.slice(0, 5) : [])
      setRecentStaff(Array.isArray(staff) ? staff.slice(0, 5) : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { label: 'Total Revenue', value: `GHS ${stats.revenue.toLocaleString()}`, icon: <DollarSign size={22} />, color: 'from-emerald-500 to-green-600', change: `+${stats.revenueChange}%`, trend: 'up' },
    { label: 'Orders', value: stats.orders, icon: <ShoppingCart size={22} />, color: 'from-purple-500 to-pink-600', change: '+8.2%', trend: 'up' },
    { label: 'Products', value: stats.products, icon: <Package size={22} />, color: 'from-cyan-500 to-blue-600', change: '+5.0%', trend: 'up' },
    { label: 'Staff', value: stats.staff, icon: <Users size={22} />, color: 'from-orange-500 to-red-600', change: '+3.0%', trend: 'up' },
  ]

  const quickActions = [
    { label: 'Add Product', icon: <Plus size={16} />, to: '/admin/products', color: 'from-cyan-500 to-blue-600' },
    { label: 'Add Staff', icon: <Plus size={16} />, to: '/admin/staff', color: 'from-green-500 to-emerald-600' },
    { label: 'Add Course', icon: <Plus size={16} />, to: '/admin/courses', color: 'from-purple-500 to-pink-600' },
    { label: 'View Orders', icon: <Eye size={16} />, to: '/admin/orders', color: 'from-orange-500 to-red-600' },
  ]

  const statusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={14} className="text-green-400" />
      case 'pending': return <Clock size={14} className="text-yellow-400" />
      case 'cancelled': return <XCircle size={14} className="text-red-400" />
      default: return <AlertTriangle size={14} className="text-gray-400" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-2xl border-4 border-cyan-500/30 border-t-cyan-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Good evening, Admin 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            System Online
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }} className="glass rounded-2xl p-5 relative overflow-hidden group cursor-pointer">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-medium">{card.label}</span>
                <div className={`p-2 rounded-xl bg-gradient-to-br ${card.color}`}>
                  <span className="text-white">{card.icon}</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">{card.value}</h2>
              <div className="flex items-center gap-1 mt-2">
                {card.trend === 'up' ? <ArrowUp size={12} className="text-green-400" /> : <ArrowDown size={12} className="text-red-400" />}
                <span className={`text-xs ${card.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>{card.change}</span>
                <span className="text-[10px] text-gray-600 ml-1">vs last month</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action, i) => (
          <Link key={i} to={action.to}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color}`}>
              <span className="text-white">{action.icon}</span>
            </div>
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{action.label}</span>
            <ArrowRight size={14} className="ml-auto text-gray-600 group-hover:text-gray-400 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Tables Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <ShoppingCart size={16} className="text-cyan-400" /> Recent Orders
            </h3>
            <Link to="/admin/orders" className="text-xs text-cyan-400 hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs">
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-600">No orders yet</td></tr>
                ) : recentOrders.map((order) => (
                  <tr key={order._id} className="border-t border-white/5 hover:bg-white/[0.02] transition-all">
                    <td className="p-4 text-gray-300">{order.customerName || 'N/A'}</td>
                    <td className="p-4 text-white font-medium">GHS {order.total?.toLocaleString()}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-1.5 text-xs">
                        {statusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Staff */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Users size={16} className="text-green-400" /> Team Members
            </h3>
            <Link to="/admin/staff" className="text-xs text-cyan-400 hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Department</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentStaff.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-600">No staff yet</td></tr>
                ) : recentStaff.map((member) => (
                  <tr key={member._id} className="border-t border-white/5 hover:bg-white/[0.02] transition-all">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold">
                          {member.name?.charAt(0)}
                        </div>
                        <span className="text-gray-300">{member.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">{member.role}</td>
                    <td className="p-4 text-gray-500">{member.department}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        member.canLogin ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                      }`}>{member.canLogin ? 'Active' : 'Pending'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Extra Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Courses', value: stats.courses, icon: <GraduationCap size={18} />, color: 'text-purple-400' },
          { label: 'Services', value: stats.services, icon: <Wrench size={18} />, color: 'text-orange-400' },
          { label: 'Customers', value: stats.customers, icon: <Users size={18} />, color: 'text-pink-400' },
          { label: 'Live Visitors', value: Math.floor(Math.random() * 20) + 5, icon: <Zap size={18} />, color: 'text-cyan-400' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ y: -2 }} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>{item.icon}</div>
              <div>
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}