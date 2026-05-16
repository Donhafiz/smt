import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../lib/axios'
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Check, X, Shield, Sparkles, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0) // 0-4

  const calculateStrength = (pass: string) => {
    let score = 0
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    return score
  }

  const handlePasswordChange = (value: string) => {
    setForm({ ...form, password: value })
    setPasswordStrength(calculateStrength(value))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      })
      navigate('/login', { state: { registered: true } })
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500']

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i}
            animate={{ y: ['100vh', '-10vh'], opacity: [0, 0.8, 0] }}
            transition={{ duration: 3 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 3 }}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            style={{ left: `${Math.random() * 100}%` }} />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div whileHover={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-purple-500/30 relative">
            <UserPlus size={36} className="text-white" />
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-2 rounded-3xl border-2 border-purple-400/30" />
          </motion.div>
          <h2 className="text-3xl font-black text-white">Create Account</h2>
          <p className="text-gray-400 mt-2">Join Star Media Tech today</p>
        </motion.div>

        {/* Form */}
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          onSubmit={handleRegister} className="glass rounded-3xl p-8 space-y-4">
          
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm flex items-center gap-2">
              <Shield size={16} /> {error}
            </motion.div>
          )}

          {/* Full Name */}
          <div className="relative group">
            <User size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <Mail size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
            />
          </div>

          {/* Password with strength meter */}
          <div>
            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={e => handlePasswordChange(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {form.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1,2,3,4].map(level => (
                    <div key={level} className={`h-1.5 flex-1 rounded-full ${level <= passwordStrength ? strengthColors[passwordStrength-1] : 'bg-white/10'}`} />
                  ))}
                </div>
                <p className={`text-xs ${passwordStrength > 2 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {strengthLabels[Math.min(passwordStrength, 4)]}
                  {passwordStrength < 3 && ' — Add more characters'}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative group">
            <Lock size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              required
              className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
            />
            {form.confirmPassword && (
              <span className="absolute right-4 top-3.5">
                {form.password === form.confirmPassword ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <X size={16} className="text-red-400" />
                )}
              </span>
            )}
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-purple-400 hover:underline">Terms</Link> and{' '}
            <Link to="/privacy" className="text-purple-400 hover:underline">Privacy Policy</Link>
          </p>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-2xl shadow-purple-500/25"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <UserPlus size={20} />
            )}
            {loading ? 'Creating account...' : 'Create Account'}
          </motion.button>

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:underline font-medium">Sign in</Link>
          </p>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-3 bg-[#0f172a] text-gray-500">or</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link to="/staff-login" className="py-3 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 transition-all text-center flex items-center justify-center gap-2">
              <Sparkles size={16} /> Staff Portal
            </Link>
            <Link to="/vendor-register" className="py-3 border border-orange-500/30 rounded-xl text-orange-400 text-sm font-medium hover:bg-orange-500/10 transition-all text-center flex items-center justify-center gap-2">
              <User size={16} /> Vendor Register
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  )
}