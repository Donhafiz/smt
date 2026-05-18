import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { 
  LayoutDashboard, User, Key, LogOut, Menu, X,
  CreditCard, Home
} from 'lucide-react'

export default function StaffPortalLayout() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const staffUser = JSON.parse(localStorage.getItem('staffUser') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('staffToken')
    localStorage.removeItem('staffUser')
    navigate('/staff-login')
  }

  // Close sidebar when clicking a link
  const handleNavClick = () => {
    setOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 bg-cyan-500/20 border border-cyan-500/30 px-3 py-2 rounded-lg md:hidden backdrop-blur-sm hover:bg-cyan-500/30 transition-all"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay — closes sidebar when clicking outside */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:sticky top-0 z-40
          h-screen w-64 bg-[#0f172a]/95
          border-r border-white/10
          p-5 transition-all duration-300
          backdrop-blur-xl flex flex-col
          shadow-2xl shadow-black/30
          overflow-y-auto

          ${open ? 'left-0' : '-left-72'}
          md:left-0
        `}
      >
        {/* Logo */}
        <div className="mb-8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Staff Portal
          </h2>
          <p className="text-xs text-gray-500 mt-1">{staffUser?.name || staffUser?.firstName || 'Staff'}</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 flex-1">
          {[
            { to: '/staff-portal/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
            { to: '/staff-portal/profile', icon: <User size={18} />, label: 'My Profile' },
            { to: '/staff-portal/change-password', icon: <Key size={18} />, label: 'Change Password' },
          ].map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all w-full"
          >
            <Home size={18} />
            <span>Back to Site</span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto pt-16 md:pt-6">
        <Outlet />
      </div>
    </div>
  )
}