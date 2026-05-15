import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import { useCart } from '../context/CartContext'
import { 
  Menu, X, ShoppingCart, ChevronDown, Sparkles,
  Home, Wrench, Store, Users, Info, Phone,
  GraduationCap, Briefcase, Monitor, ShoppingBag,
  Zap, Search, Bell, User, Contact, Sun, Moon,
  Command, ArrowRight
} from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const isLoggedIn = !!localStorage.getItem('token')
  const { items } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const servicesRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setServicesOpen(false)
    setSearchOpen(false)
  }, [location])

  // Global search function
  const handleGlobalSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length < 2) { setSearchResults([]); return }
    
    try {
      const [prodRes, courseRes] = await Promise.allSettled([
        fetch('/api/products'),
        fetch('/api/courses')
      ])
      
      const products = prodRes.status === 'fulfilled' ? await prodRes.value.json() : []
      const courses = courseRes.status === 'fulfilled' ? await courseRes.value.json() : []
      
      const allResults = [
        ...(Array.isArray(products) ? products : []).map((p: any) => ({ ...p, type: 'product', link: '/shop' })),
        ...(Array.isArray(courses) ? courses : []).map((c: any) => ({ ...c, type: 'course', link: '/training' }))
      ].filter(item => 
        item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.title?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
      
      setSearchResults(allResults)
    } catch (err) {
      setSearchResults([])
    }
  }

  const mainLinks = [
    { to: '/', label: 'Home', icon: <Home size={16} /> },
    { to: '/shop', label: 'Shop', icon: <Store size={16} /> },
    { to: '/staff', label: 'Staff', icon: <Users size={16} /> },
    { to: '/about', label: 'About', icon: <Info size={16} /> },
    { to: '/contact', label: 'Contact', icon: <Phone size={16} /> },
  ]

  const serviceLinks = [
    { to: '/services', label: 'All Services', icon: <Wrench size={14} />, desc: 'Overview of all units' },
    { to: '/training', label: 'IT Training', icon: <GraduationCap size={14} />, desc: 'Learn from scratch to pro' },
    { to: '/consultancy', label: 'Consultancy & AI', icon: <Briefcase size={14} />, desc: 'Hire our experts' },
    { to: '/software', label: 'Software Products', icon: <Monitor size={14} />, desc: 'Ready-made solutions' },
    { to: '/shop', label: 'Commerce Market', icon: <ShoppingBag size={14} />, desc: 'Buy tech products' },
  ]

  const cartItemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white text-xs py-1.5 px-6 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="flex items-center gap-2">
            <Sparkles size={12} className="animate-pulse" />
            Premium Technology Institution — Tamale, Ghana
          </p>
          <div className="flex items-center gap-4">
            <a href="tel:+233559137611" className="hover:underline">📞 +233 559 137 611</a>
            <a href="mailto:starmedia568@gmail.com" className="hover:underline">✉️ starmedia568@gmail.com</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#020617]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/50'
          : 'bg-transparent'
      }`}>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo size="sm" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 group ${
                    isActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }>
                {({ isActive }) => (
                  <>
                    {link.icon} {link.label}
                    {isActive && <motion.div layoutId="nav-active" className="absolute inset-0 bg-cyan-500/10 rounded-xl border border-cyan-500/20" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </>
                )}
              </NavLink>
            ))}

            {/* Services Mega Menu */}
            <div className="relative" ref={servicesRef}>
              <button onClick={() => setServicesOpen(!servicesOpen)} onMouseEnter={() => setServicesOpen(true)}
                className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  servicesOpen ? 'text-cyan-400 bg-cyan-500/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}>
                <Wrench size={16} /> Services
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[520px] bg-[#0a0f1e]/98 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-4 grid grid-cols-1 gap-1">
                    {serviceLinks.map((link) => (
                      <NavLink key={link.to} to={link.to} onClick={() => setServicesOpen(false)}
                        className={({ isActive }) =>
                          `flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                            isActive ? 'bg-cyan-500/20 border border-cyan-500/30' : 'hover:bg-white/5 border border-transparent'
                          }`
                        }>
                        <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-all">{link.icon}</div>
                        <div>
                          <p className="font-medium text-sm">{link.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
                        </div>
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Global Search */}
            <div className="relative" ref={searchRef}>
              <button onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all relative">
                <Search size={18} />
                <span className="absolute -bottom-1 -right-1 text-[9px] text-gray-600 flex items-center gap-0.5">
                  <Command size={9} />K
                </span>
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-96 bg-[#0a0f1e]/98 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-4">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-3 text-gray-500" />
                      <input
                        type="text" placeholder="Search products, courses, services..." value={searchQuery}
                        onChange={e => handleGlobalSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                        autoFocus
                      />
                    </div>
                    {searchResults.length > 0 && (
                      <div className="mt-3 space-y-1 max-h-64 overflow-y-auto">
                        {searchResults.map((result, i) => (
                          <div key={i} onClick={() => { navigate(result.link); setSearchOpen(false); setSearchQuery(''); setSearchResults([]) }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-all">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs">
                              {result.type === 'product' ? '🛍️' : '🎓'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{result.name || result.title}</p>
                              <p className="text-xs text-gray-500">{result.type} • {result.category || result.level}</p>
                            </div>
                            <ArrowRight size={14} className="text-gray-500" />
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <Link to="/cart" className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all relative">
              <ShoppingCart size={18} />
              {cartItemCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xs font-bold flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                  {cartItemCount}
                </motion.span>
              )}
            </Link>

            {/* Staff Portal */}
            <Link to="/staff-login" className="relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 overflow-hidden group bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20">
              <Contact size={16} className="text-emerald-400" />
              <span className="text-emerald-400">Staff</span>
            </Link>

            {/* Auth */}
            {isLoggedIn ? (
              <Link to="/admin" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold hover:scale-105 transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2">
                <User size={16} /> Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-5 py-2.5 border border-white/20 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">Login</Link>
                <Link to="/register" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold hover:scale-105 transition-all shadow-lg shadow-cyan-500/25">Get Started</Link>
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/cart" className="p-2.5 rounded-xl text-gray-400 hover:text-white transition-all relative">
              <ShoppingCart size={18} />
              {cartItemCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full text-xs font-bold flex items-center justify-center">{cartItemCount}</span>}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2.5 rounded-xl border border-white/20 text-gray-400 hover:text-white hover:border-cyan-400/30 transition-all">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 bg-[#020617]/98 backdrop-blur-2xl overflow-hidden">
              <div className="px-6 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {mainLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    {link.icon} {link.label}
                  </NavLink>
                ))}
                <div className="pt-2"><p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Services</p>
                  {serviceLinks.map((link) => (
                    <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)}
                      className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                      {link.icon} {link.label}
                    </NavLink>
                  ))}
                </div>
                <div className="pt-2">
                  <Link to="/staff-login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Contact size={16} /> Staff Portal
                  </Link>
                </div>
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {isLoggedIn ? (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold">
                      <User size={16} /> Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 border border-white/20 rounded-xl text-sm font-medium">Login</Link>
                      <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold">Get Started</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}