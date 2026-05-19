import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useTranslation } from 'react-i18next'
import {
  Menu, X, ShoppingCart, ChevronDown,
  GraduationCap, Briefcase, Monitor, ShoppingBag,
  Search, User, Contact, Wrench, ArrowRight,
  Command, LayoutDashboard
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
interface NavItem { to: string; label: string }
interface ServiceItem { to: string; label: string; icon: JSX.Element; desc: string; accent: string }

// ── Data ───────────────────────────────────────────────────────────────────
const mainLinks: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/training', label: 'Training' },
  { to: '/staff', label: 'Staff' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const serviceLinks: ServiceItem[] = [
  { to: '/services', label: 'All Services', icon: <Wrench size={16} />, desc: 'Overview of every unit', accent: '#06b6d4' },
  { to: '/training', label: 'IT Training', icon: <GraduationCap size={16} />, desc: 'Learn from scratch to pro', accent: '#a78bfa' },
  { to: '/consultancy', label: 'Consultancy & AI', icon: <Briefcase size={16} />, desc: 'Hire our experts', accent: '#f97316' },
  { to: '/software', label: 'Software Products', icon: <Monitor size={16} />, desc: 'Ready-made solutions', accent: '#22d3ee' },
  { to: '/shop', label: 'Commerce Market', icon: <ShoppingBag size={16} />, desc: 'Buy premium tech', accent: '#34d399' },
]

const langs = [
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'tw', flag: '🇬🇭', label: 'TW' },
]

// ── Search modal ───────────────────────────────────────────────────────────
function SearchModal({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 80)
    return () => clearTimeout(timer)
  }, [])

  const quickLinks = [
    { label: 'IT Training Courses', to: '/training', icon: <GraduationCap size={14} /> },
    { label: 'Software Products', to: '/software', icon: <Monitor size={14} /> },
    { label: 'Consultancy Services', to: '/consultancy', icon: <Briefcase size={14} /> },
    { label: 'Shop Tech Products', to: '/shop', icon: <ShoppingBag size={14} /> },
  ]

  const go = (to: string) => { navigate(to); onClose() }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4"
      style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: -20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.97 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl overflow-hidden"
        style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <Search size={18} className="text-slate-500 flex-shrink-0" />
          <input ref={inputRef} type="text" placeholder="Search products, courses, services…"
            className="flex-1 bg-transparent text-white placeholder-slate-600 text-[15px] outline-none" />
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 transition-all">
            <X size={16} className="text-slate-500" />
          </button>
        </div>
        <div className="p-3">
          <p className="px-2 py-1.5 text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1">Quick Links</p>
          {quickLinks.map((ql, i) => (
            <button key={i} onClick={() => go(ql.to)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm text-left">
              <span className="text-slate-600">{ql.icon}</span> {ql.label}
              <ArrowRight size={12} className="ml-auto text-slate-700" />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════════════════════
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const isLoggedIn = !!localStorage.getItem('token')
  const { items } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const servicesRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)
  const { i18n } = useTranslation()

  const cartCount = items.reduce((s: number, i: any) => s + (i.quantity || 1), 0)

  // Get user role for conditional rendering
  const getUserRole = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      return user.role || 'user'
    } catch { return 'user' }
  }

  const isAdmin = ['admin', 'superadmin', 'director'].includes(getUserRole())

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 80 && y > (window as any).__lastScrollY)
      ;(window as any).__lastScrollY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false); setServicesOpen(false); setLangOpen(false) }, [location])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false)
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(s => !s) }
      if (e.key === 'Escape') { setSearchOpen(false) }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const currentLang = langs.find(l => l.code === i18n.language) ?? langs[0]

  return (
    <>
      <style>{`
        .font-body { font-family: 'DM Sans', sans-serif; }
        .icon-btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0.55rem; border-radius: 0.6rem; color: #94a3b8;
          background: transparent; border: 1px solid transparent;
          transition: all 0.2s; cursor: pointer;
        }
        .icon-btn:hover { color: #fff; background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.08); }
      `}</style>

      <AnimatePresence>{searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}</AnimatePresence>

      <motion.nav
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="sticky top-0 z-50"
        style={{
          background: scrolled ? 'rgba(2,6,23,0.95)' : 'rgba(2,6,23,0.7)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.03)',
        }}>
        <div style={{ height: '1.5px', background: 'linear-gradient(90deg, transparent, #06b6d4 30%, #3b82f6 60%, #a78bfa 80%, transparent)' }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between" style={{ height: 68 }}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden transition-all duration-300"
                style={{ border: '1px solid rgba(6,182,212,0.2)' }}>
                <img src="/smt-logo.png" alt="SMT" className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="hidden sm:block leading-none">
                <p className="text-[1.05rem] font-black tracking-tight leading-none">
                  <span className="text-white">STAR </span>
                  <span style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MEDIA</span>
                  <span className="text-white"> TECH</span>
                </p>
                <p className="text-[9px] text-slate-600 tracking-[0.2em] uppercase mt-0.5">Premium Tech Institution</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {mainLinks.map(link => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                      isActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:text-white'
                    }`
                  }>
                  {link.label}
                </NavLink>
              ))}
              <div className="relative" ref={servicesRef}>
                <button onClick={() => setServicesOpen(p => !p)}
                  className={`relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    servicesOpen ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:text-white'
                  }`}>
                  Services
                  <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }}><ChevronDown size={12} /></motion.span>
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full mt-3 left-0 w-72 rounded-2xl p-2 z-50"
                      style={{ background: 'rgba(10,15,35,0.97)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {serviceLinks.map(link => (
                        <NavLink key={link.to} to={link.to} onClick={() => setServicesOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all text-sm ${
                              isActive ? 'bg-cyan-500/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`
                          }>
                          <span style={{ color: link.accent }}>{link.icon}</span>
                          <div>
                            <p className="font-bold">{link.label}</p>
                            <p className="text-[11px] text-slate-600">{link.desc}</p>
                          </div>
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-1">
              <button onClick={() => setSearchOpen(true)} className="icon-btn" title="Search (⌘K)">
                <Search size={16} />
              </button>

              {/* Language */}
              <div className="relative" ref={langRef}>
                <button onClick={() => setLangOpen(p => !p)} className="icon-btn gap-1.5 px-2.5 text-[13px] font-medium">
                  <span>{currentLang.flag}</span>
                  <span className="text-slate-400">{currentLang.label}</span>
                  <ChevronDown size={11} className="text-slate-600" />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                      className="absolute top-full mt-2 right-0 w-32 rounded-xl p-1.5 z-50"
                      style={{ background: 'rgba(10,15,35,0.97)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {langs.map(l => (
                        <button key={l.code} onClick={() => { i18n.changeLanguage(l.code); localStorage.setItem('smt-language', l.code); setLangOpen(false) }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all ${
                            i18n.language === l.code ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}>
                          {l.flag} {l.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <Link to="/cart" className="icon-btn relative">
                <ShoppingCart size={16} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-[18px] h-[18px] flex items-center justify-center rounded-full text-[9px] font-black text-white"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>{cartCount}</span>
                )}
              </Link>

              {/* Staff portal */}
              <Link to="/staff-login"
                className="ml-1 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all"
                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}>
                <Contact size={13} /> Staff
              </Link>

              {/* ✅ AUTH — FIXED */}
              {isLoggedIn ? (
                <div className="flex items-center gap-1.5 ml-1">
                  {/* My Account — ALL logged-in users */}
                  <Link to="/my-account"
                    className="px-4 py-2 rounded-xl text-[13px] font-medium text-slate-300 hover:text-white transition-all hover:bg-white/5"
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    <User size={14} className="inline mr-1.5" /> My Account
                  </Link>
                  {/* Dashboard — ONLY admin */}
                  {isAdmin && (
                    <Link to="/admin"
                      className="px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)', boxShadow: '0 4px 20px rgba(6,182,212,0.25)' }}>
                      <LayoutDashboard size={14} className="inline mr-1.5" /> Dashboard
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 ml-1">
                  <Link to="/login"
                    className="px-4 py-2 rounded-xl text-[13px] font-medium text-slate-300 hover:text-white transition-all hover:bg-white/5"
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}>Login</Link>
                  <Link to="/register"
                    className="px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)', boxShadow: '0 4px 20px rgba(6,182,212,0.25)' }}>Register</Link>
                </div>
              )}
            </div>

            {/* Mobile buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link to="/cart" className="icon-btn relative">
                <ShoppingCart size={17} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-[18px] h-[18px] flex items-center justify-center rounded-full text-[9px] font-black text-white"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>{cartCount}</span>
                )}
              </Link>
              <button onClick={() => setIsOpen(p => !p)} className="icon-btn" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                {isOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(2,6,23,0.98)' }}>
              <div className="px-5 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
                {mainLinks.map(link => (
                  <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`
                    }>{link.label}</NavLink>
                ))}
                <div className="pt-2">
                  <p className="px-4 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Services</p>
                  {serviceLinks.map(link => (
                    <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                          isActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-500 hover:text-white hover:bg-white/5'
                        }`
                      }>
                      <span style={{ color: link.accent }}>{link.icon}</span> {link.label}
                    </NavLink>
                  ))}
                </div>
                <div className="pt-3 pb-2 space-y-2">
                  <Link to="/staff-login" onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3.5 rounded-2xl text-sm font-semibold"
                    style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}>
                    <Contact size={15} /> Staff Portal
                  </Link>
                  {isLoggedIn ? (
                    <>
                      <Link to="/my-account" onClick={() => setIsOpen(false)}
                        className="block text-center py-3.5 rounded-2xl text-sm font-medium"
                        style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}>
                        My Account
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setIsOpen(false)}
                          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-semibold text-white"
                          style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)' }}>
                          <LayoutDashboard size={15} /> Dashboard
                        </Link>
                      )}
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)}
                        className="block text-center py-3.5 rounded-2xl text-sm font-medium"
                        style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}>Login</Link>
                      <Link to="/register" onClick={() => setIsOpen(false)}
                        className="block text-center py-3.5 rounded-2xl text-sm font-semibold text-white"
                        style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)' }}>Register</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}