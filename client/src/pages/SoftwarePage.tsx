import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Monitor, ShoppingCart, Code, Database, Globe, Shield, Cloud, Smartphone } from 'lucide-react'

export default function SoftwarePage() {
  const [software, setSoftware] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://smt-backend-amad.onrender.com/api/products')
      .then(r => r.json())
      .then(data => {
        const allProducts = Array.isArray(data) ? data : []
        // Filter software products OR show all if none found
        const softwareProducts = allProducts.filter((p: any) => 
          p.category === 'Software' || 
          p.name?.toLowerCase().includes('software') ||
          p.name?.toLowerCase().includes('system') ||
          p.name?.toLowerCase().includes('platform') ||
          p.name?.toLowerCase().includes('erp')
        )
        
        // If no software-specific products, show these defaults
        if (softwareProducts.length === 0) {
          setSoftware([
            { _id: 's1', name: 'SMT ERP System', price: 15000, description: 'Complete enterprise resource planning solution for businesses of all sizes.', features: ['Inventory Management', 'HR & Payroll', 'Financial Accounting', 'CRM Integration', 'Real-time Analytics'] },
            { _id: 's2', name: 'School Management Pro', price: 8000, description: 'All-in-one school administration platform for modern educational institutions.', features: ['Student Records', 'Attendance Tracking', 'Grade Management', 'Parent Portal', 'Timetable Scheduler'] },
            { _id: 's3', name: 'E-Commerce Platform', price: 12000, description: 'Fully-featured online store with integrated payment processing and analytics.', features: ['Product Management', 'Order Processing', 'Payment Integration', 'Customer Dashboard', 'Sales Analytics'] },
            { _id: 's4', name: 'Hospital Management System', price: 20000, description: 'Complete healthcare management solution for clinics and hospitals.', features: ['Patient Records', 'Appointment Scheduling', 'Billing System', 'Lab Results', 'Pharmacy Management'] },
            { _id: 's5', name: 'Church Management Software', price: 5000, description: 'Comprehensive church administration and member management platform.', features: ['Member Database', 'Event Management', 'Donation Tracking', 'Communication Tools', 'Attendance Records'] },
            { _id: 's6', name: 'Real Estate Platform', price: 18000, description: 'Property listing and management solution for real estate agencies.', features: ['Property Listings', 'Client Management', 'Virtual Tours', 'Document Management', 'Commission Tracking'] },
          ])
        } else {
          setSoftware(softwareProducts)
        }
      })
      .catch(() => {
        // Fallback data if API fails
        setSoftware([
          { _id: 's1', name: 'SMT ERP System', price: 15000, description: 'Complete enterprise resource planning solution.', features: ['Inventory', 'HR', 'Finance', 'CRM'] },
          { _id: 's2', name: 'School Management Pro', price: 8000, description: 'All-in-one school administration platform.', features: ['Attendance', 'Grades', 'Timetable', 'Parent Portal'] },
          { _id: 's3', name: 'E-Commerce Platform', price: 12000, description: 'Fully-featured online store.', features: ['Products', 'Orders', 'Payments', 'Analytics'] },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  const iconMap: Record<string, any> = {
    'Inventory Management': <Database size={14} />,
    'HR & Payroll': <UsersIcon size={14} />,
    'Financial Accounting': <DollarIcon size={14} />,
    'CRM Integration': <UsersIcon size={14} />,
    'Real-time Analytics': <ChartIcon size={14} />,
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Monitor size={16} className="text-cyan-400" />
            <span className="text-sm text-gray-400">{software.length} Solutions Available</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Software Products
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Ready-made software solutions to transform your business operations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {software.map((product) => (
            <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              whileHover={{ y: -8 }} className="glass rounded-3xl p-6 group relative overflow-hidden">
              {/* Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Monitor size={28} className="text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{product.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {(product.features || []).slice(0, 4).map((f: string) => (
                    <span key={f} className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {f}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-2xl font-black text-cyan-400">GHS {product.price?.toLocaleString()}</span>
                  <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-cyan-500/20">
                    <ShoppingCart size={16} /> Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 text-center glass rounded-3xl p-10">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-400 mb-6">We build tailored software for your specific business needs</p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold text-lg hover:scale-105 transition-all">
            Request Custom Software
          </button>
        </motion.div>
      </div>
    </div>
  )
}

// Simple icon components
function UsersIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}

function DollarIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
}

function ChartIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
}