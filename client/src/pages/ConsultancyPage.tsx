import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Phone, Mail, Briefcase, Send, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ConsultancyPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', date: '', time: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 4000) }

  const packages = [
    { name: 'Basic Audit', price: 'GHS 2,000', features: ['Security assessment', 'Basic report', '1 consultation'] },
    { name: 'Professional', price: 'GHS 5,000', features: ['Full security audit', 'Detailed report', '3 consultations', 'Action plan'] },
    { name: 'Enterprise', price: 'GHS 15,000', features: ['Complete audit', 'Full report', 'Unlimited consultations', 'Implementation support', '12-month monitoring'] },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">IT Consultancy</h1>
          <p className="mt-4 text-xl text-gray-400">Book a consultation with our expert team</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {packages.map((pkg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }} className="glass rounded-3xl p-6 text-center">
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-3xl font-black text-orange-400 mb-4">{pkg.price}</p>
              <div className="space-y-2 mb-6">{pkg.features.map(f => <div key={f} className="flex items-center gap-2 text-sm text-gray-400"><CheckCircle2 size={14} className="text-green-400" /> {f}</div>)}</div>
              <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-semibold">Select Plan</button>
            </motion.div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Calendar size={22} className="text-orange-400" /> Book a Session</h2>
            {submitted ? (
              <div className="text-center p-6 bg-green-500/10 rounded-2xl text-green-400"><CheckCircle2 size={32} className="mx-auto mb-2" />Booking submitted! We'll contact you shortly.</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Name" required className="p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400" onChange={e => setForm({...form, name: e.target.value})} />
                  <input placeholder="Email" type="email" required className="p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400" onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Phone" type="tel" className="p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400" onChange={e => setForm({...form, phone: e.target.value})} />
                  <input placeholder="Company" className="p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400" onChange={e => setForm({...form, company: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400" onChange={e => setForm({...form, date: e.target.value})} />
                  <input type="time" className="p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400" onChange={e => setForm({...form, time: e.target.value})} />
                </div>
                <textarea placeholder="Describe your needs..." rows={3} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400 resize-none" onChange={e => setForm({...form, message: e.target.value})} />
                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"><Send size={18} /> Book Consultation</button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}