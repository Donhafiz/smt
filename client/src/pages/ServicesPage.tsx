import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../lib/axios'
import { Wrench, ArrowRight } from 'lucide-react'

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/services')
      .then(res => setServices(res.data))
      .catch(err => console.error('Services fetch error:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="mt-4 text-xl text-gray-300">Comprehensive technology solutions</p>
        </motion.div>
      </section>

      <section className="px-6 max-w-6xl mx-auto pb-20">
        {services.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Wrench size={48} className="mx-auto mb-4 opacity-50" />
            <p>No services available yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Wrench size={24} className="text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
                {service.category && (
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {service.category}
                  </span>
                )}
                <div className="mt-4 flex items-center gap-1 text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-10">
          <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
          <p className="text-gray-400 mb-8">Contact us for a free consultation</p>
          <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold transition-all flex items-center gap-2 mx-auto">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  )
}