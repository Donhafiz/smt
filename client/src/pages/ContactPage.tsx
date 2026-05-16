import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }, 3000) }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <MessageCircle size={16} className="text-cyan-400" />
            <span className="text-sm text-gray-400">24/7 Support</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-400">We'd love to hear from you</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Phone size={22} />, title: 'Phone', value: '+233 559 137 611', href: 'tel:+233559137611' },
            { icon: <Mail size={22} />, title: 'Email', value: 'starmedia568@gmail.com', href: 'mailto:starmedia568@gmail.com' },
            { icon: <MapPin size={22} />, title: 'Location', value: 'Tamale, Ghana' },
            { icon: <Clock size={22} />, title: 'Hours', value: 'Mon-Fri 8AM-6PM' },
          ].map((item, i) => (
            <a key={i} href={item.href} className="glass rounded-2xl p-6 text-center hover:border-cyan-400/30 transition-all">
              <div className="text-cyan-400 mb-3 flex justify-center">{item.icon}</div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.value}</p>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <a href="https://wa.me/233559137611" target="_blank" rel="noopener noreferrer"
            className="glass rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:border-green-400/30 transition-all group">
            <div className="w-20 h-20 rounded-2xl bg-green-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle size={36} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Chat on WhatsApp</h2>
            <p className="text-gray-400">Get instant responses from our team</p>
          </a>

          <div className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Send size={22} className="text-cyan-400" /> Send a Message</h2>
            {submitted ? (
              <div className="text-center p-6 bg-green-500/10 rounded-2xl text-green-400"><CheckCircle2 size={32} className="mx-auto mb-2" />Message sent successfully!</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                  <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <input placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                <textarea placeholder="Your Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows={4} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 resize-none" />
                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"><Send size={18} /> Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}