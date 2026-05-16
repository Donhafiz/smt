import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../lib/axios'
import { motion } from 'framer-motion'
import { 
  Eye, EyeOff, Mail, Lock, User, Store, 
  UserPlus, Phone, MapPin, Building2, Check, X,
  Shield, Package, Truck, BadgeCheck
} from 'lucide-react'

export default function VendorRegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', storeName: '',
    password: '', confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const passwordStrength = form.password.length >= 8 ? 'strong' : form.password.length >= 6 ? 'medium' : 'weak'

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.post('/vendor/register', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        storeName: form.storeName,
        password: form.password
      })
      navigate('/vendor-login', { state: { registered: true } })
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md relative z-10">
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
          <h2 className="text-3xl font-black text-white">Become a Vendor</h2>
          <p className="text-gray-400 mt-2">Start selling on SMT Marketplace</p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleRegister}
          className="glass rounded-3xl p-8 space-y-4"
        >
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">{error}</div>
          )}

          <div className="relative group">
            <User size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
            <input type="text" placeholder="Full Name" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} required
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-all" />
          </div>

          <div className="relative group">
            <Store size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
            <input type="text" placeholder="Store Name" value={form.storeName}
              onChange={e => setForm({...form, storeName: e.target.value})} required
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-all" />
          </div>

          <div className="relative group">
            <Mail size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
            <input type="email" placeholder="Email Address" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} required
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-all" />
          </div>

          <div className="relative group">
            <Phone size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
            <input type="tel" placeholder="Phone Number" value={form.phone}
              onChange={e => setForm({...form, phone: e.target.value})} required
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-all" />
          </div>

          <div>
            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password}
                onChange={e => setForm({...form, password: e.target.value})} required
                className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-all" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-500 hover:text-white">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {form.password && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${
                    passwordStrength === 'strong' ? 'w-full bg-green-400' :
                    passwordStrength === 'medium' ? 'w-2/3 bg-yellow-400' : 'w-1/3 bg-red-400'
                  }`} />
                </div>
                <span className={`text-xs ${
                  passwordStrength === 'strong' ? 'text-green-400' : passwordStrength === 'medium' ? 'text-yellow-400' : 'text-red-400'
                }`}>{passwordStrength}</span>
              </div>
            )}
          </div>

          <div className="relative group">
            <Lock size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
            <input type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" value={form.confirmPassword}
              onChange={e => setForm({...form, confirmPassword: e.target.value})} required
              className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-all" />
            {form.confirmPassword && (
              <span className="absolute right-4 top-3.5">
                {form.password === form.confirmPassword ? <Check size={16} className="text-green-400" /> : <X size={16} className="text-red-400" />}
              </span>
            )}
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <UserPlus size={20} />}
            {loading ? 'Creating account...' : 'Register as Vendor'}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Already a vendor? <Link to="/vendor-login" className="text-orange-400 hover:underline font-medium">Sign in</Link>
          </p>
        </motion.form>
      </div>
    </div>
  )
}
