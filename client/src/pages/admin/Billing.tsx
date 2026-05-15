import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import { motion } from 'framer-motion'
import { 
  CreditCard, Check, Zap, Crown, Star, ArrowRight,
  Plus, Edit2, Trash2, X, Save, History, TrendingUp,
  Download, RefreshCw, AlertCircle, Building2
} from 'lucide-react'

interface Plan {
  name: string
  price: number
  features: string[]
}

interface Subscription {
  _id: string
  tenantId: string
  plan: string
  status: string
  price: number
  billingCycle: string
  startDate: string
  endDate: string
  paymentHistory: any[]
  planDetails: Plan
}

export default function Billing() {
  const [plans, setPlans] = useState<Record<string, Plan>>({})
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [allSubscriptions, setAllSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'plans' | 'manage' | 'history'>('plans')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editSub, setEditSub] = useState<Subscription | null>(null)
  const [editForm, setEditForm] = useState({ plan: 'free', status: 'active', billingCycle: 'monthly' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [plansRes, subRes, allRes] = await Promise.all([
        api.get('/billing/plans'),
        api.get('/billing/subscription'),
        api.get('/billing/admin/all')
      ])
      setPlans(plansRes.data)
      setSubscription(subRes.data)
      setAllSubscriptions(allRes.data)
    } catch (err) {
      console.error('Billing fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (plan: string) => {
    try {
      setMessage('')
      const res = await api.post('/billing/upgrade', { plan, billingCycle: 'monthly' })
      setSubscription(res.data)
      setMessage(`✅ Successfully upgraded to ${plan.toUpperCase()}!`)
      setTimeout(() => setMessage(''), 4000)
      fetchData()
    } catch (err: any) {
      setMessage('❌ ' + (err?.response?.data?.message || 'Upgrade failed'))
    }
  }

  const handleCancel = async () => {
    if (!confirm('Cancel your subscription?')) return
    try {
      await api.post('/billing/cancel')
      fetchData()
      setMessage('Subscription cancelled')
    } catch (err: any) {
      setMessage('❌ ' + err?.response?.data?.message)
    }
  }

  const handleEdit = (sub: Subscription) => {
    setEditSub(sub)
    setEditForm({ plan: sub.plan, status: sub.status, billingCycle: sub.billingCycle })
    setShowEditModal(true)
  }

  const handleSaveEdit = async () => {
    if (!editSub) return
    try {
      await api.put(`/billing/admin/${editSub._id}`, editForm)
      setShowEditModal(false)
      fetchData()
      setMessage('✅ Subscription updated!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err: any) {
      setMessage('❌ ' + err?.response?.data?.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this subscription?')) return
    try {
      await api.delete(`/billing/admin/${id}`)
      fetchData()
    } catch (err: any) {
      alert(err?.response?.data?.message)
    }
  }

  const planIcons: Record<string, any> = {
    free: <Star size={28} />,
    starter: <Zap size={28} />,
    pro: <Crown size={28} />,
    enterprise: <Building2 size={28} />
  }

  const planGradients: Record<string, string> = {
    free: 'from-gray-500 to-gray-600',
    starter: 'from-cyan-500 to-blue-600',
    pro: 'from-purple-500 to-pink-600',
    enterprise: 'from-yellow-500 to-orange-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            SaaS Billing
          </h1>
          <p className="text-gray-400 mt-1">Manage subscriptions & plans</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('plans')} className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'plans' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
            Plans
          </button>
          <button onClick={() => setActiveTab('manage')} className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'manage' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
            Manage All
          </button>
          <button onClick={() => setActiveTab('history')} className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'history' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
            History
          </button>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm ${message.includes('✅') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {message}
        </div>
      )}

      {/* Current Plan */}
      {subscription && activeTab === 'plans' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Current Plan</p>
              <h2 className="text-2xl font-bold">{subscription.planDetails?.name} - GHS {subscription.price}/mo</h2>
              <p className="text-xs text-gray-500 mt-1">Status: {subscription.status} | Renews: {new Date(subscription.endDate).toLocaleDateString()}</p>
            </div>
            <button onClick={handleCancel} className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg text-sm hover:bg-red-500/10">
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Plans Grid */}
      {activeTab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(plans).map(([key, plan]: [string, any]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`glass rounded-2xl p-6 relative overflow-hidden ${
                subscription?.plan === key ? 'border-cyan-400/50 shadow-lg shadow-cyan-500/10' : 'border-white/10'
              }`}
            >
              {subscription?.plan === key && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-cyan-500/20 rounded-full text-xs text-cyan-400">
                  Current
                </div>
              )}

              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${planGradients[key]} mb-4`}>
                {planIcons[key]}
              </div>
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-3xl font-black mt-2">GHS {plan.price}<span className="text-sm text-gray-400">/mo</span></p>

              <ul className="mt-4 space-y-2">
                {plan.features.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <Check size={14} className="text-green-400" /> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(key)}
                disabled={subscription?.plan === key}
                className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all ${
                  subscription?.plan === key
                    ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                    : `bg-gradient-to-r ${planGradients[key]} hover:scale-105`
                }`}
              >
                {subscription?.plan === key ? 'Current Plan' : 'Upgrade'}
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Manage All Subscriptions */}
      {activeTab === 'manage' && (
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">All Subscriptions ({allSubscriptions.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-gray-400">
                  <th className="pb-3">Tenant</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">End Date</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allSubscriptions.map(sub => (
                  <tr key={sub._id} className="border-b border-white/5">
                    <td className="py-3">{sub.tenantId}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        sub.plan === 'pro' ? 'bg-purple-500/20 text-purple-400' :
                        sub.plan === 'enterprise' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-cyan-500/20 text-cyan-400'
                      }`}>{sub.plan}</span>
                    </td>
                    <td className="py-3 capitalize">{sub.status}</td>
                    <td className="py-3">GHS {sub.price}</td>
                    <td className="py-3">{new Date(sub.endDate).toLocaleDateString()}</td>
                    <td className="py-3 flex gap-2">
                      <button onClick={() => handleEdit(sub)} className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(sub._id)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment History */}
      {activeTab === 'history' && (
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Payment History</h3>
          {subscription?.paymentHistory?.length > 0 ? (
            <div className="space-y-3">
              {subscription.paymentHistory.map((payment: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div>
                    <p className="font-medium">GHS {payment.amount}</p>
                    <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleString()}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">{payment.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No payment history</p>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Edit Subscription</h2>
              <button onClick={() => setShowEditModal(false)} className="p-2 rounded-lg hover:bg-white/10"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Plan</label>
                <select value={editForm.plan} onChange={e => setEditForm({ ...editForm, plan: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white mt-1">
                  {Object.keys(plans).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400">Status</label>
                <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white mt-1">
                  <option value="active">Active</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="expired">Expired</option>
                  <option value="trial">Trial</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400">Billing Cycle</label>
                <select value={editForm.billingCycle} onChange={e => setEditForm({ ...editForm, billingCycle: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white mt-1">
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <button onClick={handleSaveEdit} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}