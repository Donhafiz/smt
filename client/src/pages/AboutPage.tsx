import { motion } from 'framer-motion'
import { 
  Target, Eye, Heart, Zap, Users, Globe,
  Award, Clock, TrendingUp, Shield, Sparkles,
  Building2, Star, CheckCircle2, ArrowRight
} from 'lucide-react'

export default function AboutPage() {
  const milestones = [
    { year: '2018', title: 'Founded', desc: 'Star Media Tech was established in Tamale, Ghana with a vision to transform technology education across Africa.' },
    { year: '2019', title: 'First Training Batch', desc: 'Launched our IT Training School with 50 students in web development and programming.' },
    { year: '2020', title: 'Software Division', desc: 'Expanded into custom software development, serving businesses across Ghana with enterprise solutions.' },
    { year: '2021', title: 'Consultancy Launch', desc: 'Added professional IT consultancy services, helping companies with digital transformation strategies.' },
    { year: '2023', title: 'Commerce Market', desc: 'Opened our tech marketplace offering premium laptops, phones, accessories, and gadgets.' },
    { year: '2025', title: 'AI Integration', desc: 'Integrated AI-powered solutions across all business units, leading innovation in West Africa.' },
  ]

  const values = [
    { icon: <Target size={28} />, title: 'Excellence', desc: 'We deliver nothing but the highest quality in every project and service.' },
    { icon: <Heart size={28} />, title: 'Innovation', desc: 'Embracing cutting-edge technology to solve real-world problems.' },
    { icon: <Users size={28} />, title: 'Community', desc: 'Building a tech ecosystem that uplifts everyone in Africa.' },
    { icon: <Shield size={28} />, title: 'Integrity', desc: 'Transparent, ethical, and reliable in all our business dealings.' },
  ]

  const stats = [
    { value: '350+', label: 'Projects Delivered', icon: <Award size={24} /> },
    { value: '1,200+', label: 'Students Trained', icon: <Users size={24} /> },
    { value: '8+', label: 'Years Experience', icon: <Clock size={24} /> },
    { value: '15+', label: 'Countries Reached', icon: <Globe size={24} /> },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Building2 size={16} className="text-cyan-400" />
            <span className="text-sm text-gray-400">Since 2018</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            About SMT
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Premium technology institution delivering innovative solutions across software development, 
            IT training, consultancy, and commerce — building Africa's digital future.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 -mt-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center">
                <div className="text-cyan-400 mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-3xl p-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6">
              <Eye size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To empower individuals and businesses with cutting-edge technology solutions, 
              quality IT education, and reliable tech products that drive growth and innovation 
              across Africa and beyond.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-3xl p-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6">
              <Globe size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              To become Africa's leading technology institution, recognized globally for 
              excellence in software development, IT education, and digital innovation by 2030.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-3">What We Stand For</p>
          <h2 className="text-4xl font-bold">Our Core Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:border-cyan-400/30 transition-all">
              <div className="text-cyan-400 mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-3">Our Journey</p>
          <h2 className="text-4xl font-bold">Company Timeline</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />
          <div className="space-y-8">
            {milestones.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%]'}`}>
                <div className="absolute left-2 md:left-1/2 top-2 w-5 h-5 rounded-full bg-cyan-500 border-4 border-[#020617] transform -translate-x-1/2 z-10" />
                <div className="glass rounded-xl p-5">
                  <span className="text-cyan-400 font-bold text-sm">{item.year}</span>
                  <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}