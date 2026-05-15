import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Monitor, ShoppingCart, Star, CheckCircle2, Zap, Shield, Users, ArrowRight } from 'lucide-react'

export default function SoftwarePage() {
  const [software, setSoftware] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(d => {
      setSoftware(Array.isArray(d) ? d.filter((p: any) => p.category === 'Software') : [
        { _id: '1', name: 'SMT ERP System', price: 15000, description: 'Complete enterprise resource planning solution for businesses.', features: ['Inventory', 'HR', 'Finance', 'CRM'] },
        { _id: '2', name: 'School Management Pro', price: 8000, description: 'All-in-one school administration platform.', features: ['Attendance', 'Grades', 'Timetable', 'Parent Portal'] },
        { _id: '3', name: 'E-Commerce Platform', price: 12000, description: 'Fully-featured online store with payment integration.', features: ['Products', 'Orders', 'Payments', 'Analytics'] },
      ])
    }).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Software Products</h1>
          <p className="mt-4 text-xl text-gray-400">Ready-made solutions for your business</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {software.map((product) => (
            <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              whileHover={{ y: -8 }} className="glass rounded-3xl p-6 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6">
                <Monitor size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {(product.features || []).map((f: string) => (
                  <span key={f} className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{f}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-cyan-400">GHS {product.price?.toLocaleString()}</span>
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold flex items-center gap-2">
                  <ShoppingCart size={14} /> Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}