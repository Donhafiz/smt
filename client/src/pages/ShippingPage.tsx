import { useTranslation } from 'react-i18next'

import { motion } from 'framer-motion'
import { Truck, Clock, MapPin, Shield } from 'lucide-react'

export default function ShippingPage() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen pt-28 px-6 max-w-4xl mx-auto pb-20">
      <h1 className="text-5xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
        Shipping Information
      </h1>
      <p className="text-gray-400 text-center mb-12">Everything you need to know about delivery</p>

      <div className="grid sm:grid-cols-2 gap-6">
        {[
          { icon: <Truck size={24} />, title: 'Delivery Methods', desc: 'We offer local delivery within Tamale and nationwide shipping via courier partners.' },
          { icon: <Clock size={24} />, title: 'Delivery Time', desc: 'Local: 1-2 business days. Nationwide: 3-5 business days.' },
          { icon: <MapPin size={24} />, title: 'Coverage', desc: 'We deliver to all regions across Ghana.' },
          { icon: <Shield size={24} />, title: 'Tracking', desc: 'Track your order using the tracking number provided after purchase.' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-cyan-400 mb-3">{item.icon}</div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


