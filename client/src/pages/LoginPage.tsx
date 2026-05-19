import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../lib/axios'
import {
  Eye, EyeOff, Mail, Lock, LogIn, Shield, Fingerprint,
  Smartphone, Sparkles, User, CheckCircle2, AlertCircle,
  ArrowLeft, ArrowRight
} from 'lucide-react'

// ── Font + style injection ─────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800;12..96,900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');`

// ── Stable particles (computed once) ──────────────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 5.7 + 2) % 100}%`,
  duration: 5 + (i * 1.3) % 5,
  delay: (i * 0.55) % 4,
  size: i % 3 === 0 ? 1.5 : 1,
  color: i % 3 === 0
    ? 'rgba(6,182,212,0.6)'
    : i % 3 === 1
    ? 'rgba(167,139,250,0.5)'
    : 'rgba(59,130,246,0.4)',
}))

// ── Background ──────────────────────────────────────────────────────────────
function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="lgrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lgrid)" />
      </svg>
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, delay: 4.5 }}
        className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
    </div>
  )
}

// ── Floating input field ───────────────────────────────────────────────────
function FloatingInput({
  label, icon: Icon, trailingIcon, onTrailingClick, accent = '#06b6d4', ...props
}: {
  label: string; icon: any; trailingIcon?: React.ReactNode
  onTrailingClick?: () => void; accent?: string; [k: string]: any
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = !!props.value
  return (
    <div className="relative group">
      <label className="absolute left-11 transition-all duration-200 pointer-events-none"
        style={{
          top: focused || hasValue ? '-0.5rem' : '0.9rem',
          fontSize: focused || hasValue ? '0.65rem' : '0.875rem',
          color: focused ? accent : '#475569',
          background: focused || hasValue ? '#0d1526' : 'transparent',
          padding: focused || hasValue ? '0 4px' : '0',
          zIndex: 1,
        }}>
        {label}
      </label>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
        style={{ color: focused ? accent : '#334155' }}>
        <Icon size={17} />
      </div>
      <input
        {...props}
        onFocus={e => { setFocused(true); props.onFocus?.(e) }}
        onBlur={e => { setFocused(false); props.onBlur?.(e) }}
        className="w-full pl-11 pr-12 py-4 rounded-xl text-sm text-white outline-none transition-all duration-200 bg-transparent"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1.5px solid ${focused ? accent : 'rgba(255,255,255,0.08)'}`,
          boxShadow: focused ? `0 0 0 3px ${accent}12` : 'none',
        }}
      />
      {trailingIcon && (
        <button type="button" onClick={onTrailingClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
          {trailingIcon}
        </button>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════
export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [step, setStep] = useState<'form' | 'success'>('form')

  const justRegistered = (location.state as any)?.registered

  // ✅ FIXED: Smart redirect based on role
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/login', { email: form.email, password: form.password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setStep('success')
      
      const role = res.data.user.role
      
      setTimeout(() => {
        if (['admin', 'superadmin', 'director'].includes(role)) {
          navigate('/admin')
        } else if (role === 'vendor') {
          navigate('/vendor-dashboard')
        } else if (role === 'driver') {
          navigate('/driver-dashboard')
        } else if (role === 'staff') {
          navigate('/staff-portal')
        } else {
          // ✅ Regular users go to their account page
          navigate('/my-account')
        }
      }, 1300)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: '#020617' }}>
      <style>{`
        ${FONTS}
        .font-body { font-family: 'DM Sans', sans-serif; }
        .method-tab { transition: all 0.25s; border: 1px solid transparent; cursor: pointer; }
        .method-tab.active { background: rgba(6,182,212,0.1); border-color: rgba(6,182,212,0.3); color: #06b6d4; }
        .method-tab:not(.active) { background: rgba(255,255,255,0.03); color: #475569; }
        .method-tab:not(.active):hover { color: #94a3b8; }
      `}</style>

      {/* ── LEFT PANEL ──────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col items-center justify-center p-16"
        style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(59,130,246,0.04) 50%, rgba(167,139,250,0.06) 100%)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <Background />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map((p, i) => (
            <motion.div key={i}
              animate={{ y: ['100vh', '-5vh'], opacity: [0, 0.8, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
              className="absolute rounded-full"
              style={{ left: p.left, width: p.size * 4, height: p.size * 4, background: p.color }} />
          ))}
        </div>

        <div className="relative z-10 max-w-xs text-center">
          <Link to="/" className="inline-flex flex-col items-center gap-3 mb-12">
            <div className="w-16 h-16 rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(6,182,212,0.3)', boxShadow: '0 0 40px rgba(6,182,212,0.2)' }}>
              <img src="/smt-logo.png" alt="SMT" className="w-full h-full object-contain p-0.5" />
            </div>
            <p className="font-black text-white text-xl leading-none">
              STAR <span style={{ color: '#06b6d4' }}>MEDIA</span> TECH
            </p>
          </Link>

          <h2 className="font-black text-white leading-tight mb-4 text-3xl">
            Welcome<br />
            <span style={{ background: 'linear-gradient(135deg, #06b6d4, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Back
            </span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-10">
            Access your account, track orders, manage courses, and shop premium tech products.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-5 sm:px-8 relative">
        <Background />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="absolute top-6 left-6 z-10">
          <Link to="/" className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors">
            <ArrowLeft size={12} /> Home
          </Link>
        </motion.div>

        <div className="w-full max-w-[420px] relative z-10 py-12">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(6,182,212,0.3)' }}>
                <img src="/smt-logo.png" alt="SMT" className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-white text-base">
                STAR <span style={{ color: '#06b6d4' }}>MEDIA</span> TECH
              </span>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
            <h1 className="font-black text-white mb-1.5 text-3xl">Welcome back</h1>
            <p className="text-slate-500 text-sm">Sign in to your SMT account</p>
          </motion.div>

          {/* Registered toast */}
          <AnimatePresence>
            {justRegistered && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm mb-5"
                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399' }}>
                <CheckCircle2 size={15} /> Account created! Sign in below.
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step === 'success' ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl p-10 text-center"
                style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)' }}>
                  <CheckCircle2 size={30} style={{ color: '#34d399' }} />
                </motion.div>
                <p className="font-black text-white text-xl mb-1">You're in!</p>
                <p className="text-slate-500 text-sm">Redirecting to your account…</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl overflow-hidden"
                style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 32px 64px rgba(0,0,0,0.5)' }}>
                <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #06b6d4 40%, #a78bfa 70%, transparent)' }} />

                <div className="p-7 space-y-4">
                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    {(['email', 'phone'] as const).map(m => (
                      <button key={m} type="button" onClick={() => setLoginMethod(m)}
                        className={`method-tab py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 ${loginMethod === m ? 'active' : ''}`}>
                        {m === 'email' ? <><Mail size={13} /> Email</> : <><Smartphone size={13} /> Phone</>}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                        <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <AnimatePresence mode="wait">
                      <motion.div key={loginMethod} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
                        <FloatingInput
                          label={loginMethod === 'email' ? 'Email address' : 'Phone number'}
                          icon={loginMethod === 'email' ? Mail : Smartphone}
                          type={loginMethod === 'email' ? 'email' : 'tel'}
                          value={form.email}
                          onChange={(e: any) => setForm({ ...form, email: e.target.value })}
                          required />
                      </motion.div>
                    </AnimatePresence>

                    <FloatingInput label="Password" icon={Lock}
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e: any) => setForm({ ...form, password: e.target.value })}
                      required
                      trailingIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      onTrailingClick={() => setShowPassword(p => !p)} />

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.rememberMe}
                          onChange={e => setForm({ ...form, rememberMe: e.target.checked })}
                          className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500" />
                        <span className="text-xs text-slate-500">Remember me</span>
                      </label>
                      <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Forgot password?</a>
                    </div>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      type="submit" disabled={loading}
                      className="w-full py-3.5 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2.5 disabled:opacity-60 transition-all"
                      style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)', boxShadow: '0 4px 24px rgba(6,182,212,0.3)' }}>
                      {loading
                        ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" />
                        : <LogIn size={16} />}
                      {loading ? 'Signing in…' : 'Sign In'}
                    </motion.button>
                  </form>

                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 text-xs text-slate-600" style={{ background: '#0d1526' }}>or</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <Link to="/staff-login"
                      className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-semibold transition-all"
                      style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}>
                      <Sparkles size={13} /> Staff Portal
                    </Link>
                    <Link to="/vendor-login"
                      className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-semibold transition-all"
                      style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.2)', color: '#fb923c' }}>
                      <User size={13} /> Vendor Login
                    </Link>
                  </div>

                  <p className="text-center text-xs text-slate-600 pt-1">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
                      Create one free →
                    </Link>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-center text-[11px] text-slate-700 mt-5 flex items-center justify-center gap-1.5">
            <Shield size={11} /> Secured · Star Media Tech · Tamale, Ghana
          </motion.p>
        </div>
      </div>
    </div>
  )
}