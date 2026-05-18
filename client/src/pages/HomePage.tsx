import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import TrustBar from '../components/TrustBar'
import { usePersonalization } from '../hooks/usePersonalization'
import { useTranslation } from 'react-i18next'
import {
  Monitor, GraduationCap, Briefcase, ShoppingCart,
  Shield, Zap, Users, Globe, ArrowRight, CheckCircle2,
  Star, TrendingUp, Clock, BarChart3, Sparkles,
  ChevronRight, Award, Cloud, Lock, Code, ArrowUpRight,
  Cpu, Database, Layers, Play, Pause
} from 'lucide-react'

// ── Font loader ────────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,700;12..96,800;12..96,900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap'
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])
  return null
}

// ── Animated counter ───────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

// ── Noise grain overlay ────────────────────────────────────────────────────
const GrainOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[999] opacity-[0.025]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundSize: '200px 200px',
    }}
  />
)

// ── Animated grid lines background ────────────────────────────────────────
const GridLines = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    {/* Radial fade over grid */}
    <div className="absolute inset-0 bg-radial-fade" style={{
      background: 'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, #020617 80%)'
    }} />
  </div>
)

// ── Stat counter card ──────────────────────────────────────────────────────
function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCounter(value, 2200, inView)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative group">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="relative px-8 py-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm text-center">
        <p className="font-display text-5xl font-black text-white tracking-tight">
          {count}<span className="text-cyan-400">{suffix}</span>
        </p>
        <p className="mt-2 text-sm text-slate-500 font-body tracking-wide">{label}</p>
      </div>
    </motion.div>
  )
}

// ── Core unit card ─────────────────────────────────────────────────────────
const unitData = [
  {
    icon: Code,
    label: '01',
    title: 'Software Development',
    desc: 'Custom websites, mobile apps, and enterprise systems built with cutting-edge technology and shipped with precision.',
    features: ['Web Development', 'Mobile Apps', 'Enterprise Systems', 'API Development', 'UI/UX Design'],
    accent: '#06b6d4',
    glow: 'rgba(6,182,212,0.15)',
    link: '/software',
    tag: 'Build',
  },
  {
    icon: GraduationCap,
    label: '02',
    title: 'IT Training School',
    desc: 'Professional IT courses with mentorship and certification from industry experts shaping Africa\'s digital talent.',
    features: ['Web Development', 'Cybersecurity', 'Data Science', 'AI/ML', 'Networking'],
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.15)',
    link: '/training',
    tag: 'Learn',
  },
  {
    icon: Briefcase,
    label: '03',
    title: 'IT Consultancy',
    desc: 'Strategic technology advisory, digital transformation, and security audits that save you time and money.',
    features: ['Cloud Solutions', 'Security Audits', 'Digital Strategy', 'Infrastructure', 'Support'],
    accent: '#f97316',
    glow: 'rgba(249,115,22,0.15)',
    link: '/consultancy',
    tag: 'Consult',
  },
  {
    icon: ShoppingCart,
    label: '04',
    title: 'Commerce Market',
    desc: 'Premium laptops, phones, accessories, and gadgets with swift delivery across Ghana and beyond.',
    features: ['Laptops', 'Smartphones', 'Accessories', 'Gadgets', 'Software'],
    accent: '#22d3ee',
    glow: 'rgba(34,211,238,0.15)',
    link: '/shop',
    tag: 'Shop',
  },
]

