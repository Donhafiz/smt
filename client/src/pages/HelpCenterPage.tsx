import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HelpCircle, Search, BookOpen, MessageCircle, Phone, Mail,
  ChevronRight, ChevronDown, ChevronUp, Star, Shield,
  FileText, Wrench, ShoppingCart, GraduationCap, CreditCard,
  Truck, ArrowRight, Sparkles, Zap, Clock
} from 'lucide-react'

export default function HelpCenterPage() {
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Topics', icon: <BookOpen size={16} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={16} /> },
    { id: 'courses', label: 'Courses', icon: <GraduationCap size={16} /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard size={16} /> },
    { id: 'technical', label: 'Technical', icon: <Wrench size={16} /> },
  ]

  const faqs = [
    { 
      q: 'How do I enroll in a course?', 
      a: 'Browse our Training page, select a course, click "Enroll Now", complete payment via Paystack, and you\'ll get instant access to all course materials.',
      category: 'courses'
    },
    { 
      q: 'What payment methods do you accept?', 
      a: 'We accept Mobile Money (MTN, Vodafone, AirtelTigo), Visa/Mastercard bank cards, and bank transfers — all processed securely through Paystack.',
      category: 'payment'
    },
    { 
      q: 'How long does delivery take?', 
      a: 'Standard delivery: 3-5 business days. Express delivery: 1-2 business days. Free delivery on orders over GHS 5,000.',
      category: 'orders'
    },
    { 
      q: 'Can I get a refund for a course?', 
      a: 'Yes! You can request a refund within 48 hours of purchase if you haven\'t accessed any course content. See our Refund Policy for details.',
      category: 'payment'
    },
    { 
      q: 'How do I track my order?', 
      a: 'Visit the Track Order page and enter your order ID. You\'ll see real-time status updates on your delivery.',
      category: 'orders'
    },
    { 
      q: 'Do I get a certificate after completing a course?', 
      a: 'Absolutely! Once you complete all lessons and the final assessment, you can generate and download your certificate instantly.',
      category: 'courses'
    },
    { 
      q: 'I forgot my password. How do I reset it?', 
      a: 'Click "Forgot password?" on the login page, enter your email, and we\'ll send you reset instructions immediately.',
      category: 'technical'
    },
    { 
      q: 'How do I become a vendor?', 
      a: 'Go to the Vendor Registration page, fill in your business details, and our team will review your application within 48 hours.',
      category: 'technical'
    },
  ]

  const filteredFaqs = activeCategory === 'all' 
    ? faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()))
    : faqs.filter(f => f.category === activeCategory && f.q.toLowerCase().includes(search.toLowerCase()))

  const helpCards = [
    { icon: <MessageCircle size={28} />, title: 'Live Chat', desc: 'Chat with our AI assistant', action: 'Open Chat', color: 'from-cyan-500 to-blue-600' },
    { icon: <Phone size={28} />, title: 'Call Us', desc: '+233 559 137 611', action: 'Call Now', color: 'from-green-500 to-emerald-600', href: 'tel:+233559137611' },
    { icon: <Mail size={28} />, title: 'Email Support', desc: 'starmedia568@gmail.com', action: 'Send Email', color: 'from-purple-500 to-pink-600', href: 'mailto:starmedia568@gmail.com' },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-sm text-gray-400">We're here to help</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Help Center
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers, get support, and make the most of Star Media Tech
          </p>
        </motion.div>

        {/* Help Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {helpCards.map((card, i) => (
            <motion.a key={i} href={card.href || '#'}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-6 text-center hover:scale-[1.02] transition-all group cursor-pointer`}>
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.color} mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-white">{card.icon}</span>
              </div>
              <h3 className="font-bold text-lg mb-1">{card.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{card.desc}</p>
              <span className="text-cyan-400 text-sm font-semibold flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                {card.action} <ArrowRight size={14} />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search size={20} className="absolute left-5 top-4 text-gray-500" />
          <input type="text" placeholder="Search for answers..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-lg" />
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === cat.id ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p>No results found. Try a different search.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="glass rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-all">
                  <div className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-cyan-400 flex-shrink-0" />
                    <span className="font-medium">{faq.q}</span>
                  </div>
                  {openFaq === i ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-gray-400 text-sm leading-relaxed pl-14">
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Still Need Help */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-10 text-center mt-16">
          <Star size={40} className="text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-gray-400 mb-6">Our support team is ready to assist you</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:scale-105 transition-all">
              Contact Support
            </Link>
            <a href="https://wa.me/233559137611" target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 border border-green-500/30 rounded-xl text-green-400 font-semibold hover:bg-green-500/10 transition-all flex items-center justify-center gap-2">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}