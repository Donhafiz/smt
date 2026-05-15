import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import { 
  Phone, Mail, MapPin, Clock, ArrowRight, Send,
  MessageCircle, Heart, Shield, Zap, Star, Sparkles,
  ChevronRight, Globe, Users, Award, Building2,
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  CheckCircle2, ChevronUp, Quote, ArrowUpRight
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
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  const footerLinks = {
    company: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Team', to: '/staff' },
      { label: 'Careers', to: '/careers' },
      { label: 'Press & Media', to: '/press' },
      { label: 'Partners', to: '/partners' },
    ],
    services: [
      { label: 'IT Training', to: '/training' },
      { label: 'Consultancy', to: '/consultancy' },
      { label: 'Software Products', to: '/software' },
      { label: 'Commerce Market', to: '/shop' },
      { label: 'AI Solutions', to: '/consultancy' },
    ],
    support: [
      { label: 'Help Center', to: '/help' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Track Order', to: '/track-order' },
      { label: 'Shipping Info', to: '/shipping' },
    ],
    legal: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Cookie Policy', to: '/cookies' },
      { label: 'Refund Policy', to: '/refunds' },
    ],
  }

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook', gradient: 'from-blue-500 to-blue-700' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter', gradient: 'from-sky-400 to-sky-600' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram', gradient: 'from-pink-500 to-purple-600' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn', gradient: 'from-blue-600 to-blue-800' },
    { icon: <Youtube size={20} />, href: '#', label: 'YouTube', gradient: 'from-red-500 to-red-700' },
  ]

  return (
    <footer className="relative bg-[#010510] border-t border-white/5 overflow-hidden">
      {/* Animated top line */}
      <div className="relative h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-pulse" />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12">
        {/* Top Section - Logo + Social */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-16">
          {/* Logo & Description */}
          <div className="max-w-md">
            <Logo size="lg" />
            <p className="text-gray-400 mt-4 leading-relaxed">
              Star Media Tech is Ghana's premier technology institution, delivering world-class software development, IT training, consultancy, and commerce solutions since 2018.
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { icon: <Star size={12} />, text: 'Best Tech Institute 2024', color: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' },
                { icon: <Shield size={12} />, text: 'ISO 9001 Certified', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
                { icon: <Zap size={12} />, text: 'Google Partner', color: 'bg-green-500/10 border-green-500/20 text-green-400' },
              ].map((badge, i) => (
                <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs ${badge.color}`}>
                  {badge.icon} {badge.text}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                aria-label={social.label}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-2xl bg-gradient-to-br ${social.gradient} text-white shadow-lg hover:shadow-xl transition-all`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Newsletter - Full Width Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/15 border border-white/10 p-8 md:p-10 mb-16"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Newsletter</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Get Exclusive Insights
              </h3>
              <p className="text-gray-400 mt-2 max-w-md">
                Join 5,000+ subscribers receiving tech tips, course updates, and exclusive offers.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full md:w-auto">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-8 py-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-400 flex items-center gap-2 font-medium"
                >
                  <CheckCircle2 size={20} />
                  Welcome aboard! 🎉
                </motion.div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-4 text-gray-500" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 w-full sm:w-80 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20"
                  >
                    Subscribe
                    <Send size={16} />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Stats inside newsletter card */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/10">
            {[
              { value: '350+', label: 'Projects Delivered' },
              { value: '1,200+', label: 'Students Trained' },
              { value: '50+', label: 'Trusted Partners' },
              { value: '15+', label: 'Countries Reached' },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
              <Phone size={14} className="text-cyan-400" /> Contact
            </h4>
            <div className="space-y-4">
              <a href="tel:+233559137611" className="flex items-start gap-3 group">
                <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-all mt-0.5">
                  <Phone size={14} />
                </span>
                <div>
                  <p className="text-sm text-white group-hover:text-cyan-400 transition-colors">+233 559 137 611</p>
                  <p className="text-xs text-gray-600">Sales & Support</p>
                </div>
              </a>
              <a href="mailto:starmedia568@gmail.com" className="flex items-start gap-3 group">
                <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-all mt-0.5">
                  <Mail size={14} />
                </span>
                <div>
                  <p className="text-sm text-white group-hover:text-blue-400 transition-colors">starmedia568@gmail.com</p>
                  <p className="text-xs text-gray-600">Email Us</p>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 mt-0.5">
                  <MapPin size={14} />
                </span>
                <div>
                  <p className="text-sm text-white">Tamale, Ghana</p>
                  <p className="text-xs text-gray-600">Visit Our Office</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="p-2.5 rounded-xl bg-green-500/10 text-green-400 mt-0.5">
                  <Clock size={14} />
                </span>
                <div>
                  <p className="text-sm text-white">Mon - Fri: 8AM - 6PM</p>
                  <p className="text-xs text-gray-600">Sat: 9AM - 2PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 hover:text-cyan-400 transition-all flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-4 transition-all overflow-hidden text-cyan-400">
                        <ArrowRight size={12} />
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600">
                © {currentYear} Star Media Tech. All rights reserved.
              </p>
              <p className="text-xs text-gray-700 mt-1 flex items-center justify-center md:justify-start gap-1">
                Made with <Heart size={10} className="text-red-400 fill-red-400 animate-pulse" /> in Ghana • Powered by Innovation
              </p>
            </div>

            {/* WhatsApp + Quote */}
            <div className="flex flex-col items-center gap-3">
              <a
                href="https://wa.me/233559137611"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-400 text-sm font-semibold hover:bg-green-500/30 transition-all shadow-lg shadow-green-500/10"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/30 hover:scale-110 transition-all group"
          >
            <ChevronUp size={22} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}