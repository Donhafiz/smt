import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { 
  Phone, Mail, MapPin, Clock, ArrowRight, Send,
  Facebook, Twitter, Instagram, Linkedin, Youtube, Github,
  MessageCircle, Heart, Shield, Zap, Star, Sparkles,
  ChevronRight, Globe, Users, Award, Building2
} from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Team', to: '/staff' },
      { label: 'Careers', to: '/careers' },
      { label: 'Press & Media', to: '/press' },
      { label: 'Partners', to: '/partners' },
    ],
    services: [
      { label: 'All Services', to: '/services' },
      { label: 'IT Training', to: '/training' },
      { label: 'Consultancy & AI', to: '/consultancy' },
      { label: 'Software Products', to: '/software' },
      { label: 'Commerce Market', to: '/shop' },
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

  const stats = [
    { value: '350+', label: 'Projects', icon: <Award size={16} /> },
    { value: '1,200+', label: 'Students', icon: <Users size={16} /> },
    { value: '50+', label: 'Partners', icon: <Building2 size={16} /> },
    { value: '15+', label: 'Countries', icon: <Globe size={16} /> },
  ]

  const socialLinks = [
    { icon: <Facebook size={18} />, href: '#', label: 'Facebook', color: 'hover:text-blue-500 hover:bg-blue-500/10' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter', color: 'hover:text-sky-400 hover:bg-sky-500/10' },
    { icon: <Instagram size={18} />, href: '#', label: 'Instagram', color: 'hover:text-pink-500 hover:bg-pink-500/10' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600 hover:bg-blue-600/10' },
    { icon: <Youtube size={18} />, href: '#', label: 'YouTube', color: 'hover:text-red-500 hover:bg-red-500/10' },
    { icon: <Github size={18} />, href: '#', label: 'GitHub', color: 'hover:text-purple-400 hover:bg-purple-500/10' },
  ]

  const awards = [
    { icon: <Star size={14} />, text: 'Best Tech Institute 2024' },
    { icon: <Shield size={14} />, text: 'ISO 9001 Certified' },
    { icon: <Zap size={14} />, text: 'Google Partner' },
  ]

  return (
    <footer className="relative bg-[#020617] border-t border-white/5">
      {/* Top Gradient Line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 p-8 md:p-12">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">
                <Sparkles className="inline-block w-6 h-6 text-cyan-400 mr-2" />
                Stay Ahead with SMT
              </h3>
              <p className="text-gray-400 mt-2 max-w-md">
                Get exclusive updates on new courses, tech deals, and industry insights.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 flex items-center gap-2"
                >
                  <Send size={16} />
                  Subscribed successfully!
                </motion.div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 w-full md:w-64 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight size={16} />
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Stats Row */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-cyan-400 mb-1 flex justify-center">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Logo size="md" />
            <p className="text-gray-400 text-sm mt-4 leading-relaxed max-w-xs">
              Premium technology institution delivering cutting-edge software, 
              IT training, consultancy, and commerce solutions across Africa.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a href="tel:+233559137611" className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-colors group">
                <span className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all">
                  <Phone size={14} className="text-cyan-400" />
                </span>
                +233 559 137 611
              </a>
              <a href="mailto:starmedia568@gmail.com" className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-colors group">
                <span className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all">
                  <Mail size={14} className="text-cyan-400" />
                </span>
                starmedia568@gmail.com
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span className="p-2 rounded-lg bg-cyan-500/10">
                  <MapPin size={14} className="text-cyan-400" />
                </span>
                Tamale, Ghana
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span className="p-2 rounded-lg bg-cyan-500/10">
                  <Clock size={14} className="text-cyan-400" />
                </span>
                Mon - Fri: 8AM - 6PM
              </div>
            </div>

            {/* Awards */}
            <div className="mt-6 flex flex-wrap gap-2">
              {awards.map((award, i) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs">
                  {award.icon}
                  {award.text}
                </span>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-600">
              © {currentYear} Star Media Tech. All rights reserved. 
              <span className="mx-2">|</span>
              Made with <Heart size={12} className="inline text-red-400 fill-red-400 animate-pulse" /> in Ghana
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-1">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-2 rounded-lg text-gray-500 transition-all duration-200 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/233559137611"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-sm hover:bg-green-500/30 transition-all"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Floating Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 backdrop-blur-sm transition-all shadow-lg"
      >
        <ArrowRight size={20} className="rotate-[-90deg]" />
      </button>
    </footer>
  )
}