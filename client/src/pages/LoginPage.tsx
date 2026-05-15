import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../lib/axios'
import { Eye, EyeOff, Mail, Lock, LogIn, Sparkles, Fingerprint } from 'lucide-react'

export default function LoginPage() {
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
      const res = await api.post('/auth/login', form)
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
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-cyan-500/25">
            <Fingerprint size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="glass rounded-3xl p-8 space-y-5">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">{error}</div>
          )}

          <div className="relative">
            <Mail size={18} className="absolute left-4 top-3.5 text-gray-500" />
            <input type="email" placeholder="Email address" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} required
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-3.5 text-gray-500" />
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password}
              onChange={e => setForm({...form, password: e.target.value})} required
              className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-500 hover:text-white">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" checked={form.rememberMe} onChange={e => setForm({...form, rememberMe: e.target.checked})}
                className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500" />
              Remember me
            </label>
            <a href="#" className="text-cyan-400 hover:underline">Forgot password?</a>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <LogIn size={20} />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account? <Link to="/register" className="text-cyan-400 hover:underline font-medium">Create one</Link>
          </p>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-2 bg-[#0f172a] text-gray-500">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link to="/staff-login" className="py-3 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 transition-all text-center flex items-center justify-center gap-2">
              <Sparkles size={16} /> Staff Portal
            </Link>
            <Link to="/vendor-login" className="py-3 border border-purple-500/30 rounded-xl text-purple-400 text-sm font-medium hover:bg-purple-500/10 transition-all text-center">
              Vendor Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}