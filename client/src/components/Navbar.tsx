import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const isLoggedIn = !!localStorage.getItem('token')
  const { items } = useCart()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const mainLinks = [
    { to: '/', label: 'Home' },
    // Services dropdown will be rendered separately
    { to: '/shop', label: 'Shop' },
    { to: '/staff', label: 'Staff' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const serviceLinks = [
    { to: '/services', label: 'All Services' },
    { to: '/training', label: 'IT Training' },
    { to: '/consultancy', label: 'Consultancy & AI' },
    { to: '/software', label: 'Software Products' },
    { to: '/shop', label: 'Commerce Market' },
  ]

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <Link to="/">
          <Logo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-1 ${
                servicesOpen
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Services
              <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {servicesOpen && (
              <div className="absolute top-full mt-2 left-0 w-56 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2">
                {serviceLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setServicesOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-sm transition-all ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart with Counter */}
          <Link
            to="/cart"
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all relative"
          >
            <ShoppingCart size={20} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <Link
              to="/admin"
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm font-semibold hover:scale-105 transition-all"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border border-white/20 rounded-lg text-sm font-medium hover:bg-white/10 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm font-semibold hover:scale-105 transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/cart"
            className="p-2 rounded-lg text-gray-400 hover:text-white transition-all relative"
          >
            <ShoppingCart size={20} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-white/20 text-gray-400 hover:text-white transition-all"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl">
          <div className="px-6 py-4 space-y-1">
            {/* Main links */}
            {mainLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Service links */}
            <div className="pl-4 space-y-1 border-l border-white/10 ml-4">
              {serviceLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-gray-500 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            
            {/* Auth */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              {isLoggedIn ? (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm font-semibold"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 border border-white/20 rounded-lg text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm font-semibold"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}