import { motion } from 'framer-motion'
import { Building2, Star } from 'lucide-react'

export default function PartnersPage() {
  const partners = [
    { name: 'Google', type: 'Technology Partner' },
    { name: 'Microsoft', type: 'Training Partner' },
    { name: 'MTN Ghana', type: 'Telecom Partner' },
    { name: 'University of Ghana', type: 'Academic Partner' },
    { name: 'Ghana Tech Lab', type: 'Innovation Partner' },
    { name: 'Paystack', type: 'Payment Partner' },
  ]

  return (
    <div className="min-h-screen pt-28 px-6 max-w-5xl mx-auto pb-20">
      <h1 className="text-5xl font-black text-center bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-4">
        Our Partners
      </h1>
      <p className="text-gray-400 text-center mb-12">Organizations we collaborate with to deliver excellence</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-cyan-400/30 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Building2 size={28} className="text-cyan-400" />
            </div>
            <h3 className="font-bold text-lg">{partner.name}</h3>
            <p className="text-sm text-gray-400 mt-1">{partner.type}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12 p-8 bg-white/5 border border-white/10 rounded-2xl">
        <Star size={32} className="text-yellow-400 mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2">Become a Partner</h2>
        <p className="text-gray-400">Email us at starmedia568@gmail.com</p>
      </div>
    </div>
  )
}