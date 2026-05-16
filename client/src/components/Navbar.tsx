import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useTranslation } from 'react-i18next'
import { 
  Menu, X, ShoppingCart, ChevronDown, Sparkles,
  Home, Wrench, Store, Users, Info, Phone,
  GraduationCap, Briefcase, Monitor, ShoppingBag,
  Search, User, Contact
} from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const isLoggedIn = !!localStorage.getItem('token')
  const { items } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const servicesRef = useRef<HTMLDivElement>(null)
  const { t, i18n } = useTranslation()
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => { setIsOpen(false); setServicesOpen(false) }, [location])

  const mainLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/training', label: 'Training' },
    { to: '/staff', label: 'Staff' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const serviceLinks = [
    { to: '/services', label: 'All Services', icon: <Wrench size={14} />, desc: 'Overview of all units' },
    { to: '/training', label: 'IT Training', icon: <GraduationCap size={14} />, desc: 'Learn from scratch to pro' },
    { to: '/consultancy', label: 'Consultancy & AI', icon: <Briefcase size={14} />, desc: 'Hire our experts' },
    { to: '/software', label: 'Software Products', icon: <Monitor size={14} />, desc: 'Ready-made solutions' },
    { to: '/shop', label: 'Commerce Market', icon: <ShoppingBag size={14} />, desc: 'Buy tech products' },
  ]

  const cartItemCount = items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#020617]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/50' 
        : 'bg-[#020617]/80 backdrop-blur-xl border-b border-white/5'
    }`}>
      <div className="h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-70" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* ============================================ */}
          {/* LEFT — LOGO + NAME IN ONE LINE */}
          {/* ============================================ */}
          <Link to="/" className="flex items-center gap-3.5 group flex-shrink-0">
            {/* Logo Image */}
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-cyan-500/20 group-hover:ring-cyan-500/40 transition-all shadow-lg shadow-cyan-500/10">
                <img src="/smt-logo.png" alt="SMT" className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity" />
            </div>
            
            {/* Brand Name */}
            <div className="hidden sm:block">
              <h1 className="text-lg font-black tracking-tight leading-none">
                <span className="text-white">STAR</span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">MEDIA</span>{' '}
                <span className="text-white">TECH</span>
              </h1>
              <p className="text-[9px] text-gray-500 tracking-widest uppercase mt-0.5">Premium Technology Institution</p>
            </div>
          </Link>

          {/* ============================================ */}
          {/* CENTER — NAVIGATION */}
          {/* ============================================ */}
          <div className="hidden lg:flex items-center gap-0.5">
            {mainLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 ${
                    isActive 
                      ? 'text-cyan-400 bg-cyan-500/10' 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`
                }>
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div layoutId="nav-active" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button onClick={() => setServicesOpen(!servicesOpen)}
                className={`relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  servicesOpen ? 'text-cyan-400 bg-cyan-500/10' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}>
                Services
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={12} />
                </motion.span>
                {servicesOpen && <motion.div layoutId="nav-active" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />}
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-full mt-2 left-0 w-64 bg-[#0a0f1e]/98 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-2">
                    {serviceLinks.map((link) => (
                      <NavLink key={link.to} to={link.to} onClick={() => setServicesOpen(false)}
                        className={({ isActive }) => `flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all ${
                          isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}>
                        <span className="mt-0.5">{link.icon}</span>
                        <div><p className="text-sm font-medium leading-tight">{link.label}</p><p className="text-[10px] text-gray-500">{link.desc}</p></div>
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ============================================ */}
          {/* RIGHT — ACTIONS */}
          {/* ============================================ */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Search */}
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              <Search size={17} />
            </button>
            
            {/* Language Switcher */}
            <select
              value={i18n.language}
              onChange={(e) => {
                const lang = e.target.value
                i18n.changeLanguage(lang)
                localStorage.setItem('smt-language', lang)
              }}
              className="px-2 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 cursor-pointer hover:border-white/20 transition-all appearance-none text-center"
            >
              <option value="en">🇬🇧</option>
              <option value="fr">🇫🇷</option>
              <option value="tw">🇬🇭</option>
            </select>

            {/* Cart */}
            <Link to="/cart" className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all relative">
              <ShoppingCart size={17} />
              {cartItemCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white shadow-md">
                  {cartItemCount}
                </motion.span>
              )}
            </Link>

            {/* Staff Portal */}
            <Link to="/staff-login" className="px-3.5 py-2 rounded-lg text-[12px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5">
              <Contact size={14} /> Staff
            </Link>

            {/* Auth */}
            {isLoggedIn ? (
              <Link to="/admin" className="ml-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-[13px] font-semibold hover:scale-105 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5">
                <User size={14} /> Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-1.5 ml-1">
                <Link to="/login" className="px-4 py-2 border border-white/20 rounded-lg text-[13px] font-medium hover:bg-white/10 transition-all">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-[13px] font-semibold hover:scale-105 transition-all shadow-lg shadow-cyan-500/20">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <Link to="/cart" className="p-2.5 rounded-lg text-gray-400 relative">
              <ShoppingCart size={17} />
              {cartItemCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-cyan-500 rounded-full text-[10px] font-bold flex items-center justify-center">{cartItemCount}</span>}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2.5 rounded-lg border border-white/20 text-gray-400">
              {isOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-[#020617]/98 backdrop-blur-2xl">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-3.5 text-gray-500" />
                <input type="text" placeholder="Search products, courses, services..." autoFocus
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-[#020617]/98 backdrop-blur-2xl">
            <div className="px-6 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {mainLinks.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `block px-4 py-3 rounded-xl text-sm transition-all ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-2"><p className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Services</p>
                {serviceLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                    {link.icon} {link.label}
                  </NavLink>
                ))}
              </div>
              <div className="pt-4 space-y-2">
                <Link to="/staff-login" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"><Contact size={14} /> Staff Portal</Link>
                {isLoggedIn ? (
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="block text-center py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold">Dashboard</Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center py-3 border border-white/20 rounded-xl text-sm">Login</Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold">Register</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}