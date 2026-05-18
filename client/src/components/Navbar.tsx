import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useTranslation } from 'react-i18next'
import {
  Menu, X, ShoppingCart, ChevronDown,
  GraduationCap, Briefcase, Monitor, ShoppingBag,
  Search, User, Contact, Wrench, Globe, ArrowRight,
  Command, Cpu, Database, Code2, X as XIcon
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

        {/* Input row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <Search size={18} className="text-slate-500 flex-shrink-0" />
          <input ref={inputRef} type="text"
            placeholder="Search products, courses, services…"
            className="flex-1 bg-transparent text-white placeholder-slate-600 text-[15px] outline-none"
            style={{ fontFamily: 'var(--font-body, DM Sans, sans-serif)' }} />
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 transition-all">
            <XIcon size={16} className="text-slate-500" />
          </button>
        </div>

        {/* Quick links */}
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

        {/* Footer hint */}
        <div className="px-5 py-3 border-t flex items-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] text-slate-600 bg-white/5 border border-white/10">ESC</kbd>
          <span className="text-[11px] text-slate-600">to close</span>
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
  const [scrollingUp, setScrollingUp] = useState(true)
  const [hidden, setHidden] = useState(false)
  const isLoggedIn = !!localStorage.getItem('token')
  const { items } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const servicesRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)
  const { t, i18n } = useTranslation()

  const lastScrollY = useRef(0)
  const cartCount = items.reduce((s: number, i: any) => s + (i.quantity || 1), 0)

  // ── Scroll behaviour ─────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setScrollingUp(y < lastScrollY.current)
      setHidden(y > 80 && y > lastScrollY.current)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Close on route change ─────────────────────────────────────────────
  useEffect(() => { setIsOpen(false); setServicesOpen(false); setLangOpen(false) }, [location])

  // ── Close dropdowns on outside click ─────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false)
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ── Keyboard shortcut: / or Cmd+K → search ──────────────────────────
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
        :root { --font-display: 'Bricolage Grotesque', sans-serif; --font-body: 'DM Sans', sans-serif; }
        .font-display { font-family: var(--font-display); }
        .font-body { font-family: var(--font-body); }
        .nav-link-underline::after {
          content: ''; position: absolute; bottom: -1px; left: 50%; right: 50%;
          height: 2px; background: linear-gradient(90deg, #06b6d4, #3b82f6);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); border-radius: 2px;
        }
        .nav-link-underline:hover::after,
        .nav-link-active::after { left: 10%; right: 10%; }
        .glass-dropdown {
          background: rgba(10, 15, 35, 0.97);
          backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(6,182,212,0.05);
        }
        .icon-btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0.55rem; border-radius: 0.6rem; color: #94a3b8;
          background: transparent; border: 1px solid transparent;
          transition: all 0.2s; cursor: pointer;
        }
        .icon-btn:hover { color: #fff; background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.08); }
      `}</style>

      {/* Search modal overlay */}
      <AnimatePresence>{searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}</AnimatePresence>

      <motion.nav
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="sticky top-0 z-50"
        style={{
          background: scrolled ? 'rgba(2,6,23,0.95)' : 'rgba(2,6,23,0.7)',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(12px)',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.03)',
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
          transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
        }}>

        {/* Top accent line */}
        <div style={{ height: '1.5px', background: 'linear-gradient(90deg, transparent, #06b6d4 30%, #3b82f6 60%, #a78bfa 80%, transparent)' }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between" style={{ height: 68 }}>

            {/* ── LOGO ─────────────────────────────────────────────── */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                style={{ border: '1px solid rgba(6,182,212,0.2)', background: 'rgba(6,182,212,0.05)' }}>
                <img src="/smt-logo.png" alt="SMT" className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="hidden sm:block leading-none">
                <p className="font-display text-[1.05rem] font-black tracking-tight leading-none">
                  <span className="text-white">STAR </span>
                  <span style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MEDIA</span>
                  <span className="text-white"> TECH</span>
                </p>
                <p className="font-body text-[9px] text-slate-600 tracking-[0.2em] uppercase mt-0.5">Premium Tech Institution</p>
              </div>
            </Link>

            {/* ── DESKTOP NAV ──────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {mainLinks.map(link => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative nav-link-underline font-body font-medium text-[13px] px-3.5 py-2 rounded-lg transition-all duration-200 ${
                      isActive ? 'text-cyan-400 nav-link-active' : 'text-slate-400 hover:text-white'
                    }`
                  }>
                  {link.label}
                </NavLink>
              ))}

              {/* Services dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  onClick={() => setServicesOpen(p => !p)}
                  className={`relative nav-link-underline font-body font-medium text-[13px] px-3.5 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    servicesOpen ? 'text-cyan-400 nav-link-active' : 'text-slate-400 hover:text-white'
                  }`}>
                  Services
                  <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={12} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      onMouseLeave={() => setServicesOpen(false)}
                      className="glass-dropdown absolute top-full mt-3 left-0 w-72 rounded-2xl p-2 overflow-hidden z-50">

                      {/* Glow accent */}
                      <div className="absolute top-0 left-0 right-0 h-[1px]"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)' }} />

                      {serviceLinks.map((link, i) => (
                        <NavLink key={link.to} to={link.to} onClick={() => setServicesOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${
                              isActive ? 'bg-cyan-500/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`
                          }>
                          {({ isActive }) => (
                            <>
                              <span className="flex-shrink-0 p-2 rounded-lg transition-all duration-200"
                                style={{ background: isActive ? `${link.accent}20` : 'rgba(255,255,255,0.04)', color: isActive ? link.accent : '#64748b' }}>
                                {link.icon}
                              </span>
                              <div className="min-w-0">
                                <p className="font-display font-bold text-sm leading-tight">{link.label}</p>
                                <p className="font-body text-[11px] text-slate-600 truncate">{link.desc}</p>
                              </div>
                              <ArrowRight size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-slate-500" />
                            </>
                          )}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* ── RIGHT ACTIONS ─────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-1">

              {/* Search button */}
              <button onClick={() => setSearchOpen(true)} className="icon-btn group" title="Search (⌘K)">
                <Search size={16} />
              </button>

              {/* Language */}
              <div className="relative" ref={langRef}>
                <button onClick={() => setLangOpen(p => !p)} className="icon-btn gap-1.5 px-2.5 font-body text-[13px] font-medium">
                  <span>{currentLang.flag}</span>
                  <span className="text-slate-400">{currentLang.label}</span>
                  <ChevronDown size={11} className="text-slate-600" />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="glass-dropdown absolute top-full mt-2 right-0 w-32 rounded-xl p-1.5 z-50">
                      {langs.map(l => (
                        <button key={l.code} onClick={() => { i18n.changeLanguage(l.code); localStorage.setItem('smt-language', l.code); setLangOpen(false) }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-body transition-all ${
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
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-4.5 h-4.5 flex items-center justify-center rounded-full text-[9px] font-black text-white"
                      style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', width: 18, height: 18 }}>
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Staff portal */}
              <Link to="/staff-login"
                className="ml-1 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-body font-semibold text-[12px] transition-all"
                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}>
                <Contact size={13} /> Staff
              </Link>

              {/* Auth */}
              {isLoggedIn ? (
                <Link to="/admin"
                  className="ml-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-body font-semibold text-[13px] text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)', boxShadow: '0 4px 20px rgba(6,182,212,0.25)' }}>
                  <User size={14} /> Dashboard
                </Link>
              ) : (
                <div className="flex items-center gap-1.5 ml-1">
                  <Link to="/login"
                    className="px-4 py-2 rounded-xl font-body font-medium text-[13px] text-slate-300 hover:text-white transition-all hover:bg-white/5"
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    Login
                  </Link>
                  <Link to="/register"
                    className="px-4 py-2 rounded-xl font-body font-semibold text-[13px] text-white transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)', boxShadow: '0 4px 20px rgba(6,182,212,0.25)' }}>
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* ── MOBILE ACTIONS ────────────────────────────────────── */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link to="/cart" className="icon-btn relative">
                <ShoppingCart size={17} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-[18px] h-[18px] flex items-center justify-center rounded-full text-[9px] font-black text-white"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>
                    {cartCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsOpen(p => !p)}
                className="icon-btn"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <AnimatePresence mode="wait">
                  <motion.span key={isOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}>
                    {isOpen ? <X size={17} /> : <Menu size={17} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ───────────────────────────────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(2,6,23,0.98)', backdropFilter: 'blur(24px)' }}>

              <div className="px-5 py-4 space-y-1 max-h-[75vh] overflow-y-auto">

                {/* Main links */}
                {mainLinks.map((link, i) => (
                  <motion.div key={link.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}>
                    <NavLink to={link.to} end={link.to === '/'} onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl font-body text-sm font-medium transition-all ${
                          isActive
                            ? 'text-cyan-400 bg-cyan-500/10'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`
                      }>
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Services section */}
                <div className="pt-2">
                  <p className="px-4 py-2 font-body text-[10px] font-bold text-slate-600 uppercase tracking-widest">Services</p>
                  {serviceLinks.map((link, i) => (
                    <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm transition-all ${
                          isActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-500 hover:text-white hover:bg-white/5'
                        }`
                      }>
                      <span style={{ color: link.accent }}>{link.icon}</span>
                      <span>{link.label}</span>
                    </NavLink>
                  ))}
                </div>

                {/* Language switcher */}
                <div className="pt-2">
                  <p className="px-4 py-2 font-body text-[10px] font-bold text-slate-600 uppercase tracking-widest">Language</p>
                  <div className="flex gap-2 px-4">
                    {langs.map(l => (
                      <button key={l.code}
                        onClick={() => { i18n.changeLanguage(l.code); localStorage.setItem('smt-language', l.code) }}
                        className="px-4 py-2 rounded-xl font-body text-sm font-medium transition-all"
                        style={{
                          background: i18n.language === l.code ? 'rgba(6,182,212,0.1)' : 'rgba(255,255,255,0.04)',
                          border: i18n.language === l.code ? '1px solid rgba(6,182,212,0.3)' : '1px solid rgba(255,255,255,0.06)',
                          color: i18n.language === l.code ? '#06b6d4' : '#94a3b8',
                        }}>
                        {l.flag} {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auth actions */}
                <div className="pt-3 pb-2 space-y-2">
                  <Link to="/staff-login" onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3.5 rounded-2xl font-body text-sm font-semibold"
                    style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}>
                    <Contact size={15} /> Staff Portal
                  </Link>
                  {isLoggedIn ? (
                    <Link to="/admin" onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-body text-sm font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)' }}>
                      <User size={15} /> Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)}
                        className="block text-center py-3.5 rounded-2xl font-body text-sm font-medium text-slate-300"
                        style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                        Login
                      </Link>
                      <Link to="/register" onClick={() => setIsOpen(false)}
                        className="block text-center py-3.5 rounded-2xl font-body text-sm font-semibold text-white"
                        style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)', boxShadow: '0 4px 20px rgba(6,182,212,0.2)' }}>
                        Register — It's Free
                      </Link>
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