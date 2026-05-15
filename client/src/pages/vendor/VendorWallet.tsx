import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/axios'
import { 
  Wallet, DollarSign, TrendingUp, TrendingDown, ArrowUp,
  ArrowDown, Clock, CheckCircle2, XCircle, AlertCircle,
  Building2, CreditCard, Landmark, Send, Download,
  History, ArrowLeft, Shield, Star, Zap, RefreshCw,
  Phone, MapPin, Copy, ExternalLink
} from 'lucide-react'

interface Transaction {
  _id: string
  amount: number
  type: 'credit' | 'debit'
  status: 'completed' | 'pending' | 'failed'
  description: string
  createdAt: string
  reference: string
}

interface WalletData {
  balance: number
  totalEarnings: number
  totalWithdrawn: number
  pendingWithdrawals: number
  transactions: Transaction[]
}

export default function VendorWallet() {
  const navigate = useNavigate()
  const vendor = JSON.parse(localStorage.getItem('vendorUser') || localStorage.getItem('vendor') || '{}')
  
  const [wallet, setWallet] = useState<WalletData>({
    balance: 0, totalEarnings: 0, totalWithdrawn: 0,
    pendingWithdrawals: 0, transactions: []
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'withdraw' | 'history'>('overview')
  
  // Withdrawal Form
  const [showWithdrawForm, setShowWithdrawForm] = useState(false)
  const [amount, setAmount] = useState('')
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [withdrawing, setWithdrawing] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchWallet()
  }, [])

  const fetchWallet = async () => {
    try {
      const token = localStorage.getItem('vendorToken')
      const res = await api.get(`/wallet/${vendor._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setWallet(res.data)
    } catch (err) {
      console.log('Wallet fetch error:', err)
      // Set mock data for demo
      setWallet({
        balance: 12500.00,
        totalEarnings: 45000.00,
        totalWithdrawn: 32500.00,
        pendingWithdrawals: 2500.00,
        transactions: [
          { _id: '1', amount: 5000, type: 'credit', status: 'completed', description: 'Order #SMT-001 Payment', createdAt: '2026-05-15T10:30:00Z', reference: 'TXN-001' },
          { _id: '2', amount: 3000, type: 'debit', status: 'completed', description: 'Withdrawal to Bank', createdAt: '2026-05-14T15:20:00Z', reference: 'WTH-001' },
          { _id: '3', amount: 7500, type: 'credit', status: 'completed', description: 'Order #SMT-002 Payment', createdAt: '2026-05-13T09:15:00Z', reference: 'TXN-002' },
          { _id: '4', amount: 2500, type: 'debit', status: 'pending', description: 'Withdrawal Request', createdAt: '2026-05-12T14:00:00Z', reference: 'WTH-002' },
          { _id: '5', amount: 1200, type: 'credit', status: 'completed', description: 'Order #SMT-003 Payment', createdAt: '2026-05-11T11:45:00Z', reference: 'TXN-003' },
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      setMessage('Please enter a valid amount')
      return
    }
    if (!bankName || !accountNumber || !accountName) {
      setMessage('Please fill all bank details')
      return
    }

    setWithdrawing(true)
    setMessage('')
    
    try {
      const token = localStorage.getItem('vendorToken')
      await api.post('/wallet/withdraw', {
        vendorId: vendor._id,
        amount: Number(amount),
        bankName,
        accountNumber,
        accountName
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setMessage('✅ Withdrawal request submitted successfully!')
      setShowWithdrawForm(false)
      setAmount('')
      setBankName('')
      setAccountNumber('')
      setAccountName('')
      fetchWallet()
      
      setTimeout(() => setMessage(''), 4000)
    } catch (err: any) {
      setMessage('❌ ' + (err?.response?.data?.message || 'Withdrawal failed'))
    } finally {
      setWithdrawing(false)
    }
  }

  const stats = [
    { label: 'Available Balance', value: `GHS ${(wallet.balance || 0).toLocaleString()}`, icon: <Wallet size={24} />, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Total Earnings', value: `GHS ${(wallet.totalEarnings || 0).toLocaleString()}`, icon: <TrendingUp size={24} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Total Withdrawn', value: `GHS ${(wallet.totalWithdrawn || 0).toLocaleString()}`, icon: <ArrowDown size={24} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Pending', value: `GHS ${(wallet.pendingWithdrawals || 0).toLocaleString()}`, icon: <Clock size={24} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl border-4 border-green-500/30 border-t-green-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header */}
      <div className="glass border-b border-white/10 sticky top-0 z-30 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/vendor-dashboard')} className="p-2 rounded-xl hover:bg-white/10 transition-all">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Wallet size={22} className="text-green-400" /> Vendor Wallet
              </h1>
              <p className="text-sm text-gray-400">Manage your earnings & withdrawals</p>
            </div>
          </div>
          <button onClick={fetchWallet} className="p-2 rounded-xl hover:bg-white/10 transition-all">
            <RefreshCw size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-6 pb-2 flex gap-1">
          {[
            { id: 'overview', label: 'Overview', icon: <Wallet size={16} /> },
            { id: 'withdraw', label: 'Withdraw', icon: <Send size={16} /> },
            { id: 'history', label: 'History', icon: <History size={16} /> },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Message */}
        {message && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl text-sm flex items-center gap-2 ${
              message.includes('✅') ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
              message.includes('❌') ? 'bg-red-500/10 border border-red-500/20 text-red-400' :
              'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
            }`}>
            {message.includes('✅') ? <CheckCircle2 size={16} /> : 
             message.includes('❌') ? <XCircle size={16} /> : <AlertCircle size={16} />}
            {message}
          </motion.div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            {/* Balance Hero */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-white/10 p-8 text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <p className="text-gray-400 text-sm mb-2">Available Balance</p>
                <h1 className="text-5xl md:text-6xl font-black text-green-400">
                  GHS {(wallet.balance || 0).toLocaleString()}
                </h1>
                <button onClick={() => setActiveTab('withdraw')}
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold hover:scale-105 transition-all inline-flex items-center gap-2 shadow-xl shadow-green-500/20">
                  <Send size={18} /> Withdraw Funds
                </button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5 hover:border-white/10 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    <div className={`p-2 rounded-lg ${stat.bg}`}><span className={stat.color}>{stat.icon}</span></div>
                  </div>
                  <h2 className={`text-xl font-bold ${stat.color}`}>{stat.value}</h2>
                </motion.div>
              ))}
            </div>

            {/* Recent Transactions */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <History size={20} className="text-green-400" /> Recent Transactions
                </h3>
                <button onClick={() => setActiveTab('history')} className="text-sm text-green-400 hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {(wallet.transactions || []).slice(0, 5).map(tx => (
                  <div key={tx._id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        tx.type === 'credit' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {tx.type === 'credit' ? <ArrowDown size={18} /> : <ArrowUp size={18} />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{tx.description}</p>
                        <p className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleDateString()} • {tx.reference}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.type === 'credit' ? '+' : '-'} GHS {tx.amount?.toLocaleString()}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        tx.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                      }`}>{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* WITHDRAW TAB */}
        {activeTab === 'withdraw' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-6">
            <div className="glass rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Send size={24} className="text-green-400" /> Request Withdrawal
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Amount (GHS)</label>
                  <div className="relative">
                    <DollarSign size={18} className="absolute left-4 top-3.5 text-gray-500" />
                    <input type="number" placeholder="0.00" value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-all" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Available: GHS {(wallet.balance || 0).toLocaleString()}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Bank Name</label>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-4 top-3.5 text-gray-500" />
                    <input placeholder="e.g., GC Bank, Ecobank" value={bankName}
                      onChange={e => setBankName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Account Number</label>
                  <div className="relative">
                    <CreditCard size={18} className="absolute left-4 top-3.5 text-gray-500" />
                    <input placeholder="Enter account number" value={accountNumber}
                      onChange={e => setAccountNumber(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Account Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-3.5 text-gray-500" />
                    <input placeholder="Name on bank account" value={accountName}
                      onChange={e => setAccountName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-all" />
                  </div>
                </div>

                <button onClick={handleWithdraw} disabled={withdrawing}
                  className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-green-500/20">
                  {withdrawing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={20} />}
                  {withdrawing ? 'Processing...' : 'Submit Withdrawal'}
                </button>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 text-center text-sm text-gray-500 space-y-2">
              <div className="flex items-center justify-center gap-2"><Shield size={14} className="text-green-400" /> Secure transactions</div>
              <div className="flex items-center justify-center gap-2"><Clock size={14} className="text-green-400" /> Processing time: 24-48 hours</div>
            </div>
          </motion.div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-lg font-bold">Transaction History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-gray-400">
                    <th className="p-4">Type</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {(wallet.transactions || []).map(tx => (
                    <tr key={tx._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tx.type === 'credit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>{tx.type}</span>
                      </td>
                      <td className="p-4">{tx.description}</td>
                      <td className={`p-4 font-bold ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.type === 'credit' ? '+' : '-'} GHS {tx.amount?.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tx.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                        }`}>{tx.status}</span>
                      </td>
                      <td className="p-4 text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-gray-500 text-xs">{tx.reference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Need User icon for account name field
function User({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
}