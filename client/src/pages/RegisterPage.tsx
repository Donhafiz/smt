import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../lib/axios'
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Check, X } from 'lucide-react'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
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
      await api.post('/auth/register', { name: form.name, email: form.email, password: form.password })
      navigate('/login', { state: { registered: true } })
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-purple-500/25">
            <UserPlus size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-white">Create Account</h2>
          <p className="text-gray-400 mt-2">Join Star Media Tech today</p>
        </div>

        <form onSubmit={handleRegister} className="glass rounded-3xl p-8 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">{error}</div>
          )}

          <div className="relative">
            <User size={18} className="absolute left-4 top-3.5 text-gray-500" />
            <input type="text" placeholder="Full Name" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} required
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" />
          </div>

          <div className="relative">
            <Mail size={18} className="absolute left-4 top-3.5 text-gray-500" />
            <input type="email" placeholder="Email address" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} required
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" />
          </div>

          <div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-3.5 text-gray-500" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password}
                onChange={e => setForm({...form, password: e.target.value})} required
                className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" />
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
                  passwordStrength === 'strong' ? 'text-green-400' :
                  passwordStrength === 'medium' ? 'text-yellow-400' : 'text-red-400'
                }`}>{passwordStrength}</span>
              </div>
            )}
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-3.5 text-gray-500" />
            <input type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" value={form.confirmPassword}
              onChange={e => setForm({...form, confirmPassword: e.target.value})} required
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" />
            {form.confirmPassword && (
              <span className="absolute right-4 top-3.5">
                {form.password === form.confirmPassword ? <Check size={16} className="text-green-400" /> : <X size={16} className="text-red-400" />}
              </span>
            )}
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-purple-500/20">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <UserPlus size={20} />}
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Already have an account? <Link to="/login" className="text-cyan-400 hover:underline font-medium">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}