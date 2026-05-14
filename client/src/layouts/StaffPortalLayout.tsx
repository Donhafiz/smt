import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { User, Camera, Key, LogOut, LayoutDashboard } from 'lucide-react'

export default function StaffPortalLayout() {
  const navigate = useNavigate()
  const staffUser = JSON.parse(localStorage.getItem('staffUser') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('staffToken')
    localStorage.removeItem('staffUser')
    navigate('/staff-login')
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <div className="w-64 bg-[#0f172a] border-r border-white/10 p-5 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Staff Portal</h2>
          <p className="text-xs text-gray-500 mt-1">{staffUser?.firstName} {staffUser?.lastName}</p>
        </div>

        <nav className="space-y-1 flex-1">
          {[
            { to: '/staff-portal/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
            { to: '/staff-portal/profile', icon: <User size={18} />, label: 'My Profile' },
            { to: '/staff-portal/change-password', icon: <Key size={18} />, label: 'Change Password' },
          ].map(item => (
            <NavLink key={item.to} to={item.to} end className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
              {item.icon}<span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 w-full">
          <LogOut size={18} /><span>Logout</span>
        </button>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}