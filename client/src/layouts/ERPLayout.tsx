import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import AnimatedBackground from '../components/AnimatedBackground'
import { 
  LayoutDashboard, 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Wrench, 
  DollarSign,
  Package,
  TrendingUp,
  LineChart,
  Lightbulb,
  UserCheck,
  Brain,
  Crown,
  LogOut,
  Menu,
  X,
  Home,
  ExternalLink,
  GraduationCap,
  Sparkles
} from 'lucide-react'

export default function ERPLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const navItems = [
    { to: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/admin/analytics', icon: <BarChart3 size={18} />, label: 'Analytics' },
    { to: '/admin/products', icon: <Package size={18} />, label: 'Products' },
    { to: '/admin/orders', icon: <ShoppingCart size={18} />, label: 'Orders' },
    { to: '/admin/courses', icon: <GraduationCap size={18} />, label: 'Courses' },
    { to: '/admin/staff', icon: <Users size={18} />, label: 'Staff' },
    { to: '/admin/services', icon: <Wrench size={18} />, label: 'Services' },
    { to: '/admin/billing', icon: <DollarSign size={18} />, label: 'Billing' },
    { to: '/admin/inventory', icon: <Package size={18} />, label: 'Inventory' },
    { to: '/admin/revenue', icon: <TrendingUp size={18} />, label: 'Revenue AI' },
    { to: '/admin/sales', icon: <LineChart size={18} />, label: 'Sales Forecast' },
    { to: '/admin/recommendations', icon: <Lightbulb size={18} />, label: 'AI Recs' },
    { to: '/admin/customers', icon: <UserCheck size={18} />, label: 'Customers' },
    { to: '/admin/analyst', icon: <Brain size={18} />, label: 'AI Analyst' },
    { to: '/admin/superadmin', icon: <Crown size={18} />, label: 'Super Admin' },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white flex relative">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 bg-cyan-500/20 border border-cyan-500/30 px-3 py-2 rounded-lg md:hidden backdrop-blur-sm hover:bg-cyan-500/30 transition-all glass"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* OVERLAY */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:relative z-40
          h-full w-64 bg-[#0f172a]/80
          border-r border-white/10
          p-5 transition-all duration-300
          backdrop-blur-2xl flex flex-col
          shadow-2xl shadow-black/30

          ${open ? 'left-0' : '-left-72'}
          md:left-0
        `}
      >
        {/* LOGO */}
        <div className="mb-6 pb-4 border-b border-white/10">
          <Logo size="sm" />
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping opacity-50" />
            </div>
            <p className="text-xs text-gray-400">
              {user?.name || 'Admin'}
            </p>
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="space-y-1 flex-1 overflow-y-auto max-h-[calc(100vh-180px)] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 group relative ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full" />
                  )}
                  
                  <span className={`transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-gray-500 group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>

                  {isActive && (
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* BOTTOM ACTIONS */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 w-full group"
          >
            <Home size={18} className="group-hover:text-cyan-400 transition-colors" />
            <span>Visit Site</span>
            <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full group"
          >
            <LogOut size={18} className="group-hover:text-red-400 transition-colors" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-6 overflow-auto relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/50 via-transparent to-[#0a0f1e]/50 pointer-events-none" />
        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}