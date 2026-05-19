import { motion } from 'framer-motion'
import { 
  Building2, Star, Shield, Zap, Globe, Users, ArrowRight,
  Sparkles, CheckCircle2, Handshake, Award, TrendingUp
} from 'lucide-react'

export default function PartnersPage() {
  const partners = [
    { name: 'Google', type: 'Technology Partner', logo: '🔍', desc: 'Official Google for Education partner providing cutting-edge tools and resources.' },
    { name: 'Microsoft', type: 'Training Partner', logo: '💻', desc: 'Microsoft Imagine Academy partner delivering industry-recognized certifications.' },
    { name: 'MTN Ghana', type: 'Telecom Partner', logo: '📡', desc: 'Strategic telecom partner powering connectivity across Ghana.' },
    { name: 'University of Ghana', type: 'Academic Partner', logo: '🎓', desc: 'Collaborating on research, curriculum development, and student programs.' },
    { name: 'Paystack', type: 'Payment Partner', logo: '💳', desc: 'Secure payment processing for all transactions on our platform.' },
    { name: 'Ghana Tech Lab', type: 'Innovation Partner', logo: '🔬', desc: 'Joint initiatives to foster tech innovation and entrepreneurship.' },
  ]

  const benefits = [
    { icon: <Globe size={22} />, title: 'Market Access', desc: 'Reach thousands of students and businesses across Ghana' },
    { icon: <TrendingUp size={22} />, title: 'Co-Branding', desc: 'Joint marketing and brand visibility opportunities' },
    { icon: <Users size={22} />, title: 'Talent Pipeline', desc: 'Access to our pool of trained tech professionals' },
    { icon: <Award size={22} />, title: 'Innovation', desc: 'Collaborate on cutting-edge tech projects' },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Handshake size={14} className="text-green-400" />
            <span className="text-sm text-gray-400">Trusted Collaborators</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Our Partners
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Organizations that trust and collaborate with Star Media Tech
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {partners.map((partner, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }} className="glass rounded-2xl p-6 text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{partner.logo}</div>
              <h3 className="font-bold text-xl">{partner.name}</h3>
              <p className="text-green-400 text-sm font-semibold mt-1">{partner.type}</p>
              <p className="text-gray-400 text-sm mt-3">{partner.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {benefits.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center">
              <div className="text-green-400 mb-3 flex justify-center">{b.icon}</div>
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-10 text-center">
          <Star size={40} className="text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Become a Partner</h2>
          <p className="text-gray-400 mb-6">Join our network of industry leaders and innovators</p>
          <a href="mailto:starmedia568@gmail.com" className="px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold hover:scale-105 transition-all inline-flex items-center gap-2">
            Partner With Us <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </div>
  )
}