import { motion } from 'framer-motion'
import { Users, Award, Globe, Shield, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function TrustBar() {
  const [counts, setCounts] = useState({ students: 0, projects: 0, countries: 0, satisfaction: 0 })
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        students: Math.min(prev.students + 15, 1200),
        projects: Math.min(prev.projects + 5, 350),
        countries: Math.min(prev.countries + 1, 15),
        satisfaction: Math.min(prev.satisfaction + 1, 99)
      }))
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const items = [
    { icon: <Users size={20} />, value: `${counts.students}+`, label: 'Students Trained' },
    { icon: <Award size={20} />, value: `${counts.projects}+`, label: 'Projects Delivered' },
    { icon: <Globe size={20} />, value: `${counts.countries}+`, label: 'Countries Reached' },
    { icon: <Shield size={20} />, value: `${counts.satisfaction}%`, label: 'Satisfaction Rate' },
  ]

  return (
    <div className="relative py-8 border-y border-white/5 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5">
      {/* Glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-full bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <p className="text-center text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-6">
          Trusted Across Africa
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group cursor-default"
            >
              <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 text-cyan-400 mb-3 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                {item.icon}
              </div>
              <div className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors">
                {item.value}
              </div>
              <div className="text-xs text-gray-500 mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}