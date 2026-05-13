import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">

      <div className="max-w-6xl mx-auto flex justify-between items-center p-5">

        <h1 className="text-cyan-400 font-bold text-xl tracking-widest">
          SMT
        </h1>

        <div className="hidden md:flex gap-6 text-sm">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/staff">Staff</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <button className="md:hidden px-3 py-1 border border-white/20 rounded">
          Menu
        </button>

      </div>

    </nav>
  )
}