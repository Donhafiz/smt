import { motion } from 'framer-motion'
import { Shield, FileText, Mail, Phone, ChevronDown, ChevronUp, Lock, Eye, Database, Globe } from 'lucide-react'
import { useState } from 'react'

export default function PrivacyPage() {
  const [openSection, setOpenSection] = useState<number | null>(null)

  const sections = [
    {
      title: '1. Information We Collect',
      icon: <Database size={18} />,
      content: `We collect information you provide directly: name, email, phone number, address, and payment information when you create an account, enroll in courses, or make purchases. We also collect usage data including pages visited, time spent, and interactions with our platform.`
    },
    {
      title: '2. How We Use Your Information',
      icon: <Eye size={18} />,
      content: `Your information is used to: provide and improve our services; process transactions and send confirmations; communicate about courses, products, and updates; personalize your learning experience; ensure platform security and prevent fraud; comply with legal obligations.`
    },
    {
      title: '3. Data Protection & Security',
      icon: <Lock size={18} />,
      content: `We implement industry-standard security measures including AES-256 encryption, secure SSL/TLS connections, regular security audits, and access controls. Your payment information is processed by Paystack and is never stored on our servers.`
    },
    {
      title: '4. Data Sharing & Third Parties',
      icon: <Globe size={18} />,
      content: `We do not sell your personal data. We may share information with: payment processors (Paystack) for transactions; email service providers for communications; analytics services to improve our platform. All third parties are contractually bound to protect your data.`
    },
    {
      title: '5. Cookies & Tracking',
      icon: <FileText size={18} />,
      content: `We use essential cookies for site functionality, analytics cookies to understand usage, and preference cookies to remember your settings. You can control cookie preferences through your browser settings. See our Cookie Policy for details.`
    },
    {
      title: '6. Your Rights',
      icon: <Shield size={18} />,
      content: `You have the right to: access your personal data; correct inaccurate information; delete your account and data; withdraw consent for marketing; export your data in a portable format. Contact us to exercise these rights.`
    },
    {
      title: '7. Data Retention',
      icon: <Database size={18} />,
      content: `We retain your personal data as long as your account is active or as needed to provide services. Course completion records and certificates are retained indefinitely unless you request deletion. Financial records are retained as required by law.`
    },
    {
      title: '8. Children\'s Privacy',
      icon: <Shield size={18} />,
      content: `Our services are not intended for children under 13. We do not knowingly collect data from children. If you believe a child has provided us with personal information, contact us immediately.`
    },
    {
      title: '9. Contact Us',
      icon: <Mail size={18} />,
      content: `For privacy-related questions or to exercise your data rights, contact our Data Protection Officer:`
    },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Lock size={16} className="text-cyan-400" />
            <span className="text-sm text-gray-400">Your Privacy Matters</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold mb-3">🔐 Our Commitment</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            At Star Media Tech, we take your privacy seriously. This policy explains how we collect, use, 
            protect, and share your personal information. We are committed to transparency and giving you 
            control over your data.
          </p>
        </motion.div>

        <div className="space-y-3">
          {sections.map((section, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="glass rounded-xl overflow-hidden">
              <button onClick={() => setOpenSection(openSection === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400">{section.icon}</span>
                  <h3 className="font-semibold text-white">{section.title}</h3>
                </div>
                {openSection === i ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
              </button>
              {openSection === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-5 pb-5 text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-8 mt-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:starmedia568@gmail.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:scale-105 transition-all">
              <Mail size={16} /> starmedia568@gmail.com
            </a>
            <a href="tel:+233559137611" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all">
              <Phone size={16} /> +233 559 137 611
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}