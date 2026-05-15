import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, Mail, MapPin, Send, MessageCircle,
  Clock, Globe, CheckCircle2, AlertCircle
} from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate sending
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setTimeout(() => setSubmitted(false), 4000)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  const contactInfo = [
    { icon: <Phone size={22} />, title: 'Phone', details: ['+233 559 137 611', '+233 505 957 381'], action: 'tel:+233559137611', color: 'cyan' },
    { icon: <Mail size={22} />, title: 'Email', details: ['starmedia568@gmail.com', 'iddrisuhafiz568@gmail.com'], action: 'mailto:starmedia568@gmail.com', color: 'purple' },
    { icon: <MapPin size={22} />, title: 'Location', details: ['Tamale, Ghana'], color: 'green' },
    { icon: <Clock size={22} />, title: 'Hours', details: ['Mon - Fri: 8AM - 6PM', 'Sat: 9AM - 2PM'], color: 'orange' },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <MessageCircle size={16} className="text-cyan-400" />
            <span className="text-sm text-gray-400">24/7 Support Available</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="mt-4 text-xl text-gray-400">We'd love to hear from you</p>
        </motion.div>
      </section>

      {/* Contact Cards */}
      <section className="px-6 max-w-5xl mx-auto pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, i) => (
            <motion.a key={i} href={info.action || '#'} target={info.action?.startsWith('http') ? '_blank' : undefined}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:border-cyan-400/30 transition-all cursor-pointer">
              <div className="text-cyan-400 mb-3 flex justify-center">{info.icon}</div>
              <h3 className="font-bold mb-2">{info.title}</h3>
              {info.details.map((d, j) => <p key={j} className="text-gray-400 text-sm">{d}</p>)}
            </motion.a>
          ))}
        </div>
      </section>

      {/* WhatsApp + Form */}
      <section className="px-6 max-w-6xl mx-auto pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* WhatsApp Card */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
            <div className="w-20 h-20 rounded-2xl bg-green-500 flex items-center justify-center mb-6 relative z-10">
              <MessageCircle size={36} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3 relative z-10">Chat on WhatsApp</h2>
            <p className="text-gray-400 mb-6 relative z-10">Get instant responses from our support team</p>
            <a href="https://wa.me/233559137611" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-2xl font-semibold text-lg transition-all relative z-10 flex items-center gap-2">
              <MessageCircle size={20} /> Start Chat
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Send size={22} className="text-cyan-400" /> Send a Message
            </h2>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-300 text-center">
                <CheckCircle2 size={32} className="mx-auto mb-2" />
                Message sent! We'll get back to you soon.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                  <input placeholder="Your Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <input placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                <textarea placeholder="Your Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows={4}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 resize-none" />
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold flex items-center justify-center gap-2">
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={18} />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}