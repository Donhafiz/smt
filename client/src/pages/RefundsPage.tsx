import { motion } from 'framer-motion'
import { Shield, Mail, Phone, ChevronDown, ChevronUp, RotateCcw, Clock, Package, GraduationCap, Wrench } from 'lucide-react'
import { useState } from 'react'

export default function RefundsPage() {
  const [openSection, setOpenSection] = useState<number | null>(null)

  const sections = [
    {
      title: '1. Product Returns (Commerce Market)',
      icon: <Package size={18} />,
      content: `Physical products purchased from our Commerce Market can be returned within 7 days of delivery if unopened and in original condition. Opened electronics may be returned if defective. Return shipping costs are the customer's responsibility unless the product is defective.`
    },
    {
      title: '2. Course Refunds (IT Training)',
      icon: <GraduationCap size={18} />,
      content: `Course enrollment fees are refundable if requested within 48 hours of purchase AND before any course content has been accessed. Once you've started watching lessons or downloading materials, the course is non-refundable. This protects our instructors' intellectual property.`
    },
    {
      title: '3. Service Refunds (Consultancy)',
      icon: <Wrench size={18} />,
      content: `Consultancy and service fees are handled on a case-by-case basis. Deposits are non-refundable. If work has commenced, refunds are prorated based on work completed. Project cancellations require 7 days written notice.`
    },
    {
      title: '4. Non-Refundable Items',
      icon: <Shield size={18} />,
      content: `The following are non-refundable: digital products after download; software licenses after activation; opened software; custom development work after delivery; certificate fees; and sale/clearance items.`
    },
    {
      title: '5. Refund Process',
      icon: <RotateCcw size={18} />,
      content: `To request a refund, contact us at starmedia568@gmail.com or call +233 559 137 611 with your order/receipt number and reason for refund. We'll review your request within 2 business days. Approved refunds are processed within 5-10 business days to your original payment method.`
    },
    {
      title: '6. Processing Time',
      icon: <Clock size={18} />,
      content: `Once approved, refunds typically appear in your account within 5-10 business days depending on your payment method. Mobile Money refunds are usually faster (1-3 days). Bank transfers may take up to 10 business days.`
    },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <RotateCcw size={16} className="text-green-400" />
            <span className="text-sm text-gray-400">Fair & Transparent</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Refund Policy
          </h1>
          <p className="mt-4 text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-10">
          <p className="text-gray-400 text-sm leading-relaxed">
            We stand behind our products and services. If you're not satisfied, we'll work with you to make it right. 
            This policy outlines our refund procedures for products, courses, and services.
          </p>
        </motion.div>

        <div className="space-y-3">
          {sections.map((section, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="glass rounded-xl overflow-hidden">
              <button onClick={() => setOpenSection(openSection === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-green-400">{section.icon}</span>
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
          <h2 className="text-2xl font-bold mb-4">Need a Refund?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:starmedia568@gmail.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold hover:scale-105 transition-all">
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