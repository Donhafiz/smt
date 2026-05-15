import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Wrench, ArrowRight, Monitor, GraduationCap, Briefcase, ShoppingCart,
  Code, Smartphone, Globe, Database, Palette, Shield, Cloud, BarChart3,
  BookOpen, Laptop, Headphones, Watch, Cable, Sparkles, Zap, CheckCircle2
} from 'lucide-react'

interface Service {
  _id: string
  title: string
  description: string
  category: string
  icon: string
}

const categoryRedirects: Record<string, string> = {
  'Software Development': '/software',
  'IT Training': '/training',
  'Consultancy': '/consultancy',
  'Commerce Market': '/shop',
  'AI Solutions': '/consultancy',
}

const categoryIcons: Record<string, any> = {
  'Software Development': <Monitor size={28} />,
  'IT Training': <GraduationCap size={28} />,
  'Consultancy': <Briefcase size={28} />,
  'Commerce Market': <ShoppingCart size={28} />,
  'AI Solutions': <Sparkles size={28} />,
}

const categoryGradients: Record<string, string> = {
  'Software Development': 'from-cyan-500 to-blue-600',
  'IT Training': 'from-purple-500 to-pink-600',
  'Consultancy': 'from-orange-500 to-red-600',
  'Commerce Market': 'from-green-500 to-emerald-600',
  'AI Solutions': 'from-violet-500 to-purple-600',
}

const categoryFeatures: Record<string, string[]> = {
  'Software Development': ['Web Development', 'Mobile Apps', 'Enterprise Systems', 'API Development', 'UI/UX Design', 'Maintenance'],
  'IT Training': ['Web Development', 'Cybersecurity', 'Data Science', 'AI/ML', 'Networking', 'Graphic Design'],
  'Consultancy': ['Cloud Solutions', 'Security Audits', 'Digital Strategy', 'Infrastructure', 'Support', 'Training'],
  'Commerce Market': ['Laptops', 'Smartphones', 'Accessories', 'Gadgets', 'Networking', 'Software'],
  'AI Solutions': ['Chatbots', 'Predictive Analytics', 'Automation', 'ML Models', 'AI Consulting', 'Integration'],
}

export default function ServicesPage() {
  const navigate = useNavigate()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(data => setServices(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(services.map(s => s.category).filter(Boolean))]

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(s => s.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl border-4 border-cyan-500/30 border-t-cyan-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Wrench size={16} className="text-cyan-400" />
            <span className="text-sm text-gray-400">{services.length} Services Available</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive technology solutions across multiple business units
          </p>
        </motion.div>
      </section>

      {/* Category Quick Links */}
      <section className="px-6 max-w-7xl mx-auto pb-8">
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat !== 'All' && categoryIcons[cat] && (
                <span className="text-current">{categoryIcons[cat]}</span>
              )}
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 max-w-7xl mx-auto pb-12">
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Wrench size={48} className="mx-auto mb-4 opacity-50" />
            <p>No services found in this category</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, i) => (
              <motion.div
                key={service._id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => {
                  const redirect = categoryRedirects[service.category]
                  if (redirect) navigate(redirect)
                }}
                className={`group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/30 transition-all cursor-pointer overflow-hidden`}
              >
                {/* Glow effect */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${categoryGradients[service.category] || 'from-cyan-500 to-blue-600'} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />

                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${categoryGradients[service.category] || 'from-cyan-500 to-blue-600'} mb-4 group-hover:scale-110 transition-transform`}>
                    {categoryIcons[service.category] || <Wrench size={24} className="text-white" />}
                  </div>

                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>

                  {service.category && (
                    <span className={`text-xs px-3 py-1.5 rounded-full bg-gradient-to-r ${categoryGradients[service.category] || 'from-cyan-500/20 to-blue-500/20'} text-white/80 border border-white/10`}>
                      {service.category}
                    </span>
                  )}

                  {/* Features */}
                  {service.category && categoryFeatures[service.category] && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {categoryFeatures[service.category].slice(0, 3).map((feat, j) => (
                        <span key={j} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-gray-500">
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Learn more */}
                  <div className="mt-4 flex items-center gap-1 text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Category Detail Cards */}
      <section className="px-6 max-w-7xl mx-auto pb-20">
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-3">Explore By Unit</p>
          <h2 className="text-4xl font-bold">Our Core Divisions</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(categoryRedirects).map(([category, link], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => navigate(link)}
              className={`group relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-white/10 transition-all cursor-pointer overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${categoryGradients[category]} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${categoryGradients[category]} mb-6 group-hover:scale-110 transition-transform`}>
                  {categoryIcons[category]}
                </div>
                <h3 className="text-2xl font-bold mb-3">{category}</h3>
                <p className="text-gray-400 mb-6">
                  {category === 'Software Development' && 'Custom websites, mobile apps, and enterprise systems built with cutting-edge technology.'}
                  {category === 'IT Training' && 'Professional IT courses with mentorship and certification from industry experts.'}
                  {category === 'Consultancy' && 'Strategic technology advisory, digital transformation, and security audits.'}
                  {category === 'Commerce Market' && 'Premium laptops, phones, accessories, and gadgets with fast delivery.'}
                  {category === 'AI Solutions' && 'Custom AI integration, chatbots, predictive analytics, and automation.'}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(categoryFeatures[category] || []).map((feat, j) => (
                    <span key={j} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                      {feat}
                    </span>
                  ))}
                </div>
                <span className="text-cyan-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explore {category} <ArrowRight size={16} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 p-10 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="text-gray-400 mb-8">Contact us for a free consultation tailored to your needs</p>
              <button onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold text-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto shadow-xl shadow-cyan-500/20">
                Get in Touch <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}