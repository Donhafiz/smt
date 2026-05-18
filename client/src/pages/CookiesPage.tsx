import { motion } from 'framer-motion'
import { Shield, Mail, Phone, ChevronDown, ChevronUp, Cookie, Settings, BarChart3, Globe } from 'lucide-react'
import { useState } from 'react'

export default function CookiesPage() {
  const [openSection, setOpenSection] = useState<number | null>(null)

  const sections = [
    {
      title: '1. What Are Cookies?',
      icon: <Cookie size={18} />,
      content: `Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences, understand how you use the site, and provide essential functionality. Cookies can be "persistent" (remain after closing browser) or "session" (deleted when browser closes).`
    },
    {
      title: '2. Essential Cookies',
      icon: <Settings size={18} />,
      content: `These cookies are necessary for our website to function properly. They enable core features like authentication, security, and shopping cart functionality. Essential cookies cannot be disabled as the site would not work without them.`
    },
    {
      title: '3. Analytics Cookies',
      icon: <BarChart3 size={18} />,
      content: `We use analytics cookies to understand how visitors interact with our site — which pages are popular, how long users stay, and where they come from. This helps us improve our services and user experience. All analytics data is anonymized.`
    },
    {
      title: '4. Preference Cookies',
      icon: <Settings size={18} />,
      content: `These cookies remember your choices — language preference, region, and display settings — so you don't have to set them each time you visit. They make your experience more personalized and efficient.`
    },
    {
      title: '5. Third-Party Cookies',
      icon: <Globe size={18} />,
      content: `Some features on our site use third-party services (like YouTube for course videos, Paystack for payments). These services may set their own cookies. We don't control these cookies — please check the respective third-party privacy policies.`
    },
    {
      title: '6. Managing Cookies',
      icon: <Settings size={18} />,
      content: `You can control and delete cookies through your browser settings. You can block all cookies, delete existing cookies, or set notifications for new cookies. Note that disabling essential cookies may affect site functionality.`
    },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Cookie size={16} className="text-amber-400" />
            <span className="text-sm text-gray-400">Transparency</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="mt-4 text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-10">
          <p className="text-gray-400 text-sm leading-relaxed">
            This Cookie Policy explains how Star Media Tech uses cookies and similar technologies on our website. 
            By continuing to use our site, you consent to our use of cookies as described below.
          </p>
        </motion.div>

        <div className="space-y-3">
          {sections.map((section, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="glass rounded-xl overflow-hidden">
              <button onClick={() => setOpenSection(openSection === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-amber-400">{section.icon}</span>
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
          <h2 className="text-2xl font-bold mb-4">Questions About Cookies?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:starmedia568@gmail.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-semibold hover:scale-105 transition-all">
              <Mail size={16} /> starmedia568@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}