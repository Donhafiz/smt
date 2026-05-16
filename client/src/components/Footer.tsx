import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Phone, Mail, MapPin, Clock, Send,
  MessageCircle, Heart, Shield, Zap, Star, Sparkles,
  ChevronRight, ChevronUp, ArrowUpRight, CheckCircle2,
  Facebook, Twitter, Instagram, Linkedin, Youtube
} from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 4000) }
  }

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook', gradient: 'from-blue-500 to-blue-700' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter', gradient: 'from-sky-400 to-sky-600' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram', gradient: 'from-pink-500 to-purple-600' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn', gradient: 'from-blue-600 to-blue-800' },
    { icon: <Youtube size={20} />, href: '#', label: 'YouTube', gradient: 'from-red-500 to-red-700' },
  ]

  const quickLinks = [
    { label: 'About', to: '/about' }, { label: 'Services', to: '/services' },
    { label: 'Training', to: '/training' }, { label: 'Shop', to: '/shop' },
    { label: 'Staff', to: '/staff' }, { label: 'Contact', to: '/contact' },
    { label: 'Careers', to: '/careers' }, { label: 'Partners', to: '/partners' },
    { label: 'Help', to: '/help' }, { label: 'FAQs', to: '/faqs' },
    { label: 'Privacy', to: '/privacy' }, { label: 'Terms', to: '/terms' },
  ]

  return (
    <footer className="relative bg-[#010510] border-t border-white/5 overflow-hidden">
      {/* Top Gradient Line */}
      <div className="h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        
        {/* ============================================ */}
        {/* MAIN GRID — LOGO + CONTACT + NEWSLETTER */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          
          {/* LEFT — LOGO + DESCRIPTION (5 columns) */}
          <div className="lg:col-span-5">
            {/* Logo + Name in One Line */}
            <Link to="/" className="inline-flex items-center gap-3.5 group mb-5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-cyan-500/20 group-hover:ring-cyan-500/40 transition-all">
                <img src="/smt-logo.png" alt="SMT" className="w-full h-full object-contain p-0.5" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight leading-none">
                  <span className="text-white">STAR</span>{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">MEDIA</span>{' '}
                  <span className="text-white">TECH</span>
                </h2>
                <p className="text-[9px] text-gray-500 tracking-widest uppercase mt-0.5">Premium Technology Institution</p>
              </div>
            </Link>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Star Media Tech is Ghana's premier technology institution, delivering world‑class 
              software development, IT training, consultancy, and commerce solutions since 2018. 
              Building Africa's digital future from Tamale.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { icon: <Star size={11} />, text: 'Best Tech Institute 2024', color: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' },
                { icon: <Shield size={11} />, text: 'ISO 9001 Certified', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
                { icon: <Zap size={11} />, text: 'Google Partner', color: 'bg-green-500/10 border-green-500/20 text-green-400' },
              ].map((badge, i) => (
                <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-medium ${badge.color}`}>
                  {badge.icon} {badge.text}
                </span>
              ))}
            </div>
          </div>

          {/* MIDDLE — CONTACT (3 columns) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-5">Contact</h4>
            <div className="space-y-3">
              {[
                { icon: <Phone size={15} />, label: 'Phone', value: '+233 559 137 611', href: 'tel:+233559137611' },
                { icon: <Mail size={15} />, label: 'Email', value: 'starmedia568@gmail.com', href: 'mailto:starmedia568@gmail.com' },
                { icon: <MapPin size={15} />, label: 'Location', value: 'Tamale, Ghana' },
                { icon: <Clock size={15} />, label: 'Hours', value: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <span className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-all flex-shrink-0">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-gray-300 hover:text-cyan-400 transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-sm text-gray-300">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — NEWSLETTER (4 columns) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-5">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">Get exclusive updates on courses, tech deals, and insights.</p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2">
              {subscribed ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex-1 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} /> Subscribed!
                </motion.div>
              ) : (
                <>
                  <div className="relative flex-1">
                    <Mail size={15} className="absolute left-3.5 top-3.5 text-gray-500" />
                    <input type="email" placeholder="your@email.com" value={email}
                      onChange={(e) => setEmail(e.target.value)} required
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" />
                  </div>
                  <button type="submit"
                    className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:scale-105 transition-all flex-shrink-0">
                    <Send size={16} />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* ============================================ */}
        {/* QUICK LINKS */}
        {/* ============================================ */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {quickLinks.map((link) => (
              <Link key={link.label} to={link.to}
                className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ============================================ */}
        {/* BOTTOM BAR — SOCIAL + WHATSAPP + COPYRIGHT */}
        {/* ============================================ */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            
            {/* Copyright */}
            <p className="text-xs text-gray-600 text-center md:text-left">
              © {currentYear} Star Media Tech. All rights reserved.{' '}
              <span className="inline-flex items-center gap-1">
                Made with <Heart size={10} className="text-red-400 fill-red-400 animate-pulse" /> in Ghana
              </span>
            </p>

            {/* Social + WhatsApp — Perfectly Aligned */}
            <div className="flex items-center gap-3">
              {/* Social Icons */}
              {socialLinks.map((social, i) => (
                <motion.a key={i} href={social.href} aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                  className={`p-2.5 rounded-xl bg-gradient-to-br ${social.gradient} text-white shadow-lg hover:shadow-xl transition-all`}>
                  {social.icon}
                </motion.a>
              ))}

              {/* Divider */}
              <div className="w-px h-7 bg-white/10 mx-1" />

              {/* WhatsApp */}
              <motion.a href="https://wa.me/233559137611" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-sm font-semibold hover:bg-green-500/30 transition-all shadow-lg shadow-green-500/10">
                <MessageCircle size={17} /> WhatsApp <ArrowUpRight size={13} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/30 hover:scale-110 transition-all group">
            <ChevronUp size={22} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}