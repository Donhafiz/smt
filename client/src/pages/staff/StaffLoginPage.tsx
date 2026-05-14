import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/axios'
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle, CreditCard } from 'lucide-react'

export default function StaffLoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ staffId: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await api.post('/staff-portal/login', {
        staffId: form.staffId || undefined,
        email: form.email || undefined,
        password: form.password
      })
      
      localStorage.setItem('staffToken', res.data.token)
      localStorage.setItem('staffUser', JSON.stringify(res.data.staff))
      navigate('/staff-portal/dashboard')
      
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <form onSubmit={handleLogin} className="w-full max-w-md glass p-8 rounded-3xl space-y-5">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
            <CreditCard size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold">Staff Portal</h2>
          <p className="text-gray-400 text-sm mt-1">Login with your staff credentials</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="relative">
          <CreditCard size={18} className="absolute left-3 top-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Staff ID (e.g., SMT-250001)"
            value={form.staffId}
            onChange={e => setForm({ ...form, staffId: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="relative">
          <Mail size={18} className="absolute left-3 top-3.5 text-gray-500" />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-500">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <LogIn size={18} />
          )}
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        
        <p className="text-center text-sm text-gray-500">
          Need help? Contact admin at{' '}
          <a href="mailto:starmedia568@gmail.com" className="text-cyan-400">starmedia568@gmail.com</a>
        </p>
      </form>
    </div>
  )
}