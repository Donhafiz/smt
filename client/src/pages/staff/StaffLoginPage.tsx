import { useState, FormEvent, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../lib/axios'
import {
  Eye, EyeOff, Mail, Lock, LogIn, AlertCircle,
  CreditCard, ArrowLeft, Shield, CheckCircle2,
  Fingerprint, ChevronRight, ArrowRight
} from 'lucide-react'

// ── Shared style helpers ────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800;12..96,900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');`

// ── Ambient orb background ──────────────────────────────────────────────────
const Background = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Grid */}
    <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="g" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
    </svg>
    {/* Orbs */}
    <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 9, repeat: Infinity }}
      className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
    <motion.div animate={{ scale: [1.15, 1, 1.15], opacity: [0.12, 0.2, 0.12] }}
      transition={{ duration: 9, repeat: Infinity, delay: 4.5 }}
      className="absolute -bottom-60 -right-60 w-[700px] h-[700px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
  </div>
)

// ── Floating particles ──────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.3) % 100}%`,
  duration: 4 + (i * 1.1) % 4,
  delay: (i * 0.4) % 3,
  color: i % 3 === 0 ? 'rgba(6,182,212,0.5)' : i % 3 === 1 ? 'rgba(52,211,153,0.4)' : 'rgba(167,139,250,0.35)',
}))