const featureData = [
  { icon: Shield, title: 'Enterprise Security', desc: 'AES-256 encryption with JWT auth, role-based access, and a full audit ledger.', tag: 'Security' },
  { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Live dashboards, custom reports, and exportable performance metrics.', tag: 'Data' },
  { icon: Cloud, title: 'Multi-Tenant Platform', desc: 'Complete data isolation per organisation with custom branding and auto-scaling.', tag: 'Cloud' },
  { icon: Lock, title: 'Full Transparency', desc: 'Signed receipts, public reports, and verified audit trails for every action.', tag: 'Trust' },
  { icon: Zap, title: 'Up in Minutes', desc: 'Quick-start wizard, CSV import, and template library — no code required.', tag: 'Speed' },
  { icon: Clock, title: 'Automated Workflows', desc: 'Scheduled tasks, email/SMS alerts, and backup automation that runs while you sleep.', tag: 'Automation' },
]

const testimonials = [
  { quote: 'SMT transformed our entire digital infrastructure. The ERP system alone saved us ₵200k in operational costs.', author: 'Sarah L.', role: 'CEO, TechNova Ltd.', avatar: 'SL' },
  { quote: 'I had zero coding experience. Three months later I landed a cybersecurity role at a fintech. Life-changing.', author: 'Kwame A.', role: 'Graduate 2024', avatar: 'KA' },
  { quote: 'Their consultancy team redefined our cloud strategy. Reliable, sharp, and genuinely invested in your success.', author: 'David M.', role: 'CTO, FinServ Ghana', avatar: 'DM' },
]

// ══════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('checking')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [hoveredUnit, setHoveredUnit] = useState<number | null>(null)
  const { t } = useTranslation()
  const { getRecommendations, profile } = usePersonalization()

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)

    const checkHealth = async () => {
      for (let i = 0; i < 3; i++) {
        try {
          const res = await fetch('https://smt-backend-amad.onrender.com/health')
          if (res.ok) { setStatus('online'); return }
        } catch {}
        await new Promise(r => setTimeout(r, 3000))
      }
      setStatus('offline')
    }
    checkHealth()
    fetch('https://smt-backend-amad.onrender.com/api/products').then(r => r.json()).then(d => setProducts(d || [])).catch(() => {})
    fetch('https://smt-backend-amad.onrender.com/api/courses').then(r => r.json()).then(d => setCourses(d || [])).catch(() => {})
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const handlePrimaryAction = () => navigate(isLoggedIn ? '/admin' : '/login')

  return (
    <>
      <FontLoader />
      <GrainOverlay />

      <style>{`
        :root { --font-display: 'Bricolage Grotesque', sans-serif; --font-body: 'DM Sans', sans-serif; }
        .font-display { font-family: var(--font-display); }
        .font-body { font-family: var(--font-body); }
        body { font-family: var(--font-body); }
        .text-gradient-cyan { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #a78bfa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .text-gradient-warm { background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .glass-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .glass-card-hover:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.1); }
        @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out infinite 2s; }
        .btn-primary {
          background: linear-gradient(135deg, #0891b2, #2563eb);
          box-shadow: 0 0 40px rgba(6,182,212,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .btn-primary:hover { box-shadow: 0 0 60px rgba(6,182,212,0.4), inset 0 1px 0 rgba(255,255,255,0.15); transform: translateY(-2px); }
        .unit-card { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .unit-card:hover { transform: translateY(-6px) scale(1.01); }
      `}</style>

      <div className="relative min-h-screen overflow-hidden" style={{ background: '#020617', fontFamily: 'var(--font-body)' }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
          
          <GridLines />

          {/* Ambient orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="animate-float absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className="animate-float-delayed absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
            <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.5) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          </div>

          {/* Video background */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover scale-110">
              <source src="https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #020617 0%, transparent 30%, transparent 70%, #020617 100%)' }} />
          </div>

          {/* Floating tech icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { Icon: Cpu, x: '8%', y: '20%', delay: 0, size: 28 },
              { Icon: Database, x: '88%', y: '15%', delay: 1, size: 24 },
              { Icon: Layers, x: '92%', y: '70%', delay: 2, size: 20 },
              { Icon: Globe, x: '5%', y: '72%', delay: 0.5, size: 22 },
              { Icon: Shield, x: '15%', y: '85%', delay: 1.5, size: 18 },
              { Icon: Zap, x: '82%', y: '40%', delay: 0.8, size: 20 },
            ].map(({ Icon, x, y, delay, size }, i) => (
              <motion.div key={i} className="absolute text-white/10"
                style={{ left: x, top: y }}
                animate={{ y: [0, -10, 0], opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 4 + delay, repeat: Infinity, delay }}>
                <Icon size={size} />
              </motion.div>
            ))}
          </div>

          <motion.div style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 text-center max-w-5xl mx-auto">

            {/* Status pill */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10 font-body"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'online' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`} />
              </span>
              <span className="text-xs text-slate-400 tracking-widest uppercase font-medium">
                Platform {status === 'online' ? 'Live' : status === 'checking' ? 'Connecting…' : 'Offline'}
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="text-xs text-cyan-400 tracking-wider font-medium">Ghana's #1 Tech Institution</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black tracking-tight leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}>
              <span className="text-white block">Building</span>
              <span className="block text-gradient-cyan">Africa's</span>
              <span className="text-white block">Digital Future</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="font-body text-slate-400 leading-relaxed mx-auto mb-10"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '560px' }}>
              {t('heroDescription') || 'Star Media Tech unites software development, IT education, expert consultancy, and a premier tech marketplace — powering Tamale and beyond.'}
            </motion.p>

            {/* CTA buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={handlePrimaryAction} className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-semibold font-body"
                style={{ fontSize: '1rem' }}>
                {isLoggedIn ? 'Go to Dashboard' : 'Get Started Free'}
                <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('/services')}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-semibold font-body text-slate-300 hover:text-white transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '1rem' }}>
                Explore Services
                <ChevronRight size={18} />
              </button>
            </motion.div>

            {/* Scrolling client logos / trust line */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="mt-14 flex flex-wrap items-center justify-center gap-3 font-body">
              <span className="text-xs text-slate-600 uppercase tracking-widest mr-2">Trusted by</span>
              {['FinServ Ghana', 'TechNova Ltd', 'GhanaGov', 'AfriNet', 'EduHub GH'].map((name, i) => (
                <span key={i} className="text-xs text-slate-500 px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {name}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
              style={{ border: '1.5px solid rgba(255,255,255,0.15)' }}>
              <div className="w-1 h-2 rounded-full bg-cyan-400" />
            </motion.div>
            <span className="text-[10px] text-slate-600 uppercase tracking-widest font-body">Scroll</span>
          </motion.div>
        </section>

        {/* ══ TRUST BAR ════════════════════════════════════════════════════ */}
        <TrustBar />

        {/* ══ AI PERSONALIZED BANNER ══════════════════════════════════════ */}
        {profile && profile.visitCount > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto px-6 py-4">
            <div className="rounded-2xl px-6 py-4 text-center font-body"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(167,139,250,0.08))', border: '1px solid rgba(6,182,212,0.2)' }}>
              <p className="text-cyan-400 text-sm">👋 Welcome back! {getRecommendations()}</p>
            </div>
          </motion.div>
        )}

        {/* ══ STATS ════════════════════════════════════════════════════════ */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard value={500} suffix="+" label="Students Trained" delay={0} />
            <StatCard value={120} suffix="+" label="Projects Delivered" delay={0.1} />
            <StatCard value={6} suffix="" label="Years of Excellence" delay={0.2} />
            <StatCard value={98} suffix="%" label="Client Satisfaction" delay={0.3} />
          </div>
        </section>

        {/* ══ CORE UNITS ═══════════════════════════════════════════════════ */}
        <section className="relative py-24 px-6">
          <div className="max-w-7xl mx-auto">

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <p className="font-body text-xs text-cyan-400 uppercase tracking-widest font-semibold mb-3">What We Offer</p>
                <h2 className="font-display font-black text-white leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  Our Core<br /><span className="text-gradient-cyan">Units</span>
                </h2>
              </div>
              <p className="font-body text-slate-500 max-w-sm leading-relaxed lg:pb-2">
                Four interconnected divisions powering digital transformation across Africa.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {unitData.map((unit, i) => {
                const Icon = unit.icon
                const isHovered = hoveredUnit === i
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHoveredUnit(i)}
                    onMouseLeave={() => setHoveredUnit(null)}
                    onClick={() => navigate(unit.link)}
                    className="unit-card glass-card glass-card-hover relative overflow-hidden rounded-3xl p-8 cursor-pointer group">

                    {/* Glow on hover */}
                    <div className="absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                      style={{ background: `radial-gradient(ellipse 80% 80% at 80% 20%, ${unit.glow}, transparent)` }} />

                    {/* Number label */}
                    <div className="flex items-start justify-between mb-8">
                      <span className="font-display text-xs font-black text-slate-700 tracking-widest">{unit.label}</span>
                      <span className="font-body text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-semibold"
                        style={{ background: `${unit.accent}15`, color: unit.accent, border: `1px solid ${unit.accent}25` }}>
                        {unit.tag}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="mb-5 inline-flex p-3.5 rounded-2xl"
                      style={{ background: `${unit.accent}15`, border: `1px solid ${unit.accent}20` }}>
                      <Icon size={26} style={{ color: unit.accent }} />
                    </div>

                    {/* Content */}
                    <h3 className="font-display font-black text-white mb-3 leading-tight" style={{ fontSize: '1.5rem' }}>{unit.title}</h3>
                    <p className="font-body text-slate-500 text-sm leading-relaxed mb-6">{unit.desc}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {unit.features.slice(0, 4).map((feat, j) => (
                        <span key={j} className="font-body text-xs px-3 py-1.5 rounded-full text-slate-400"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div className="flex items-center gap-2 font-body font-semibold text-sm transition-all duration-300"
                      style={{ color: unit.accent }}>
                      Explore Unit
                      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-3xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                      style={{ background: `linear-gradient(90deg, transparent, ${unit.accent}, transparent)` }} />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══ FEATURES ════════════════════════════════════════════════════ */}
        <section className="relative py-24 px-6" style={{ background: 'rgba(255,255,255,0.01)' }}>
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-16">
              <p className="font-body text-xs text-cyan-400 uppercase tracking-widest font-semibold mb-3">Platform</p>
              <h2 className="font-display font-black text-white leading-none mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                Everything You<br /><span className="text-gradient-cyan">Need to Scale</span>
              </h2>
              <p className="font-body text-slate-500 max-w-lg mx-auto">Secure, transparent, and built for the long run.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featureData.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
                    className="glass-card glass-card-hover group rounded-2xl p-6 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/15 transition-all">
                        <Icon size={20} className="text-cyan-400" />
                      </div>
                      <span className="font-body text-[10px] text-slate-600 uppercase tracking-widest">{f.tag}</span>
                    </div>
                    <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>{f.title}</h3>
                    <p className="font-body text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══ TEAM / TESTIMONIALS ═════════════════════════════════════════ */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-14">
              <p className="font-body text-xs text-cyan-400 uppercase tracking-widest font-semibold mb-3">Stories</p>
              <h2 className="font-display font-black text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                Real People,<br /><span className="text-gradient-cyan">Real Results</span>
              </h2>
            </motion.div>

            {/* Student photo cards */}
            <div className="grid md:grid-cols-3 gap-5 mb-16">
              {[
                { name: 'Kwame A.', role: 'Cybersecurity Graduate', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', outcome: 'Landed a job in 3 months' },
                { name: 'Ama S.', role: 'Web Development Student', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face', outcome: 'Built 5 client projects' },
                { name: 'David M.', role: 'CTO, FinServ Ghana', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop&crop=face', outcome: 'Saved ₵200k in costs' },
              ].map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass-card glass-card-hover group rounded-2xl overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <img src={p.image} alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #020617 0%, transparent 60%)' }} />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="font-body text-xs px-3 py-1 rounded-full font-semibold"
                        style={{ background: 'rgba(6,182,212,0.2)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)' }}>
                        {p.outcome}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-display font-bold text-white">{p.name}</p>
                    <p className="font-body text-sm text-slate-500">{p.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Rotating quote */}
            <div className="max-w-3xl mx-auto text-center">
              <div className="relative h-40">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTestimonial}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="font-body text-xl text-slate-300 leading-relaxed italic mb-4">
                      "{testimonials[activeTestimonial].quote}"
                    </p>
                    <p className="font-display font-bold text-white">{testimonials[activeTestimonial].author}</p>
                    <p className="font-body text-sm text-slate-500">{testimonials[activeTestimonial].role}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeTestimonial ? '2rem' : '0.5rem',
                      height: '0.5rem',
                      background: i === activeTestimonial ? '#06b6d4' : 'rgba(255,255,255,0.15)',
                    }} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ═════════════════════════════════════════════════════════ */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl text-center px-8 py-20"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(59,130,246,0.06) 50%, rgba(167,139,250,0.06) 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>

              {/* Glow effects */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20"
                style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.6) 0%, transparent 70%)', filter: 'blur(80px)' }} />
              <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.6) 0%, transparent 70%)', filter: 'blur(60px)' }} />

              <div className="relative z-10">
                <p className="font-body text-xs text-cyan-400 uppercase tracking-widest font-semibold mb-4">Join the Movement</p>
                <h2 className="font-display font-black text-white leading-none mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                  Ready to Start<br />Your Journey?
                </h2>
                <p className="font-body text-slate-400 text-lg mb-10 max-w-md mx-auto">
                  Join thousands of students and businesses who trust Star Media Tech to power their future.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button onClick={() => navigate('/register')} className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-semibold font-body">
                    Get Started Free <ArrowRight size={18} />
                  </button>
                  <button onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-body font-semibold text-slate-300 hover:text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    Talk to Us <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  )
}