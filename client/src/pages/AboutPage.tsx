import { motion } from 'framer-motion'
import { Target, Eye, Heart, Zap, Users, Globe, Award, Clock, Shield, Building2, Star, TrendingUp } from 'lucide-react'

export default function AboutPage() {
  const milestones = [
    { year: '2018', title: 'Founded', desc: 'Star Media Tech was established in Tamale, Ghana with a vision to transform technology education across Africa.' },
    { year: '2019', title: 'First Training Batch', desc: 'Launched IT Training School with 50 students in web development and programming.' },
    { year: '2020', title: 'Software Division', desc: 'Expanded into custom software development serving businesses across Ghana.' },
    { year: '2021', title: 'Consultancy Launch', desc: 'Added professional IT consultancy services for digital transformation.' },
    { year: '2023', title: 'Commerce Market', desc: 'Opened tech marketplace offering premium laptops, phones, and accessories.' },
    { year: '2025', title: 'AI Integration', desc: 'Integrated AI-powered solutions across all business units.' },
  ]

  const values = [
    { icon: <Target size={28} />, title: 'Excellence', desc: 'Highest quality in every project and service.' },
    { icon: <Heart size={28} />, title: 'Innovation', desc: 'Cutting-edge technology for real-world problems.' },
    { icon: <Users size={28} />, title: 'Community', desc: 'Building a tech ecosystem that uplifts everyone.' },
    { icon: <Shield size={28} />, title: 'Integrity', desc: 'Transparent, ethical, and reliable.' },
  ]

  const stats = [
    { value: '350+', label: 'Projects', icon: <Award size={24} /> },
    { value: '1,200+', label: 'Students', icon: <Users size={24} /> },
    { value: '8+', label: 'Years', icon: <Clock size={24} /> },
    { value: '15+', label: 'Countries', icon: <Globe size={24} /> },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Building2 size={16} className="text-cyan-400" />
            <span className="text-sm text-gray-400">Since 2018</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">About SMT</h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">Building Africa's digital future from Tamale, Ghana</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center">
              <div className="text-cyan-400 mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass rounded-3xl p-8">
            <Eye size={32} className="text-cyan-400 mb-4" />
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-gray-400">To empower individuals and businesses with cutting-edge technology solutions, quality IT education, and reliable tech products.</p>
          </div>
          <div className="glass rounded-3xl p-8">
            <Globe size={32} className="text-purple-400 mb-4" />
            <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
            <p className="text-gray-400">To become Africa's leading technology institution, recognized globally for excellence by 2030.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((item, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center hover:border-cyan-400/30 transition-all">
              <div className="text-cyan-400 mb-4 flex justify-center">{item.icon}</div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500" />
            <div className="space-y-8">
              {milestones.map((item, i) => (
                <div key={i} className={`relative pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%]'}`}>
                  <div className="absolute left-2 md:left-1/2 top-2 w-5 h-5 rounded-full bg-cyan-500 border-4 border-[#020617] transform -translate-x-1/2 z-10" />
                  <div className="glass rounded-xl p-5">
                    <span className="text-cyan-400 font-bold text-sm">{item.year}</span>
                    <h3 className="font-bold mt-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}