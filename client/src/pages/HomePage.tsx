import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  Monitor, GraduationCap, Briefcase, ShoppingCart,
  Star, Users, Zap, ShieldCheck, ArrowRight, 
  Sparkles, Globe, Award, TrendingUp, Clock,
  MessageCircle, CheckCircle2, Play, Pause,
  ChevronRight, Send, Quote
} from 'lucide-react'
import Logo from '../components/Logo'
import api from '../lib/axios'

export default function HomePage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('checking')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const heroRef = useRef(null)
  const statsRef = useRef(null)

  // Parallax scroll
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const [products, setProducts] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [staffList, setStaffList] = useState<any[]>([])
  useEffect(() => {
  const token = localStorage.getItem('token')
  setIsLoggedIn(!!token)

  fetch('/health')
    .then(res => res.json())
    .then(() => setStatus('online'))
    .catch(() => setStatus('offline'))

  // Fetch public data
  const fetchPublicData = async () => {
    try {
      const [productsRes, coursesRes] = await Promise.all([
        api.get('/products'),
        api.get('/courses')
      ])
      setProducts(productsRes.data || [])
      setCourses(coursesRes.data || [])
    } catch (err) {
      console.log('Public data fetch error (non-critical):', err)
    }
  }
  
  fetchPublicData()
}, [])
  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handlePrimaryAction = () => {
    if (isLoggedIn) navigate('/admin')
    else navigate('/login')
  }

  const stats = [
    { value: `${staffList.length || 6}+`, label: 'Team Members', icon: <Users size={20} />, gradient: 'from-cyan-400 to-blue-500' },
    { value: `${courses.length || 8}+`, label: 'IT Courses', icon: <Award size={20} />, gradient: 'from-purple-400 to-pink-500' },
    { value: `${products.length || 12}+`, label: 'Products', icon: <ShoppingCart size={20} />, gradient: 'from-orange-400 to-yellow-500' },
    { value: '15+', label: 'Countries Reached', icon: <Globe size={20} />, gradient: 'from-green-400 to-emerald-500' },
  ]

  const coreUnits = [
  {
    icon: <Monitor size={32} />,
    title: 'Software Development',
    desc: 'Custom websites, mobile apps, and enterprise systems built with cutting-edge technology.',
    features: ['Web Apps', 'Mobile Apps', 'Enterprise', 'APIs'],
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-500/10 to-blue-500/5',
    link: '/software'  // ✅ Redirect to Software page
  },
  {
    icon: <GraduationCap size={32} />,
    title: 'IT Training School',
    desc: 'Professional IT courses with mentorship and certification from industry experts.',
    features: ['Web Dev', 'Cybersecurity', 'Data Science', 'AI/ML'],
    gradient: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-500/10 to-pink-500/5',
    link: '/training'  // ✅ Redirect to Training page
  },
  {
    icon: <Briefcase size={32} />,
    title: 'IT Consultancy',
    desc: 'Strategic technology advisory, digital transformation, and security audits.',
    features: ['Cloud', 'Security', 'Strategy', 'Support'],
    gradient: 'from-orange-500 to-red-600',
    bgGradient: 'from-orange-500/10 to-red-500/5',
    link: '/consultancy'  // ✅ Redirect to Consultancy page
  },
  {
    icon: <ShoppingCart size={32} />,
    title: 'Commerce Market',
    desc: 'Premium laptops, phones, accessories, and gadgets with fast delivery.',
    features: ['Laptops', 'Phones', 'Gadgets', 'Accessories'],
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-500/10 to-emerald-500/5',
    link: '/shop'  // ✅ Redirect to Shop page
  },
]

