import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../lib/axios'
import {
  Eye, EyeOff, Mail, Lock, User, UserPlus,
  Check, X, Shield, Sparkles, CheckCircle2,
  AlertCircle, ArrowLeft, ArrowRight
} from 'lucide-react'

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800;12..96,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');`

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 5.7 + 2) % 100}%`,
  duration: 5 + (i * 1.3) % 5,
  delay: (i * 0.55) % 4,
  size: i % 3 === 0 ? 1.5 : 1,
  color: i % 3 === 0
    ? 'rgba(167,139,250,0.6)'
    : i % 3 === 1
    ? 'rgba(236,72,153,0.5)'
    : 'rgba(139,92,246,0.4)',
}))

function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="rgrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rgrid)" />
      </svg>
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, delay: 4.5 }}
        className="absolute -bottom-48 -left-48 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
    </div>
  )
}

function FloatingInput({
  label, icon: Icon, trailingNode, accent = '#a78bfa', ...props
}: { label: string; icon: any; trailingNode?: React.ReactNode; accent?: string; [k: string]: any }) {
  const [focused, setFocused] = useState(false)
  const hasValue = !!props.value
  return (
    <div className="relative group">
      <label className="absolute left-11 pointer-events-none transition-all duration-200"
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
      <input {...props}
        onFocus={e => { setFocused(true); props.onFocus?.(e) }}
        onBlur={e => { setFocused(false); props.onBlur?.(e) }}
        className="w-full pl-11 pr-12 py-4 rounded-xl text-sm text-white outline-none transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1.5px solid ${focused ? accent : 'rgba(255,255,255,0.08)'}`,
          boxShadow: focused ? `0 0 0 3px ${accent}12` : 'none',
        }} />
      {trailingNode && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{trailingNode}</div>
      )}
    </div>
  )
}

const STRENGTH_DATA = [
  { label: 'Very weak', color: '#ef4444' },
  { label: 'Weak', color: '#f97316' },
  { label: 'Fair', color: '#eab308' },
  { label: 'Good', color: '#84cc16' },
  { label: 'Strong', color: '#22c55e' },
]

function calcStrength(p: string) {
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
}