// ── Input field ──────────────────────────────────────────────────────────────
function InputField({ icon: Icon, trailingIcon, onTrailingClick, ...props }: any) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none"
        style={{ color: focused ? '#06b6d4' : '#475569' }}>
        <Icon size={17} />
      </div>
      <input
        {...props}
        onFocus={e => { setFocused(true); props.onFocus?.(e) }}
        onBlur={e => { setFocused(false); props.onBlur?.(e) }}
        className="w-full pl-11 pr-12 py-3.5 rounded-xl font-body text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${focused ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(6,182,212,0.08)' : 'none',
        }}
      />
      {trailingIcon && (
        <button type="button" onClick={onTrailingClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
          {trailingIcon}
        </button>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════
export default function StaffLoginPage() {
  const navigate = useNavigate()
  const [form, setForm]               = useState({ staffId: '', email: '', password: '' })
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginMode, setLoginMode]     = useState<'id' | 'email'>('id')
  const [step, setStep]               = useState<'credentials' | 'success'>('credentials')

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/staff-portal/login', {
        staffId: loginMode === 'id' ? form.staffId || undefined : undefined,
        email:   loginMode === 'email' ? form.email || undefined : undefined,
        password: form.password,
      })
      localStorage.setItem('staffToken', res.data.token)
      localStorage.setItem('staffUser',  JSON.stringify(res.data.staff))
      setStep('success')
      setTimeout(() => navigate('/staff-portal/dashboard'), 1200)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#020617' }}>

      <style>{`${FONTS}
        .font-display { font-family: 'Bricolage Grotesque', sans-serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
        .mode-tab { transition: all 0.25s; cursor: pointer; border: 1px solid transparent; font-family: 'DM Sans', sans-serif; }
        .mode-tab.active { background: rgba(6,182,212,0.12); border-color: rgba(6,182,212,0.3); color: #06b6d4; }
        .mode-tab:not(.active) { background: rgba(255,255,255,0.03); color: #475569; }
        .mode-tab:not(.active):hover { color: #94a3b8; background: rgba(255,255,255,0.05); }
      `}</style>

      <Background />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.div key={i}
            animate={{ y: ['100vh', '-5vh'], opacity: [0, 0.7, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
            className="absolute w-1 h-1 rounded-full"
            style={{ left: p.left, background: p.color }} />
        ))}
      </div>

      {/* Back link */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
        className="absolute top-6 left-6 z-10">
        <Link to="/" className="flex items-center gap-1.5 font-body text-xs text-slate-600 hover:text-slate-400 transition-colors">
          <ArrowLeft size={13} /> Home
        </Link>
      </motion.div>

      <div className="w-full max-w-[420px] relative z-10">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8">

          {/* Logo mark */}
          <div className="relative inline-block mb-5">
            <motion.div whileHover={{ scale: 1.05 }}
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #0e7490, #1d4ed8)',
                boxShadow: '0 0 60px rgba(6,182,212,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}>
              <Shield size={34} className="text-white" />
            </motion.div>
            {/* Pulse rings */}
            <motion.div animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ border: '1.5px solid rgba(6,182,212,0.4)' }} />
          </div>

          <h1 className="font-display font-black text-white text-3xl mb-1.5">Staff Portal</h1>
          <p className="font-body text-slate-500 text-sm">Secure access for SMT team members</p>
        </motion.div>

        {/* ── Card ───────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>

          {/* Top accent */}
          <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #06b6d4 40%, #34d399 60%, transparent)' }} />

          <AnimatePresence mode="wait">
            {step === 'success' ? (
              /* ── Success state ────────────────────────────────────── */
              <motion.div key="success"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="p-10 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}>
                  <CheckCircle2 size={30} style={{ color: '#34d399' }} />
                </motion.div>
                <p className="font-display font-black text-white text-xl mb-1">Access Granted!</p>
                <p className="font-body text-slate-500 text-sm">Redirecting to your dashboard…</p>
              </motion.div>
            ) : (
              /* ── Login form ──────────────────────────────────────── */
              <motion.form key="form" onSubmit={handleLogin} className="p-7 space-y-5">

                {/* Login mode toggle */}
                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {(['id', 'email'] as const).map(m => (
                    <button key={m} type="button" onClick={() => setLoginMode(m)}
                      className={`mode-tab flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold ${loginMode === m ? 'active' : ''}`}>
                      {m === 'id' ? <><CreditCard size={13} /> Staff ID</> : <><Mail size={13} /> Email</>}
                    </button>
                  ))}
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="flex items-start gap-2.5 px-4 py-3 rounded-xl font-body text-sm"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                      <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Identifier field */}
                <AnimatePresence mode="wait">
                  <motion.div key={loginMode}
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}>
                    {loginMode === 'id' ? (
                      <InputField icon={CreditCard} type="text"
                        placeholder="Staff ID — e.g. SMT-250001"
                        value={form.staffId}
                        onChange={(e: any) => setForm({ ...form, staffId: e.target.value })} />
                    ) : (
                      <InputField icon={Mail} type="email"
                        placeholder="Staff email address"
                        value={form.email}
                        onChange={(e: any) => setForm({ ...form, email: e.target.value })} />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Password */}
                <InputField icon={Lock} type={showPassword ? 'text' : 'password'}
                  placeholder="Password" required
                  value={form.password}
                  onChange={(e: any) => setForm({ ...form, password: e.target.value })}
                  trailingIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  onTrailingClick={() => setShowPassword(p => !p)} />

                {/* Forgot link */}
                <div className="flex justify-end">
                  <a href="mailto:starmedia568@gmail.com"
                    className="font-body text-xs text-slate-600 hover:text-cyan-400 transition-colors">
                    Forgot password? Contact admin →
                  </a>
                </div>

                {/* Submit */}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-2xl font-body font-semibold text-sm text-white flex items-center justify-center gap-2.5 disabled:opacity-60 transition-all"
                  style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)', boxShadow: '0 4px 24px rgba(6,182,212,0.3)' }}>
                  {loading
                    ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" />
                    : <LogIn size={16} />}
                  {loading ? 'Verifying identity…' : 'Sign In to Portal'}
                </motion.button>

                {/* Footer */}
                <div className="pt-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <p className="font-body text-center text-xs text-slate-600 mt-4">
                    Not staff?{' '}
                    <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                      Customer login
                    </Link>
                    {' '}·{' '}
                    <Link to="/" className="text-slate-500 hover:text-slate-400 transition-colors">
                      Back to home
                    </Link>
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Security note */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="text-center font-body text-[11px] text-slate-700 mt-5 flex items-center justify-center gap-1.5">
          <Shield size={11} /> Encrypted connection · SMT staff only
        </motion.p>
      </div>
    </div>
  )
}