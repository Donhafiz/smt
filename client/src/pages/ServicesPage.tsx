import { motion } from 'framer-motion'
import { services } from '../data/services'
import { 
  Monitor, GraduationCap, Briefcase, ShoppingCart,
  Code, Smartphone, Globe, Database, Palette, 
  Shield, Cloud, BarChart3, BookOpen, Laptop,
  Wrench, ArrowRight
} from 'lucide-react'

const iconMap: Record<string, any> = {
  Monitor, Code, Smartphone, Globe, Database, Palette,
  Shield, Cloud, BarChart3, BookOpen, Laptop, Wrench,
  GraduationCap, Briefcase, ShoppingCart
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Comprehensive technology solutions across four core business units
          </p>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: <Monitor size={20} />, label: 'Software Dev', color: 'cyan' },
            { icon: <GraduationCap size={20} />, label: 'Training', color: 'green' },
            { icon: <Briefcase size={20} />, label: 'Consultancy', color: 'purple' },
            { icon: <ShoppingCart size={20} />, label: 'Commerce', color: 'orange' },
          ].map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl bg-white/5 border border-white/10 text-center hover:border-${cat.color}-400/30 transition-all`}
            >
              <div className={`text-${cat.color}-400 mb-2 flex justify-center`}>{cat.icon}</div>
              <span className="text-sm font-medium">{cat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-all">
                {iconMap[service.icon] || <Wrench size={24} className="text-cyan-400" />}
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
      </section>

      {/* CTA */}
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