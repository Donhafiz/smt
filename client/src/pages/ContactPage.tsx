import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, Mail, MapPin, Send, MessageSquare,
  Clock, Globe, ArrowRight
} from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      details: ['+233 559 137 611', '+233 505 957 381'],
      color: 'cyan'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      details: ['starmedia568@gmail.com', 'iddrisuhafiz568@gmail.com'],
      color: 'purple'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      details: ['Tamale, Ghana'],
      color: 'green'
    },
    {
      icon: <Clock size={24} />,
      title: 'Hours',
      details: ['Mon - Fri: 8AM - 6PM', 'Sat: 9AM - 2PM'],
      color: 'orange'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Contact SMT
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with us — we'd love to hear from you
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-6 max-w-5xl mx-auto pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center"
            >
              <div className={`text-${info.color}-400 mb-3 flex justify-center`}>
                {info.icon}
              </div>
              <h3 className="font-semibold mb-2">{info.title}</h3>
              {info.details.map((detail, j) => (
                <p key={j} className="text-gray-400 text-sm">{detail}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="px-6 max-w-6xl mx-auto pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare size={24} className="text-cyan-400" />
              <h2 className="text-2xl font-bold">Send a Message</h2>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-green-300 text-center"
              >
                ✅ Message sent successfully! We'll get back to you soon.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center text-center"
          >
            <Globe size={48} className="text-cyan-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Our Location</h2>
            <p className="text-gray-400 mb-6">Tamale, Ghana</p>
            <div className="w-full h-48 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
              Google Maps Embed
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}