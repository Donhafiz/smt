import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, Mail, MapPin, Clock, Send,
  MessageCircle, Heart, Shield, Zap, Star,
  ArrowUpRight, CheckCircle2,
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  ChevronUp, ArrowRight, Globe, Sparkles
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
interface FooterCol { title: string; links: { label: string; to: string }[] }

// ── Data ───────────────────────────────────────────────────────────────────
const footerCols: FooterCol[] = [
  {
    title: 'Services',
    links: [
      { label: 'Software Development', to: '/software' },
      { label: 'IT Training School', to: '/training' },
      { label: 'IT Consultancy', to: '/consultancy' },
      { label: 'Commerce Market', to: '/shop' },
      { label: 'All Services', to: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Staff', to: '/staff' },
      { label: 'Careers', to: '/careers' },
      { label: 'Partners', to: '/partners' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Centre', to: '/help' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Blog', to: '/blog' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
]

const socials = [
  { icon: <Facebook size={17} />, href: '#', label: 'Facebook', color: '#1877f2' },
  { icon: <Twitter size={17} />, href: '#', label: 'Twitter', color: '#1d9bf0' },
  { icon: <Instagram size={17} />, href: '#', label: 'Instagram', color: '#e1306c' },
  { icon: <Linkedin size={17} />, href: '#', label: 'LinkedIn', color: '#0a66c2' },
  { icon: <Youtube size={17} />, href: '#', label: 'YouTube', color: '#ff0000' },
]

const badges = [
  { icon: <Star size={11} />, text: 'Best Tech Institute 2024', theme: { bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.2)', color: '#eab308' } },
  { icon: <Shield size={11} />, text: 'ISO 9001 Certified', theme: { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', color: '#3b82f6' } },
  { icon: <Zap size={11} />, text: 'Google Partner', theme: { bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)', color: '#34d399' } },
]

const contactItems = [
  { icon: <Phone size={15} />, label: 'Phone', value: '+233 559 137 611', href: 'tel:+233559137611' },
  { icon: <Mail size={15} />, label: 'Email', value: 'starmedia568@gmail.com', href: 'mailto:starmedia568@gmail.com' },
  { icon: <MapPin size={15} />, label: 'Location', value: 'Tamale, Ghana', href: undefined },
  { icon: <Clock size={15} />, label: 'Hours', value: 'Mon–Fri 8AM–6PM · Sat 9AM–2PM', href: undefined },
]

// ── Back-to-top button ─────────────────────────────────────────────────────
function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 group p-3.5 rounded-2xl text-white shadow-2xl transition-all hover:scale-110 hover:-translate-y-1"
          style={{
            background: 'linear-gradient(135deg, #0891b2, #2563eb)',
            boxShadow: '0 8px 32px rgba(6,182,212,0.35)',
          }}
          aria-label="Back to top">
          <ChevronUp size={20} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ══════════════════════════════════════════════════════════════════════════
export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const year = new Date().getFullYear()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 900)) // Simulate API
    setLoading(false)
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 5000)
  }

  return (
    <>
      <style>{`
        :root { --font-display: 'Bricolage Grotesque', sans-serif; --font-body: 'DM Sans', sans-serif; }
        .font-display { font-family: var(--font-display); }
        .font-body { font-family: var(--font-body); }
        .footer-link {
          position: relative; display: inline-block; font-family: var(--font-body);
          font-size: 0.875rem; color: #64748b; transition: color 0.2s;
        }
        .footer-link::after {
          content: ''; position: absolute; bottom: -1px; left: 0; width: 0;
          height: 1px; background: #06b6d4; transition: width 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .footer-link:hover { color: #e2e8f0; }
        .footer-link:hover::after { width: 100%; }
        .social-btn {
          width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          color: #64748b; transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1); cursor: pointer;
        }
        .social-btn:hover { transform: translateY(-3px) scale(1.1); }
        @keyframes shimmer-line { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .shimmer-border {
          background: linear-gradient(90deg, rgba(6,182,212,0) 0%, rgba(6,182,212,0.6) 50%, rgba(167,139,250,0.6) 70%, rgba(6,182,212,0) 100%);
          background-size: 200% 100%;
          animation: shimmer-line 4s linear infinite;
        }
      `}</style>

      <BackToTop />

      <footer style={{ background: '#010410', fontFamily: 'var(--font-body, DM Sans, sans-serif)' }}>

        {/* ── Top shimmer line ──────────────────────────────────────────── */}
        <div className="h-[1.5px] shimmer-border" />

        {/* ── Newsletter banner ──────────────────────────────────────────── */}
        <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)', background: 'rgba(6,182,212,0.02)' }}>
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-cyan-400" />
                  <span className="font-body text-xs text-cyan-400 uppercase tracking-widest font-semibold">Newsletter</span>
                </div>
                <h3 className="font-display font-black text-white text-2xl leading-tight">
                  Stay ahead of the curve.
                </h3>
                <p className="font-body text-slate-500 text-sm mt-1">
                  Courses, tech deals, and insights — direct to your inbox.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2 min-w-[340px]">
                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div key="success"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex-1 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl font-body text-sm font-semibold"
                      style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399' }}>
                      <CheckCircle2 size={16} /> You're subscribed!
                    </motion.div>
                  ) : (
                    <motion.div key="form" className="flex flex-1 gap-2">
                      <div className="relative flex-1">
                        <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                          placeholder="your@email.com" required
                          className="w-full pl-10 pr-4 py-3.5 rounded-2xl font-body text-sm text-white placeholder-slate-600 outline-none transition-all"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                          onFocus={e => (e.target.style.borderColor = 'rgba(6,182,212,0.4)')}
                          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
                      </div>
                      <button type="submit" disabled={loading}
                        className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-body font-semibold text-sm text-white transition-all hover:scale-105 disabled:opacity-70"
                        style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)', boxShadow: '0 4px 20px rgba(6,182,212,0.25)' }}>
                        {loading
                          ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}><Send size={15} /></motion.div>
                          : <><Send size={15} /> Subscribe</>}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>

        {/* ── Main footer body ──────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">

            {/* Brand column */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-flex items-center gap-3 group mb-6">
                <div className="w-12 h-12 rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  style={{ border: '1px solid rgba(6,182,212,0.2)', background: 'rgba(6,182,212,0.05)' }}>
                  <img src="/smt-logo.png" alt="SMT" className="w-full h-full object-contain p-0.5" />
                </div>
                <div>
                  <p className="font-display text-xl font-black tracking-tight leading-none">
                    <span className="text-white">STAR </span>
                    <span style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MEDIA</span>
                    <span className="text-white"> TECH</span>
                  </p>
                  <p className="font-body text-[9px] text-slate-600 tracking-[0.2em] uppercase mt-0.5">Premium Technology Institution</p>
                </div>
              </Link>

              <p className="font-body text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
                Ghana's premier technology institution — delivering world-class software development, IT training, consultancy, and commerce since 2018. Building Africa's digital future from Tamale.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {badges.map((b, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-[11px] font-medium"
                    style={{ background: b.theme.bg, border: `1px solid ${b.theme.border}`, color: b.theme.color }}>
                    {b.icon} {b.text}
                  </span>
                ))}
              </div>

              {/* Contact */}
              <div className="space-y-3">
                {contactItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <span className="flex-shrink-0 p-2 rounded-lg transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: '#64748b' }}
                      // @ts-ignore
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.1)'; e.currentTarget.style.color = '#06b6d4' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#64748b' }}>
                      {item.icon}
                    </span>
                    <div>
                      <p className="font-body text-[10px] text-slate-700 uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-body text-sm text-slate-400 hover:text-cyan-400 transition-colors">{item.value}</a>
                      ) : (
                        <p className="font-body text-sm text-slate-400">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerCols.map((col, ci) => (
                <div key={ci}>
                  <p className="font-display font-bold text-white text-sm mb-5 tracking-tight">{col.title}</p>
                  <ul className="space-y-2.5">
                    {col.links.map((link, li) => (
                      <li key={li}>
                        <Link to={link.to} className="footer-link">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* WhatsApp + social */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {/* WhatsApp CTA */}
              <motion.a href="https://wa.me/233559137611" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 p-5 rounded-2xl font-body font-semibold text-sm transition-all"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
                <div className="p-2.5 rounded-xl" style={{ background: 'rgba(34,197,94,0.15)' }}>
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="font-display font-black text-white text-base">Chat on WhatsApp</p>
                  <p className="font-body text-xs text-green-600 mt-0.5">Typically replies in minutes</p>
                </div>
                <ArrowUpRight size={16} className="ml-auto text-green-600" />
              </motion.a>

              {/* Map location hint */}
              <div className="p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={14} className="text-cyan-400" />
                  <p className="font-body text-xs text-cyan-400 uppercase tracking-widest font-semibold">Reach Us</p>
                </div>
                <p className="font-display font-bold text-white text-sm">Tamale, Northern Region</p>
                <p className="font-body text-xs text-slate-500 mt-1">Ghana, West Africa</p>
                <a href="https://maps.google.com/?q=Tamale,+Ghana" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 font-body text-xs text-slate-500 hover:text-cyan-400 transition-colors">
                  View on Google Maps <ArrowRight size={11} />
                </a>
              </div>

              {/* Social icons */}
              <div>
                <p className="font-body text-[10px] text-slate-600 uppercase tracking-widest mb-3 font-semibold">Follow Us</p>
                <div className="flex gap-2.5">
                  {socials.map((s, i) => (
                    <motion.a key={i} href={s.href} aria-label={s.label}
                      whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}
                      className="social-btn"
                      // @ts-ignore
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = s.color
                        el.style.background = `${s.color}15`
                        el.style.borderColor = `${s.color}30`
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = '#64748b'
                        el.style.background = 'rgba(255,255,255,0.04)'
                        el.style.borderColor = 'rgba(255,255,255,0.07)'
                      }}>
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ─────────────────────────────────────────────── */}
          <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">

              {/* Copyright */}
              <p className="font-body text-xs text-slate-600 text-center md:text-left">
                © {year} Star Media Tech. All rights reserved.{' '}
                <span className="inline-flex items-center gap-1">
                  Made with <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" style={{ animationDuration: '1.5s' }} /> in Ghana.
                </span>
              </p>

              {/* Bottom links */}
              <div className="flex items-center gap-5">
                {[
                  { label: 'Privacy', to: '/privacy' },
                  { label: 'Terms', to: '/terms' },
                  { label: 'Cookies', to: '/cookies' },
                  { label: 'Sitemap', to: '/sitemap' },
                ].map((l, i) => (
                  <Link key={i} to={l.to} className="font-body text-[12px] text-slate-600 hover:text-slate-400 transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}