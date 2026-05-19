import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../lib/axios'
import {
  Users, Search, Edit2, Trash2, Shield, Ban, CheckCircle2,
  X, Save, AlertCircle, User, Mail, Calendar, Eye,
  UserCheck, UserX, ShieldAlert, Activity
} from 'lucide-react'

interface User {
  _id: string
  name: string
  email: string
  role: string
  isActive: boolean
  createdAt: string
  lastLogin: string
}

export default function SuperAdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [editForm, setEditForm] = useState({ name: '', email: '', role: 'user' })
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'banned'>('all')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        api.get('/superadmin/users'),
        api.get('/superadmin/stats')
      ])
      setUsers(usersRes.data)
      setStats(statsRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleBan = async (id: string) => {
    if (!confirm('Ban this user? They will not be able to login.')) return
    try {
      await api.put(`/superadmin/users/${id}/ban`)
      setMessage('✅ User banned')
      fetchData()
      setTimeout(() => setMessage(''), 3000)
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed')
    }
  }

  const handleActivate = async (id: string) => {
    try {
      await api.put(`/superadmin/users/${id}/activate`)
      setMessage('✅ User activated')
      fetchData()
      setTimeout(() => setMessage(''), 3000)
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this user? This cannot be undone.')) return
    try {
      await api.delete(`/superadmin/users/${id}`)
      setMessage('✅ User deleted')
      fetchData()
      setTimeout(() => setMessage(''), 3000)
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed')
    }
  }

  const handleEdit = (user: User) => {
    setEditUser(user)
    setEditForm({ name: user.name, email: user.email, role: user.role })
  }

  const handleSaveEdit = async () => {
    if (!editUser) return
    try {
      await api.put(`/superadmin/users/${editUser._id}`, editForm)
      setMessage('✅ User updated')
      setEditUser(null)
      fetchData()
      setTimeout(() => setMessage(''), 3000)
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed')
    }
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    const matchesTab = activeTab === 'all' ? true :
      activeTab === 'active' ? u.isActive : !u.isActive
    return matchesSearch && matchesTab
  })

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers || 0, icon: <Users size={22} />, color: 'text-cyan-400' },
    { label: 'Active', value: stats.activeUsers || 0, icon: <UserCheck size={22} />, color: 'text-green-400' },
    { label: 'Banned', value: stats.bannedUsers || 0, icon: <UserX size={22} />, color: 'text-red-400' },
    { label: 'Staff', value: stats.totalStaff || 0, icon: <Shield size={22} />, color: 'text-purple-400' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Super Admin — User Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">Full control over all platform users</p>
        </div>
        <ShieldAlert size={32} className="text-purple-400" />
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm ${message.includes('✅') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs">{card.label}</span>
              <span className={card.color}>{card.icon}</span>
            </div>
            <h2 className={`text-2xl font-bold ${card.color}`}>{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="glass rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-3.5 text-gray-500" />
          <input type="text" placeholder="Search users by name or email..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-400" />
        </div>
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All' },
            { id: 'active', label: 'Active' },
            { id: 'banned', label: 'Banned' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-white'
              }`}>{tab.label}</button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-gray-400">
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-sm font-bold">
                        {user.name?.charAt(0) || '?'}
                      </div>
                      <span className="text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{user.email}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.role === 'admin' || user.role === 'superadmin'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-cyan-500/20 text-cyan-400'
                    }`}>{user.role}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>{user.isActive ? 'Active' : 'Banned'}</span>
                  </td>
                  <td className="p-4 text-gray-500 text-xs">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(user)} className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30" title="Edit">
                        <Edit2 size={14} />
                      </button>
                      {user.isActive ? (
                        <button onClick={() => handleBan(user._id)} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30" title="Ban">
                          <Ban size={14} />
                        </button>
                      ) : (
                        <button onClick={() => handleActivate(user._id)} className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30" title="Activate">
                          <CheckCircle2 size={14} />
                        </button>
                      )}
                      <button onClick={() => handleDelete(user._id)} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      <AnimatePresence>
        {editUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditUser(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Edit User</h2>
                <button onClick={() => setEditUser(null)} className="p-2 rounded-lg hover:bg-white/10"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Name</label>
                  <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Email</label>
                  <input value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Role</label>
                  <select value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                    <option value="vendor">Vendor</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
                <button onClick={handleSaveEdit}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold">
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}