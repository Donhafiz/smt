import { motion } from 'framer-motion'
import { HelpCircle, ChevronDown, Search } from 'lucide-react'
import { useState } from 'react'

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { q: 'How do I enroll in a course?', a: 'Contact us at +233 559 137 611 or visit our office in Tamale. You can also fill out the contact form on our website.' },
    { q: 'What payment methods do you accept?', a: 'We accept Mobile Money (MTN MoMo, Vodafone Cash), bank transfer, and cash payments at our office.' },
    { q: 'How long does website development take?', a: 'Depending on complexity, 1-4 weeks. We\'ll give you a timeline during consultation.' },
    { q: 'Do you offer remote training?', a: 'Yes! We offer both in-person and online training options for all our courses.' },
    { q: 'What is your refund policy?', a: 'We offer full refunds within 7 days of purchase. See our Refund Policy page for details.' },
  ]

  return (
    <div className="min-h-screen pt-28 px-6 max-w-3xl mx-auto pb-20">
      <h1 className="text-5xl font-black text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
        Help Center
      </h1>
      <p className="text-gray-400 text-center mb-12">Find answers to common questions</p>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-all"
            >
              <span className="font-medium flex items-center gap-3">
                <HelpCircle size={18} className="text-cyan-400" />
                {faq.q}
              </span>
              <ChevronDown size={18} className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 text-gray-400 pl-12">
                {faq.a}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-400">Still need help? <a href="/contact" className="text-cyan-400">Contact us</a></p>
      </div>
    </div>
  )
}