// client/src/pages/ConsultancyPage.tsx
import { useState, useEffect } from 'react'
import api from '../lib/axios'
import { useAuth } from '../context/AuthContext'
import { Phone, Mail, Send } from 'lucide-react'

export default function ConsultancyPage() {
  const [staff, setStaff] = useState([])
  const [form, setForm] = useState({ name: '', email: '', phone: '', description: '', serviceType: 'Consultancy' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    api.get('/staff').then(res => setStaff(res.data)).catch(console.error)
  }, [])

  const handleHire = async (e) => {
    e.preventDefault()
    await api.post('/ai-requests', form)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', phone: '', description: '', serviceType: 'Consultancy' })
  }

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto pb-20">
      <h1 className="text-5xl font-black text-center mb-12">Hire Our Experts</h1>

      {/* Staff Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {staff.slice(0, 8).map(member => (
          <div key={member._id} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mx-auto mb-3 flex items-center justify-center text-2xl font-bold">
              {member.name?.charAt(0)}
            </div>
            <h3 className="font-bold">{member.name}</h3>
            <p className="text-cyan-400 text-sm">{member.role}</p>
            <a href={`tel:${member.phone || ''}`} className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-2"><Phone size={12} /> Contact</a>
          </div>
        ))}
      </div>

      {/* Hire Form */}
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Request Consultation / AI Solution</h2>
        {submitted ? (
          <div className="bg-green-500/20 p-4 rounded text-green-300">Request sent! We'll contact you soon.</div>
        ) : (
          <form onSubmit={handleHire} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-white/5 border border-white/10 rounded p-2 text-white" required />
              <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="bg-white/5 border border-white/10 rounded p-2 text-white" required />
              <input type="tel" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="bg-white/5 border border-white/10 rounded p-2 text-white" />
              <select value={form.serviceType} onChange={e => setForm({...form, serviceType: e.target.value})} className="bg-white/5 border border-white/10 rounded p-2 text-white">
                <option value="Consultancy">IT Consultancy</option>
                <option value="AI Solution">AI Solution</option>
                <option value="Software Development">Software Development</option>
              </select>
            </div>
            <textarea placeholder="Describe your needs..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white" required />
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg flex items-center justify-center gap-2">
              <Send size={16} /> Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  )
}