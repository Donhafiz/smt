import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TrustBar from '../components/TrustBar'
import { usePersonalization } from '../hooks/usePersonalization'
import { useTranslation } from 'react-i18next'
import { 
  Monitor, GraduationCap, Briefcase, ShoppingCart,
  Shield, Zap, Users, Globe, ArrowRight, CheckCircle2,
  Star, TrendingUp, Clock, BarChart3, Sparkles,
  ChevronRight, Award, Cloud, Lock, Code
} from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('checking')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const { t } = useTranslation()
  // ✅ Hook inside the component
  const { getRecommendations, trackInterest, profile } = usePersonalization()
  
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)

    fetch('/health')
      .then(res => res.json())
      .then(() => setStatus('online'))
      .catch(() => setStatus('offline'))

    fetch('/api/products').then(r => r.json()).then(d => setProducts(d || [])).catch(() => {})
    fetch('/api/courses').then(r => r.json()).then(d => setCourses(d || [])).catch(() => {})
  }, [])

  const handlePrimaryAction = () => {
    if (isLoggedIn) navigate('/admin')
    else navigate('/login')
  }

  const coreUnits = [
    {
      icon: <Code size={32} />,
      title: 'Software Development',
      desc: 'Custom websites, mobile apps, and enterprise systems built with cutting-edge technology.',
      features: ['Web Development', 'Mobile Apps', 'Enterprise Systems', 'API Development', 'UI/UX Design', 'Maintenance'],
      gradient: 'from-cyan-500 to-blue-600',
      link: '/software'
    },
    {
      icon: <GraduationCap size={32} />,
      title: 'IT Training School',
      desc: 'Professional IT courses with mentorship and certification from industry experts.',
      features: ['Web Development', 'Cybersecurity', 'Data Science', 'AI/ML', 'Networking', 'Graphic Design'],
      gradient: 'from-purple-500 to-pink-600',
      link: '/training'
    },
    {
      icon: <Briefcase size={32} />,
      title: 'IT Consultancy',
      desc: 'Strategic technology advisory, digital transformation, and security audits.',
      features: ['Cloud Solutions', 'Security Audits', 'Digital Strategy', 'Infrastructure', 'Support', 'Training'],
      gradient: 'from-orange-500 to-red-600',
      link: '/consultancy'
    },
    {
      icon: <ShoppingCart size={32} />,
      title: 'Commerce Market',
      desc: 'Premium laptops, phones, accessories, and gadgets with fast delivery across Ghana.',
      features: ['Laptops', 'Smartphones', 'Accessories', 'Gadgets', 'Networking', 'Software'],
      gradient: 'from-green-500 to-emerald-600',
      link: '/shop'
    },
  ]

  const features = [
    { icon: <Shield size={28} />, title: 'Enterprise Security', desc: 'End-to-end encryption and data protection.', bullets: ['AES-256 Encryption', 'JWT Authentication', 'Role-Based Access', 'Audit Logging'] },
    { icon: <BarChart3 size={28} />, title: 'Real-Time Analytics', desc: 'Live dashboards and exportable reports.', bullets: ['Live Tracking', 'Custom Reports', 'Data Export', 'Performance Metrics'] },
    { icon: <Cloud size={28} />, title: 'Multi-Tenant Platform', desc: 'Complete data isolation per organization.', bullets: ['Data Isolation', 'Custom Branding', 'Role-Based Access', 'Auto-Scaling'] },
    { icon: <Lock size={28} />, title: 'Full Transparency', desc: 'Complete audit trail and verification.', bullets: ['Audit Ledger', 'Verification', 'Public Reports', 'Signed Receipts'] },
    { icon: <Zap size={28} />, title: 'Up in Minutes', desc: 'Quick-start wizard gets you live fast.', bullets: ['Quick Setup', 'CSV Import', 'Templates', 'No Code Required'] },
    { icon: <Clock size={28} />, title: 'Automated Workflows', desc: 'Schedule tasks and auto-notifications.', bullets: ['Scheduled Tasks', 'Auto Updates', 'Email/SMS Alerts', 'Backup Automation'] },
  ]

  const testimonials = [
    { quote: 'SMT transformed our business with a stunning website and ERP system.', author: 'Sarah L.', role: 'CEO, TechNova Ltd.' },
    { quote: 'The IT training gave me a job in cybersecurity within 3 months!', author: 'Kwame A.', role: 'Graduate 2024' },
    { quote: 'Reliable consultancy that saved us thousands in infrastructure costs.', author: 'David M.', role: 'CTO, FinServ Ghana' },
  ]

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#020617] overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="absolute inset-0 overflow-hidden opacity-15">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#020617]/70 to-[#020617]" />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center max-w-5xl">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'online' ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
            </span>
            <span className="text-sm text-gray-400">Platform {status === 'online' ? 'Live' : 'Offline'}</span>
          </motion.div>
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            <span className="text-white">{t('welcome')}</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              {t('tagline')}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-gray-400 leading-relaxed">
            {t('heroDescription')}
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed">
            {t('heroSubdescription')}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handlePrimaryAction}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold text-lg shadow-2xl shadow-cyan-500/25 flex items-center gap-2">
              {isLoggedIn ? t('dashboard') : t('getStarted')}<ArrowRight size={20} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/services')}
              className="px-8 py-4 border border-white/20 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center gap-2">
              {t('exploreServices')}<ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <TrustBar />

      {/* ✅ AI PERSONALIZED BANNER — Now inside the component */}
      {profile && profile.visitCount > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto px-6 py-4">
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-cyan-400 text-sm">👋 Welcome back! {getRecommendations()}</p>
          </div>
        </motion.div>
      )}

      {/* CORE UNITS */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-3">What We Offer</p>
            <h2 className="text-4xl md:text-6xl font-black text-white">Our Core Units</h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">Four interconnected divisions powering digital transformation across Africa</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {coreUnits.map((unit, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }} onClick={() => navigate(unit.link)}
                className={`group relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-white/10 transition-all cursor-pointer overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${unit.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${unit.gradient} mb-6`}>{unit.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{unit.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{unit.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {unit.features.slice(0, 4).map((feat, j) => (
                    <span key={j} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/5">{feat}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="relative py-20 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Everything you need</h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">Secure, transparent, and scalable.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-6 hover:border-white/10 transition-all">
                <div className="text-cyan-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-gray-500"><CheckCircle2 size={12} className="text-green-400" /> {bullet}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO TESTIMONIALS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white">What Our Students Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Kwame A.', role: 'Cybersecurity Graduate', thumbnail: '🎓', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
              { name: 'Ama S.', role: 'Web Development Student', thumbnail: '💻', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face' },
              { name: 'David M.', role: 'CTO, FinServ Ghana', thumbnail: '🏢', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop&crop=face' },
            ].map((testimonial, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="glass rounded-2xl overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEXT TESTIMONIALS */}
      <section className="relative py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-4xl font-black text-white mb-12">Trusted by Organizations</h2>
          <div className="relative h-40">
            {testimonials.map((t, idx) => (
              <motion.div key={idx} initial={{ opacity: 0 }}
                animate={{ opacity: idx === currentTestimonial ? 1 : 0, y: idx === currentTestimonial ? 0 : 10 }}
                transition={{ duration: 0.5 }} className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl md:text-2xl text-gray-300 italic leading-relaxed">"{t.quote}"</p>
                <p className="mt-4 text-white font-semibold">{t.author}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentTestimonial(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentTestimonial ? 'bg-cyan-400 w-8' : 'bg-gray-600'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 p-10 md:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to Start?</h2>
              <p className="text-gray-400 text-lg mb-8">Join thousands of students and businesses who trust Star Media Tech.</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/register')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold text-lg shadow-2xl shadow-cyan-500/25">
                Get Started Free
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}