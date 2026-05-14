import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Monitor, GraduationCap, Briefcase, ShoppingCart,
  Star, Users, Zap, ShieldCheck, ArrowRight, ChevronRight,
  CheckCircle, TrendingUp, Award, Clock
} from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('checking')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)

    fetch('/health')
      .then(res => res.json())
      .then(() => setStatus('online'))
      .catch(() => setStatus('offline'))
  }, [])

  const handlePrimaryAction = () => {
    if (isLoggedIn) {
      navigate('/admin')
    } else {
      navigate('/login')
    }
  }

  const stats = [
    { label: 'Students Trained', value: '1,200+', icon: <Users size={24} /> },
    { label: 'Projects Delivered', value: '350+', icon: <Award size={24} /> },
    { label: 'Years Experience', value: '8+', icon: <Clock size={24} /> },
    { label: 'Client Countries', value: '15+', icon: <TrendingUp size={24} /> },
  ]

  const coreUnits = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: 'Software Development',
      desc: 'Custom websites, mobile apps, and enterprise systems built with cutting‑edge technology.',
      features: ['Web Development', 'Mobile Apps', 'Enterprise Systems', 'API Development']
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'IT Training School',
      desc: 'Professional IT and programming courses with certification and mentorship programs.',
      features: ['Web Development', 'Cybersecurity', 'Data Analysis', 'AI Fundamentals']
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'IT Consultancy',
      desc: 'Strategic technology advisory, digital transformation, and security audits.',
      features: ['Business IT Setup', 'Cloud Solutions', 'Security Audits', 'Digital Strategy']
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Commerce Market',
      desc: 'Premium laptops, phones, accessories, and gadgets with fast delivery.',
      features: ['Laptops', 'Phones', 'Accessories', 'Smart Devices']
    },
  ]

  const whyChoose = [
    { icon: <Zap className="w-6 h-6" />, title: 'Innovation First', desc: 'AI‑powered solutions for modern challenges.' },
    { icon: <Users className="w-6 h-6" />, title: 'Expert Team', desc: 'Certified professionals with industry experience.' },
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'Reliable & Secure', desc: 'Enterprise‑grade security and 24/7 support.' },
    { icon: <Star className="w-6 h-6" />, title: 'Proven Results', desc: '350+ successful projects and counting.' },
  ]

  const testimonials = [
    { quote: 'SMT transformed our business with a stunning website and ERP system.', author: 'Sarah L., CEO' },
    { quote: 'The IT training gave me a job in cybersecurity within 3 months.', author: 'Kwame A., Graduate' },
    { quote: 'Reliable consultancy that saved us thousands in infrastructure costs.', author: 'TechNova Ltd.' },
  ]

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-50 text-sm px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg flex items-center gap-2"
      >
        <span className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
        System: {status === 'online' ? 'Live' : 'Offline'}
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            STAR MEDIA TECH
          </h1>
          <p className="mt-6 max-w-3xl text-gray-300 text-lg md:text-2xl font-light leading-relaxed">
            A premium technology institution delivering software development,
            IT training, consultancy services, and modern commerce solutions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrimaryAction}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-2"
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Login to Platform'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/services')}
              className="px-8 py-4 border border-white/20 rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Explore Services
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-center">
              <div className="text-cyan-400 mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Core Units */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Our Core Units
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We operate four interconnected divisions to serve every aspect of your digital needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {coreUnits.map((unit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/30 hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                {unit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{unit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{unit.desc}</p>
              <div className="flex flex-wrap gap-2">
                {unit.features.map((feat, j) => (
                  <span key={j} className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {feat}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose SMT */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Why Choose SMT?</h2>
            <p className="text-gray-400 mt-4">Excellence through innovation, reliability, and expert execution.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChoose.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
          <div className="relative h-32">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: idx === currentTestimonial ? 1 : 0,
                  transition: { duration: 0.5 },
                }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <p className="text-xl italic text-gray-300 max-w-2xl mx-auto">"{t.quote}"</p>
                <p className="mt-4 text-cyan-400 font-medium">{t.author}</p>
              </motion.div>
            ))}
          </div>
          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentTestimonial ? 'bg-cyan-400 w-6' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands of students and businesses who trust Star Media Tech.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 w-full sm:w-64"
            />
            <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm py-6 border-t border-white/5">
        © {new Date().getFullYear()} Star Media Tech. All rights reserved.
      </div>
    </div>
  )
}