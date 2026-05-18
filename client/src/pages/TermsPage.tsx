import { motion } from 'framer-motion'
import { Shield, FileText, Mail, Phone, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function TermsPage() {
  const [openSection, setOpenSection] = useState<number | null>(null)

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index)
  }

  const sections = [
    {
      title: '1. Acceptance of Terms',
      icon: <FileText size={20} />,
      content: `By accessing or using Star Media Tech ("SMT") services, including our website, mobile applications, 
      learning platform, marketplace, and any other services we provide, you agree to be legally bound by these 
      Terms of Service. If you do not agree to these terms, please do not use our services.`
    },
    {
      title: '2. Services Provided',
      icon: <Shield size={20} />,
      content: `Star Media Tech provides the following services:
      • Software Development — Custom websites, mobile applications, enterprise systems
      • IT Training School — Professional courses with certification
      • IT Consultancy — Technology advisory and digital transformation
      • Commerce Market — Online marketplace for tech products
      • AI Solutions — Custom artificial intelligence integration
      
      All services are subject to availability and may be modified, suspended, or discontinued at our discretion 
      with reasonable notice.`
    },
    {
      title: '3. User Accounts & Registration',
      icon: <Shield size={20} />,
      content: `To access certain features, you must create an account with accurate and complete information. 
      You are responsible for maintaining the confidentiality of your account credentials and for all activities 
      under your account. You must be at least 18 years old to create an account. SMT reserves the right to 
      suspend or terminate accounts that violate these terms.`
    },
    {
      title: '4. Payments & Billing',
      icon: <Shield size={20} />,
      content: `All payments are processed securely through our payment partners (Paystack, Mobile Money, Bank Transfer). 
      Prices are displayed in Ghana Cedis (GHS) and are subject to change without notice. 
      
      For courses: Full payment is required before access is granted.
      For products: Payment is required at checkout before shipping.
      For services: Payment terms are outlined in individual service agreements.
      
      Refunds are governed by our separate Refund Policy.`
    },
    {
      title: '5. Course Enrollment & Access',
      icon: <Shield size={20} />,
      content: `Upon successful payment for a course, you receive lifetime access to the course materials, 
      including video lessons, resources, and certificate upon completion. Course access is for individual use only 
      and may not be shared, resold, or distributed without written permission from SMT.`
    },
    {
      title: '6. Intellectual Property Rights',
      icon: <Shield size={20} />,
      content: `All content on this website including but not limited to text, graphics, logos, images, videos, 
      course materials, software code, and design elements are the exclusive property of Star Media Tech or its 
      licensors. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.`
    },
    {
      title: '7. Marketplace & Product Sales',
      icon: <Shield size={20} />,
      content: `Products sold through our Commerce Market are sourced from verified vendors. Product descriptions, 
      images, and specifications are provided by vendors and SMT is not liable for inaccuracies. All product sales 
      are subject to our Return and Refund Policy. Vendors are independent third parties and SMT acts solely as 
      a marketplace facilitator.`
    },
    {
      title: '8. User Conduct & Prohibited Activities',
      icon: <Shield size={20} />,
      content: `You agree not to:
      • Use our services for any illegal or unauthorized purpose
      • Attempt to gain unauthorized access to any part of our systems
      • Interfere with or disrupt our services or servers
      • Harass, abuse, or harm other users
      • Upload malicious code or content
      • Violate any applicable laws or regulations`
    },
    {
      title: '9. Privacy & Data Protection',
      icon: <Shield size={20} />,
      content: `We take your privacy seriously. Our collection and use of personal information is governed by 
      our Privacy Policy. We implement industry-standard security measures to protect your data but cannot 
      guarantee absolute security. By using our services, you consent to our data practices as described in 
      our Privacy Policy and Cookie Policy.`
    },
    {
      title: '10. Limitation of Liability',
      icon: <Shield size={20} />,
      content: `To the fullest extent permitted by law, Star Media Tech shall not be liable for any indirect, 
      incidental, special, consequential, or punitive damages arising from your use of our services. Our total 
      liability for any claim shall not exceed the amount you paid us in the 12 months preceding the claim.`
    },
    {
      title: '11. Third-Party Links & Services',
      icon: <Shield size={20} />,
      content: `Our website may contain links to third-party websites or services. We are not responsible for 
      the content, accuracy, or practices of any third-party sites. Your use of such services is at your own 
      risk and subject to their respective terms and policies.`
    },
    {
      title: '12. Modifications to Terms',
      icon: <Shield size={20} />,
      content: `We reserve the right to modify these Terms at any time. Changes will be effective immediately 
      upon posting. Your continued use of our services after modifications constitutes acceptance of the updated 
      Terms. We will notify users of material changes via email or website notification.`
    },
    {
      title: '13. Termination',
      icon: <Shield size={20} />,
      content: `We may terminate or suspend your account and access to our services immediately, without prior 
      notice, for any violation of these Terms. Upon termination, your right to use our services ceases immediately. 
      Provisions regarding intellectual property, liability, and indemnification survive termination.`
    },
    {
      title: '14. Governing Law',
      icon: <Shield size={20} />,
      content: `These Terms shall be governed by and construed in accordance with the laws of the Republic of 
      Ghana. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts 
      in Ghana.`
    },
    {
      title: '15. Contact Information',
      icon: <Shield size={20} />,
      content: `For questions, concerns, or legal notices regarding these Terms of Service, please contact us at:`
    },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Shield size={16} className="text-cyan-400" />
            <span className="text-sm text-gray-400">Legal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="mt-4 text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Quick Summary Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <FileText size={18} className="text-cyan-400" /> Quick Summary
          </h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>✅ By using SMT, you agree to these terms</li>
            <li>✅ Create an account to access courses and purchases</li>
            <li>✅ Payments are processed securely via Paystack</li>
            <li>✅ Course access is lifetime and for individual use only</li>
            <li>✅ We protect your data as per our Privacy Policy</li>
          </ul>
        </motion.div>

        {/* Accordion Sections */}
        <div className="space-y-3">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400">{section.icon}</span>
                  <h3 className="font-semibold text-white">{section.title}</h3>
                </div>
                {openSection === i ? (
                  <ChevronUp size={16} className="text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openSection === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 text-gray-400 text-sm leading-relaxed whitespace-pre-line"
                >
                  {section.content}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-8 mt-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Have Questions About Our Terms?</h2>
          <p className="text-gray-400 mb-6">Our team is here to help clarify any concerns.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:starmedia568@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:scale-105 transition-all">
              <Mail size={16} /> starmedia568@gmail.com
            </a>
            <a href="tel:+233559137611"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all">
              <Phone size={16} /> +233 559 137 611
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}