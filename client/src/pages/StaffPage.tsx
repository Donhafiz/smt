import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staff } from '../data/staff'
import { 
  Users, Search, Mail, Phone, MapPin, X
} from 'lucide-react'

export default function StaffPage() {
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [selectedMember, setSelectedMember] = useState<any>(null)

  const departments = ['All', ...new Set(staff.map(s => s.department))]

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase())
    const matchesDept = selectedDept === 'All' || member.department === selectedDept
    return matchesSearch && matchesDept
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-cyan-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Our Team
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Meet the talented professionals behind Star Media Tech
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="px-6 max-w-6xl mx-auto pb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search size={18} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search team..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>

          {/* Department Filter */}
          <div className="flex gap-2 flex-wrap justify-center">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  selectedDept === dept
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="px-6 max-w-6xl mx-auto pb-20">
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredStaff.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => setSelectedMember(member)}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/30 cursor-pointer transition-all text-center group"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-4 text-2xl font-bold group-hover:scale-110 transition-transform">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>

                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-cyan-400 text-sm">{member.role}</p>
                <p className="text-gray-500 text-xs mt-1">{member.department}</p>
                {member.description && (
                  <p className="text-gray-400 text-xs mt-2 line-clamp-2">{member.description}</p>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredStaff.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>No team members found</p>
          </div>
        )}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  {selectedMember.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                <p className="text-cyan-400">{selectedMember.role}</p>
                <p className="text-gray-500 text-sm">{selectedMember.department}</p>
                {selectedMember.description && (
                  <p className="text-gray-400 mt-4">{selectedMember.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}