type Step = 'account' | 'security' | 'done'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('account')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const strength = calcStrength(form.password)
  const sd = STRENGTH_DATA[Math.max(0, strength - 1)] ?? STRENGTH_DATA[0]
  const passwordsMatch = form.password && form.confirmPassword && form.password === form.confirmPassword

  const goToSecurity = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) { setError('Please fill in all fields.'); return }
    setError('')
    setStep('security')
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/register', { name: form.name, email: form.email, password: form.password })
      
      // ✅ Auto-login after registration
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      
      setStep('done')
      // ✅ Redirect to My Account page
      setTimeout(() => navigate('/my-account'), 1500)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  const ACCENT = '#a78bfa'

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: '#020617' }}>
      <style>{`
        ${FONTS}
        .font-body { font-family: 'DM Sans', sans-serif; }
        .step-dot { transition: all 0.35s; }
      `}</style>

      {/* Right panel — benefits */}
      <div className="hidden lg:flex lg:w-[42%] relative flex-col items-center justify-center p-16 order-last"
        style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.05), rgba(236,72,153,0.03))', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        <Background />
        <div className="relative z-10 max-w-xs text-center">
          <Link to="/" className="inline-flex flex-col items-center gap-3 mb-10">
            <div className="w-14 h-14 rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(167,139,250,0.3)', boxShadow: '0 0 40px rgba(167,139,250,0.2)' }}>
              <img src="/smt-logo.png" alt="SMT" className="w-full h-full object-contain" />
            </div>
            <p className="font-black text-white text-lg leading-none">
              STAR <span style={{ color: '#a78bfa' }}>MEDIA</span> TECH
            </p>
          </Link>
          <h2 className="font-black text-white leading-tight mb-3 text-3xl">
            Join 5,000+<br />Members
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Start your journey with Ghana's most trusted technology institution.
          </p>
        </div>
      </div>

      {/* Left panel — form */}
      <div className="flex-1 flex items-center justify-center px-5 sm:px-8 relative">
        <Background />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.slice(0, 12).map((p, i) => (
            <motion.div key={i}
              animate={{ y: ['100vh', '-5vh'], opacity: [0, 0.7, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
              className="absolute rounded-full"
              style={{ left: p.left, width: p.size * 4, height: p.size * 4, background: p.color }} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="absolute top-6 left-6 z-10">
          {step === 'security'
            ? <button onClick={() => setStep('account')} className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400">
                <ArrowLeft size={12} /> Back
              </button>
            : <Link to="/" className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400">
                <ArrowLeft size={12} /> Home
              </Link>}
        </motion.div>

        <div className="w-full max-w-[420px] relative z-10 py-12">
          <div className="lg:hidden text-center mb-7">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(167,139,250,0.3)' }}>
                <img src="/smt-logo.png" alt="SMT" className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-white text-sm">
                STAR <span style={{ color: '#a78bfa' }}>MEDIA</span> TECH
              </span>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="font-black text-white mb-1 text-3xl">
              {step === 'done' ? 'All done!' : 'Create account'}
            </h1>
            <p className="text-slate-500 text-sm">
              {step === 'account' && 'Step 1 of 2 — Your details'}
              {step === 'security' && 'Step 2 of 2 — Set your password'}
              {step === 'done' && 'Your account is ready!'}
            </p>
          </motion.div>

          <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl overflow-hidden"
            style={{ background: 'rgba(13,21,38,0.92)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 32px 64px rgba(0,0,0,0.5)' }}>
            <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #a78bfa 40%, #ec4899 70%, transparent)' }} />

            {step === 'done' && (
              <div className="p-10 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)' }}>
                  <CheckCircle2 size={30} style={{ color: '#a78bfa' }} />
                </motion.div>
                <p className="font-black text-white text-xl mb-1">Welcome to SMT!</p>
                <p className="text-slate-500 text-sm">Redirecting to your account…</p>
              </div>
            )}

            {step === 'account' && (
              <form onSubmit={goToSecurity} className="p-7 space-y-4">
                {error && (
                  <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                    <AlertCircle size={15} className="flex-shrink-0 mt-0.5" /> {error}
                  </div>
                )}
                <FloatingInput label="Full name" icon={User} type="text" accent={ACCENT}
                  value={form.name} onChange={(e: any) => setForm({ ...form, name: e.target.value })} required />
                <FloatingInput label="Email address" icon={Mail} type="email" accent={ACCENT}
                  value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} required />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3.5 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2.5 transition-all"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 4px 24px rgba(167,139,250,0.3)' }}>
                  Continue <ArrowRight size={15} />
                </motion.button>
                <p className="text-center text-xs text-slate-600 pt-1">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold" style={{ color: '#a78bfa' }}>Sign in →</Link>
                </p>
              </form>
            )}

            {step === 'security' && (
              <form onSubmit={handleRegister} className="p-7 space-y-4">
                {error && (
                  <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                    <AlertCircle size={15} className="flex-shrink-0 mt-0.5" /> {error}
                  </div>
                )}
                <div className="space-y-2">
                  <FloatingInput label="Password" icon={Lock} accent={ACCENT}
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e: any) => setForm({ ...form, password: e.target.value })}
                    required
                    trailingNode={
                      <button type="button" onClick={() => setShowPass(p => !p)} className="text-slate-500 hover:text-slate-300">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    } />
                  {form.password && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="flex gap-1 mb-1.5">
                        {[1, 2, 3, 4].map(lvl => (
                          <div key={lvl} className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{ background: lvl <= strength ? sd.color : 'rgba(255,255,255,0.07)' }} />
                        ))}
                      </div>
                      <p className="text-[11px] flex items-center gap-1.5" style={{ color: sd.color }}>
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: sd.color }} />
                        {sd.label}
                      </p>
                    </motion.div>
                  )}
                </div>
                <FloatingInput label="Confirm password" icon={Lock} accent={ACCENT}
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e: any) => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                  trailingNode={
                    <div className="flex items-center gap-1">
                      {form.confirmPassword && (
                        passwordsMatch
                          ? <Check size={14} style={{ color: '#22c55e' }} />
                          : <X size={14} style={{ color: '#ef4444' }} />
                      )}
                      <button type="button" onClick={() => setShowConfirm(p => !p)} className="text-slate-500 hover:text-slate-300 ml-1">
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  } />
                <p className="text-xs text-slate-600 text-center">
                  By creating an account you agree to our{' '}
                  <Link to="/terms" className="hover:text-slate-400" style={{ color: '#a78bfa' }}>Terms</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="hover:text-slate-400" style={{ color: '#a78bfa' }}>Privacy Policy</Link>
                </p>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2.5 disabled:opacity-60 transition-all"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 4px 24px rgba(167,139,250,0.3)' }}>
                  {loading
                    ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" />
                    : <UserPlus size={16} />}
                  {loading ? 'Creating account…' : 'Create Account'}
                </motion.button>
              </form>
            )}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-center text-[11px] text-slate-700 mt-5 flex items-center justify-center gap-1.5">
            <Shield size={11} /> Your data is safe · Star Media Tech · Tamale, Ghana
          </motion.p>
        </div>
      </div>
    </div>
  )
}