import { motion } from 'framer-motion'
import { 
  Target, Eye, Heart, Zap, Users, Globe,
  Award, Clock, TrendingUp, Shield
} from 'lucide-react'

export default function AboutPage() {
  const milestones = [
    { year: '2018', title: 'Founded', desc: 'Star Media Tech was established in Tamale, Ghana with a vision to transform technology education.' },
    { year: '2019', title: 'First Training Batch', desc: 'Launched our IT Training School with 50 students in web development.' },
    { year: '2020', title: 'Software Division', desc: 'Expanded into custom software development serving businesses across Ghana.' },
    { year: '2021', title: 'Consultancy Launch', desc: 'Added IT consultancy services helping companies with digital transformation.' },
    { year: '2023', title: 'Commerce Market', desc: 'Opened our tech marketplace offering laptops, phones, and accessories.' },
    { year: '2025', title: 'AI Integration', desc: 'Integrated AI-powered solutions across all business units.' },
  ]

  const values = [
    { icon: <Target size={28} />, title: 'Excellence', desc: 'We deliver nothing but the highest quality in every project.' },
    { icon: <Heart size={28} />, title: 'Innovation', desc: 'Embracing cutting-edge technology to solve real-world problems.' },
    { icon: <Users size={28} />, title: 'Community', desc: 'Building a tech ecosystem that uplifts everyone.' },
    { icon: <Shield size={28} />, title: 'Integrity', desc: 'Transparent, ethical, and reliable in all our dealings.' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About SMT
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Star Media Tech is a premium technology institution delivering innovative 
            solutions across software development, IT training, consultancy, and commerce.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
              <Eye size={28} className="text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To empower individuals and businesses with cutting-edge technology solutions, 
              quality IT education, and reliable tech products that drive growth and innovation 
              across Africa and beyond.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
              <Globe size={28} className="text-purple-400" />
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
          <p className="text-gray-400 mt-3">The principles that guide everything we do</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-cyan-400/30 transition-all"
            >
              <div className="text-cyan-400 mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
          <p className="text-gray-400 mt-3">From startup to industry leader</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform md:-translate-x-0.5" />

          <div className="space-y-8">
            {milestones.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative pl-12 md:pl-0 ${
                  i % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%]'
                }`}
              >
                {/* Dot */}
                <div className={`absolute left-2 md:left-1/2 top-2 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-900 transform -translate-x-1/2 z-10`} />
                
                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-cyan-400 font-bold text-sm">{item.year}</span>
                  <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '350+', label: 'Projects', icon: <Award size={24} /> },
            { value: '1,200+', label: 'Students', icon: <Users size={24} /> },
            { value: '8+', label: 'Years', icon: <Clock size={24} /> },
            { value: '15+', label: 'Countries', icon: <Globe size={24} /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <div className="text-cyan-400 mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}