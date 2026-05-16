import { useTranslation } from 'react-i18next'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10 max-w-lg"
      >
        {/* 404 Glitch Effect */}
        <motion.div
          animate={{ 
            textShadow: [
              '0 0 20px rgba(6, 182, 212, 0.5)',
              '0 0 40px rgba(6, 182, 212, 0.8)',
              '0 0 20px rgba(6, 182, 212, 0.5)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent leading-none"
        >
          404
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold mt-4">Page Not Found</h2>
        
        <p className="text-gray-400 mt-4 text-lg leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Search suggestion */}
        <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-gray-400 mb-3">
            <Search size={18} />
            <span>Try searching for what you need</span>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {['Home', 'Services', 'About', 'Contact', 'Login'].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm hover:bg-cyan-500/20 transition-all"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
