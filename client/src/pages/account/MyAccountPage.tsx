import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../../lib/axios'
import {
  User, Package, ShoppingCart, GraduationCap, Heart,
  Settings, LogOut, Edit3, Mail, Phone, MapPin,
  Clock, CheckCircle2, ChevronRight, Award, BookOpen
} from 'lucide-react'

export default function MyAccountPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'courses' | 'profile'>('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      navigate('/login')
      return
    }
    
    setUser(JSON.parse(userData))
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [ordersRes, enrollRes] = await Promise.allSettled([
        api.get('/orders'),
        api.get('/lms/my-courses')
      ])
      
      setOrders(ordersRes.status === 'fulfilled' ? ordersRes.value.data : [])
      setEnrollments(enrollRes.status === 'fulfilled' ? enrollRes.value.data : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('staffToken')
    localStorage.removeItem('staffUser')
    navigate('/login')
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User size={16} /> },
    { id: 'orders', label: 'My Orders', icon: <Package size={16} /> },
    { id: 'courses', label: 'My Courses', icon: <GraduationCap size={16} /> },
    { id: 'profile', label: 'Profile', icon: <Settings size={16} /> },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header */}
      <div className="glass border-b border-white/5 sticky top-0 z-30 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-xl font-bold">My Account</h1>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/shop" className="px-4 py-2 bg-cyan-500/20 rounded-xl text-sm hover:bg-cyan-500/30 transition-all">
              Continue Shopping
            </Link>
            <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-6 pb-2 flex gap-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Orders', value: orders.length, icon: <Package size={22} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { label: 'Courses', value: enrollments.length, icon: <GraduationCap size={22} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                { label: 'Completed', value: enrollments.filter((e: any) => e.completedAt).length, icon: <Award size={22} />, color: 'text-green-400', bg: 'bg-green-500/10' },
                { label: 'Wishlist', value: '0', icon: <Heart size={22} />, color: 'text-pink-400', bg: 'bg-pink-500/10' },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-xs">{stat.label}</span>
                    <div className={`p-2 rounded-lg ${stat.bg}`}><span className={stat.color}>{stat.icon}</span></div>
                  </div>
                  <h2 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h2>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold mb-4">Recent Orders</h3>
              {orders.length === 0 ? (
                <p className="text-gray-500 text-sm">No orders yet. <Link to="/shop" className="text-cyan-400">Start shopping</Link></p>
              ) : (
                orders.slice(0, 3).map((order: any) => (
                  <div key={order._id} className="flex justify-between py-3 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-sm">Order #{order._id?.slice(-6)}</p>
                      <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-bold">GHS {order.total?.toLocaleString()}</p>
                      <span className="text-xs text-green-400">{order.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-bold mb-6">My Orders</h2>
            {orders.length === 0 ? (
              <div className="text-center py-20 glass rounded-2xl">
                <Package size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-500">No orders yet</p>
                <Link to="/shop" className="mt-4 inline-block px-6 py-3 bg-cyan-500 rounded-xl">Start Shopping</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order: any) => (
                  <div key={order._id} className="glass rounded-2xl p-5 flex justify-between items-center">
                    <div>
                      <p className="font-bold">Order #{order._id?.slice(-8)}</p>
                      <p className="text-sm text-gray-400">{order.items?.length || 0} items</p>
                      <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-bold text-lg">GHS {order.total?.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        order.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <div>
            <h2 className="text-xl font-bold mb-6">My Courses</h2>
            {enrollments.length === 0 ? (
              <div className="text-center py-20 glass rounded-2xl">
                <GraduationCap size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-500">No courses enrolled</p>
                <Link to="/training" className="mt-4 inline-block px-6 py-3 bg-purple-500 rounded-xl">Browse Courses</Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {enrollments.map((enrollment: any) => {
                  const course = enrollment.courseId
                  const progress = enrollment.progress?.filter((p: any) => p.completed).length || 0
                  const total = enrollment.progress?.length || 0
                  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0

                  return (
                    <div key={enrollment._id} onClick={() => navigate(`/learning/${course?._id}`)}
                      className="glass rounded-2xl p-5 cursor-pointer hover:border-cyan-400/30 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <BookOpen size={20} className="text-purple-400" />
                        <h3 className="font-bold">{course?.title || 'Course'}</h3>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                      <p className="text-xs text-gray-500">{percentage}% complete</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-6 text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-gray-400">{user?.email}</p>
              <p className="text-xs text-gray-500 mt-1">Member since {new Date().toLocaleDateString()}</p>
            </div>

            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-bold">Account Settings</h3>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <Mail size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">{user?.email}</span>
              </div>
              <button onClick={handleLogout}
                className="w-full py-3 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}