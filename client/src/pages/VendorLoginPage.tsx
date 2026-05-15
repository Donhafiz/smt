import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../lib/axios'
import { 
  Eye, EyeOff, Mail, Lock, LogIn, Store, 
  Sparkles, Shield, Truck, Package, ArrowRight,
  Building2, BadgeCheck
} from 'lucide-react'

export default function VendorLoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  
  try {
    const res = await api.post('/vendor/login', { 
      email: form.email, 
      password: form.password 
    })
    
    localStorage.setItem('vendorToken', res.data.token)
    localStorage.setItem('vendorUser', JSON.stringify(res.data.vendor))
    
    // Redirect to vendor dashboard
    navigate('/vendor-dashboard')
    
  } catch (err: any) {
    setError(err?.response?.data?.message || 'Invalid vendor credentials')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-orange-500/25 relative"
          >
            <Store size={36} className="text-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-400 border-2 border-[#020617] flex items-center justify-center">
              <BadgeCheck size={12} className="text-white" />
            </div>
          </motion.div>
          
          <h2 className="text-3xl font-black text-white">Vendor Portal</h2>
          <p className="text-gray-400 mt-2">Sign in to manage your store</p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleLogin}
          className="glass rounded-3xl p-8 space-y-5"
        >
          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm flex items-center gap-2"
            >
              <Shield size={16} /> {error}
            </motion.div>
          )}

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Email Address</label>
            <div className="relative group">
              <Mail size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
              <input
                type="email"
                placeholder="vendor@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Password</label>
            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={form.rememberMe}
                onChange={e => setForm({ ...form, rememberMe: e.target.checked })}
                className="rounded border-gray-600 text-orange-500 focus:ring-orange-500"
              />
              Remember me
            </label>
            <a href="#" className="text-orange-400 hover:underline">Forgot password?</a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <LogIn size={20} />
            )}
            {loading ? 'Signing in...' : 'Sign In to Vendor Portal'}
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-500 text-sm">
            Don't have a vendor account?{' '}
            <Link to="/vendor-register" className="text-orange-400 hover:underline font-medium">
              Register as Vendor
            </Link>
          </p>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[#0f172a] text-gray-500">vendor benefits</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/5">
              <Package size={18} className="mx-auto mb-1 text-orange-400" />
              <p className="text-[10px] text-gray-500">Sell Products</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <Truck size={18} className="mx-auto mb-1 text-orange-400" />
              <p className="text-[10px] text-gray-500">Fast Delivery</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <Shield size={18} className="mx-auto mb-1 text-orange-400" />
              <p className="text-[10px] text-gray-500">Secure Payments</p>
            </div>
          </div>
        </motion.form>

        {/* Bottom Links */}
        <div className="mt-6 text-center space-y-2">
          <Link to="/staff-login" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors block">
            Staff Portal Login
          </Link>
          <Link to="/login" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors block">
            Customer Login
          </Link>
        </div>
      </div>
    </div>
  )
}

// Missing motion import fix
import { motion } from 'framer-motion'