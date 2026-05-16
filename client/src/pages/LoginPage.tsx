import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../lib/axios'
import { Eye, EyeOff, Mail, Lock, LogIn, Sparkles, Fingerprint, Shield, ArrowRight, User, Smartphone } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/login', { email: form.email, password: form.password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      const role = res.data.user.role
      setTimeout(() => {
        if (['admin', 'superadmin', 'director'].includes(role)) navigate('/admin')
        else if (role === 'vendor') navigate('/vendor-dashboard')
        else if (role === 'driver') navigate('/driver-dashboard')
        else navigate('/')
      }, 100)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i}
            animate={{ y: ['100vh', '-10vh'], opacity: [0, 0.8, 0] }}
            transition={{ duration: 3 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 3 }}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{ left: `${Math.random() * 100}%` }} />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div whileHover={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-cyan-500/30 relative">
            <Fingerprint size={36} className="text-white" />
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-2 rounded-3xl border-2 border-cyan-400/30" />
          </motion.div>
          <h2 className="text-3xl font-black text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </motion.div>

        {/* Form */}
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          onSubmit={handleLogin} className="glass rounded-3xl p-8 space-y-5">
          
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm flex items-center gap-2">
              <Shield size={16} /> {error}
            </motion.div>
          )}

          {/* Login Method Toggle */}
          <div className="flex bg-white/5 rounded-xl p-1">
            <button type="button" onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${loginMethod === 'email' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white'}`}>
              <Mail size={14} /> Email
            </button>
            <button type="button" onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${loginMethod === 'phone' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white'}`}>
              <Smartphone size={14} /> Phone
            </button>
          </div>

          <div className="relative group">
            {loginMethod === 'email' ? <Mail size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" /> :
              <Smartphone size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />}
            <input type={loginMethod === 'email' ? 'email' : 'tel'} placeholder={loginMethod === 'email' ? 'Email address' : 'Phone number'}
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" />
          </div>

          <div className="relative group">
            <Lock size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password}
              onChange={e => setForm({...form, password: e.target.value})} required
              className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-500 hover:text-white transition-colors">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" checked={form.rememberMe} onChange={e => setForm({...form, rememberMe: e.target.checked})}
                className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500" /> Remember me
            </label>
            <a href="#" className="text-cyan-400 hover:underline text-sm">Forgot password?</a>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-2xl shadow-cyan-500/25">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <LogIn size={20} />}
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account? <Link to="/register" className="text-cyan-400 hover:underline font-medium">Create one</Link>
          </p>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-3 bg-[#0f172a] text-gray-500">or</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link to="/staff-login" className="py-3 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 transition-all text-center flex items-center justify-center gap-2 group">
              <Sparkles size={16} className="group-hover:scale-110 transition-transform" /> Staff Portal
            </Link>
            <Link to="/vendor-login" className="py-3 border border-orange-500/30 rounded-xl text-orange-400 text-sm font-medium hover:bg-orange-500/10 transition-all text-center flex items-center justify-center gap-2 group">
              <User size={16} className="group-hover:scale-110 transition-transform" /> Vendor Login
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  )
}