{/* Featured Products Section */}
{products.length > 0 && (
  <section className="relative py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-black">
          Featured{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Products
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, 4).map((product, i) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={() => navigate('/shop')}
            className="glass rounded-2xl overflow-hidden cursor-pointer group"
          >
            <div className="h-40 overflow-hidden">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-4xl">🛍️</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm truncate">{product.name}</h3>
              <p className="text-cyan-400 font-bold mt-1">GHS {product.price?.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button onClick={() => navigate('/shop')} className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:scale-105 transition-all">
          View All Products →
        </button>
      </div>
    </div>
  </section>
)}

{/* Featured Courses Section */}
{courses.length > 0 && (
  <section className="relative py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-black">
          Popular{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Courses
          </span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.slice(0, 3).map((course, i) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={() => navigate('/training')}
            className="glass rounded-2xl p-6 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4">
              <GraduationCap size={22} className="text-white" />
            </div>
            <h3 className="font-bold mb-2">{course.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-3">{course.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-purple-400 font-bold">GHS {course.price?.toLocaleString()}</span>
              <span className="text-xs text-gray-500">{course.duration}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button onClick={() => navigate('/training')} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold hover:scale-105 transition-all">
          View All Courses →
        </button>
      </div>
    </div>
  </section>
)}
  const testimonials = [
    { quote: 'SMT transformed our business with a stunning website and ERP system. The team is exceptional.', author: 'Sarah L., CEO', role: 'TechNova Ltd.', avatar: 'S' },
    { quote: 'The IT training gave me a job in cybersecurity within 3 months. Best decision ever!', author: 'Kwame A.', role: 'Graduate 2024', avatar: 'K' },
    { quote: 'Reliable consultancy that saved us thousands in infrastructure costs. Highly recommended.', author: 'David M.', role: 'CTO, FinServ', avatar: 'D' },
  ]

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, testimonials.length])

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }))

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617]">
      {/* ============================================ */}
      {/* CUSTOM CURSOR GLOW */}
      {/* ============================================ */}
      <div
        className="fixed pointer-events-none z-[9999] w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 transition-transform duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      {/* ============================================ */}
      {/* FLOATING PARTICLES */}
      {/* ============================================ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${p.x}%`,
              top: `-${p.size * 2}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      {/* ============================================ */}
      {/* GRADIENT ORBS */}
      {/* ============================================ */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-blue-600/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/20 to-pink-600/10 rounded-full blur-3xl"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />

      {/* ============================================ */}
      {/* STATUS PILL */}
      {/* ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-24 right-4 z-40"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-sm">
          <span className={`relative flex h-2.5 w-2.5`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'online' ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
          </span>
          <span className="text-gray-400">{status === 'online' ? 'System Live' : 'Offline'}</span>
        </div>
      </motion.div>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
      >
        {/* Animated ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[500px] h-[500px] rounded-full border border-white/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/10"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-6xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-8"
          >
            <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            <span className="text-sm text-cyan-400">Premium Technology Institution</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
            <span className="block bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
              STAR MEDIA
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              TECH
            </span>
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed font-light">
            A premium technology institution delivering{' '}
            <span className="text-cyan-400 font-medium">software development</span>,{' '}
            <span className="text-purple-400 font-medium">IT training</span>,{' '}
            <span className="text-orange-400 font-medium">consultancy services</span>, and{' '}
            <span className="text-green-400 font-medium">modern commerce</span> solutions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrimaryAction}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold text-lg overflow-hidden shadow-2xl shadow-cyan-500/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoggedIn ? 'Go to Dashboard' : 'Get Started'}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/services')}
              className="group px-8 py-4 border border-white/20 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Explore Services
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
          >
            <motion.div className="w-1.5 h-3 bg-cyan-400 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      <section ref={statsRef} className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group relative p-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-10 mb-4`}>
                  <span className="text-white">{stat.icon}</span>
                </div>
                <div className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CORE UNITS */}
      {/* ============================================ */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black">
              Our{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Core Units
              </span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
              Four interconnected divisions powering digital transformation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {coreUnits.map((unit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -8 }}
                className={`group relative p-8 rounded-3xl bg-gradient-to-br ${unit.bgGradient} border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all duration-500 cursor-pointer overflow-hidden`}
                onClick={() => navigate(unit.link)}  // ✅ CHANGED: Now uses each unit's specific link
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${unit.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />

                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${unit.gradient} mb-6 group-hover:scale-110 transition-transform`}>
                  <span className="text-white">{unit.icon}</span>
                </div>

                <h3 className="text-2xl font-bold mb-3">{unit.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{unit.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {unit.features.map((feat, j) => (
                    <span
                      key={j}
                      className={`text-xs px-3 py-1.5 rounded-full bg-gradient-to-r ${unit.gradient} bg-opacity-20 text-white/80`}
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHY CHOOSE SMT */}
      {/* ============================================ */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                SMT
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Zap size={24} />, title: 'Innovation', desc: 'AI-powered solutions for modern challenges' },
              { icon: <Users size={24} />, title: 'Expert Team', desc: 'Certified professionals with experience' },
              { icon: <ShieldCheck size={24} />, title: 'Secure', desc: 'Enterprise-grade security & support' },
              { icon: <Star size={24} />, title: 'Proven', desc: '350+ successful projects delivered' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all duration-500 group"
              >
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS */}
      {/* ============================================ */}
      <section className="relative py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Quote size={40} className="mx-auto text-cyan-500/30 mb-6" />
            
            <div className="relative h-48">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: idx === currentTestimonial ? 1 : 0,
                    y: idx === currentTestimonial ? 0 : 10,
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <p className="text-xl md:text-2xl text-gray-300 italic leading-relaxed max-w-2xl">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-white">
                      {t.avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">{t.author}</p>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-2 rounded-lg text-gray-500 hover:text-white transition-colors"
              >
                {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentTestimonial(idx); setIsAutoPlaying(false) }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentTestimonial
                      ? 'bg-cyan-400 w-8'
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 p-10 md:p-16 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of students and businesses who trust Star Media Tech.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 w-full sm:w-72 transition-all"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20">
                  Get Started
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER LINE */}
      {/* ============================================ */}
      <div className="text-center text-gray-600 text-sm py-8 border-t border-white/5">
        © {new Date().getFullYear()} Star Media Tech. All rights reserved.
      </div>
    </div>
  )
}