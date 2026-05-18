import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../components/Logo'
import AnimatedBackground from '../components/AnimatedBackground'
import { 
  LayoutDashboard, BarChart3, ShoppingCart, Users, Wrench, DollarSign,
  Package, TrendingUp, LineChart, Lightbulb, UserCheck, Brain, Crown,
  LogOut, Menu, X, Home, ExternalLink, GraduationCap, Sparkles,
  Search, Bell, Settings, ChevronDown, ChevronUp, Zap,
  MessageCircle, Calendar, FileText, Shield, CreditCard, BookOpen,
  Layers, Command
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function ERPLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState<string[]>([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const toggleCollapse = (section: string) => {
    setCollapsed(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    )
  }

  const navSections = [
    {
      title: 'Main',
      items: [
        { to: '/admin', icon: <LayoutDashboard size={16} />, label: 'Dashboard', end: true },
        { to: '/admin/analytics', icon: <BarChart3 size={16} />, label: 'Analytics' },
      ]
    },
    {
      title: 'Management',
      items: [
        { to: '/admin/products', icon: <Package size={16} />, label: 'Products' },
        { to: '/admin/orders', icon: <ShoppingCart size={16} />, label: 'Orders' },
        { to: '/admin/courses', icon: <GraduationCap size={16} />, label: 'Courses' },
        { to: '/admin/staff', icon: <Users size={16} />, label: 'Staff' },
        { to: '/admin/services', icon: <Wrench size={16} />, label: 'Services' },
      ]
    },
    {
      title: 'Financial',
      items: [
        { to: '/admin/billing', icon: <DollarSign size={16} />, label: 'Billing' },
        { to: '/admin/inventory', icon: <Package size={16} />, label: 'Inventory' },
      ]
    },
    {
      title: 'AI & Intelligence',
      items: [
        { to: '/admin/revenue', icon: <TrendingUp size={16} />, label: 'Revenue AI' },
        { to: '/admin/sales', icon: <LineChart size={16} />, label: 'Sales Forecast' },
        { to: '/admin/recommendations', icon: <Lightbulb size={16} />, label: 'AI Recs' },
        { to: '/admin/customers', icon: <UserCheck size={16} />, label: 'Customers' },
        { to: '/admin/analyst', icon: <Brain size={16} />, label: 'AI Analyst' },
      ]
    },
    {
      title: 'System',
      items: [
        { to: '/admin/superadmin', icon: <Crown size={16} />, label: 'Super Admin' },
      ]
    },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-[#020617] text-white flex relative">
      <AnimatedBackground />

      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 glass border border-white/10 px-3 py-2 rounded-xl md:hidden hover:border-cyan-400/30 transition-all">
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile Overlay */}
      {open && <div className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <div className={`
        fixed md:sticky top-0 z-40
        h-screen w-64 bg-[#0a0f1e]/95
        border-r border-white/5
        transition-all duration-300
        backdrop-blur-2xl flex flex-col
        shadow-2xl shadow-black/30

        ${open ? 'left-0' : '-left-72'}
        md:left-0
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <Logo size="sm" />
          <div className="flex items-center gap-2 mt-3">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping opacity-50" />
            </div>
            <p className="text-xs text-gray-500">{user?.name || 'Admin'}</p>
            <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Admin</span>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <button onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-gray-500 hover:text-gray-400 hover:border-white/10 transition-all group">
            <Search size={14} />
            <span className="flex-1 text-left">Quick search...</span>
            <kbd className="hidden group-hover:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white/5 text-[10px] text-gray-600">
              <Command size={10} />K
            </kbd>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4 scrollbar-thin scrollbar-thumb-white/5">
          {navSections.map((section) => (
            <div key={section.title}>
              <button onClick={() => toggleCollapse(section.title)}
                className="flex items-center gap-2 w-full px-3 py-1.5 text-[10px] font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-500 transition-colors">
                {section.title}
                {collapsed.includes(section.title) ? <ChevronDown size={10} /> : <ChevronUp size={10} />}
              </button>
              
              <AnimatePresence>
                {!collapsed.includes(section.title) && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="space-y-0.5 mt-1">
                    {section.items.map((item) => (
                      <NavLink key={item.to} to={item.to} end={item.end}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group relative ${
                            isActive
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                              : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02] border border-transparent'
                          }`
                        }>
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full" />
                            )}
                            <span className={isActive ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400 transition-colors'}>
                              {item.icon}
                            </span>
                            <span className="text-xs">{item.label}</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-gray-300 hover:bg-white/[0.02] transition-all">
            <Home size={14} /> Visit Site <ExternalLink size={10} className="ml-auto" />
          </a>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all w-full">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 glass border-b border-white/5 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-gray-500 hover:text-gray-400 transition-all">
              <Search size={14} /> Search... <kbd className="text-[10px] text-gray-600 ml-2">⌘K</kbd>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full" />
            </button>
            <button className="relative p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
              <MessageCircle size={16} />
            </button>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="text-xs text-gray-400 hidden sm:block">{user?.name || 'Admin'}</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>

      {/* Global Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}>
            <motion.div initial={{ scale: 0.95, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-lg bg-[#0a0f1e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}>
              <div className="relative">
                <Search size={18} className="absolute left-4 top-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products, orders, staff, courses..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
                  autoFocus
                />
              </div>
              <div className="border-t border-white/5 px-4 py-3">
                <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-2">Quick Actions</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Add Product', to: '/admin/products' },
                    { label: 'Add Staff', to: '/admin/staff' },
                    { label: 'View Orders', to: '/admin/orders' },
                    { label: 'Analytics', to: '/admin/analytics' },
                  ].map(action => (
                    <button key={action.label} onClick={() => { navigate(action.to); setSearchOpen(false) }}
                      className="text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-gray-400 hover:text-white transition-all">
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}