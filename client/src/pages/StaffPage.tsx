import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, Search, X, Mail, Phone, MapPin, Briefcase,
  GraduationCap, Star, Award, Linkedin, Twitter, Globe,
  ChevronRight, Filter, SlidersHorizontal, Grid3X3, List,
  Sparkles, MessageCircle, Calendar, Clock, Shield
} from 'lucide-react'

interface StaffMember {
  _id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  photo: string
  bio: string
  staffId: string
  skills: string[]
  education: any[]
  socialLinks?: { linkedin?: string; twitter?: string; website?: string }
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetch('http://localhost:5000/api/staff')
      .then(res => res.json())
      .then(data => setStaff(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const departments = ['All', ...new Set(staff.map(s => s.department).filter(Boolean))]

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name?.toLowerCase().includes(search.toLowerCase()) ||
      member.role?.toLowerCase().includes(search.toLowerCase()) ||
      member.staffId?.toLowerCase().includes(search.toLowerCase())
    const matchesDept = selectedDept === 'All' || member.department === selectedDept
    return matchesSearch && matchesDept
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl border-4 border-cyan-500/30 border-t-cyan-400"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Users size={16} className="text-cyan-400" />
            <span className="text-sm text-gray-400">{staff.length} Team Members</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Team
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Meet the brilliant minds behind Star Media Tech's success
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="px-6 max-w-7xl mx-auto pb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass rounded-2xl p-4">
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-4 top-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, role, or staff ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
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

          <div className="flex gap-1">
            <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white'}`}>
              <Grid3X3 size={16} />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white'}`}>
              <List size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Staff Grid/List */}
      <section className="px-6 max-w-7xl mx-auto pb-20">
        {filteredStaff.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>No team members found</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredStaff.map((member) => (
                <motion.div
                  key={member._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedMember(member)}
                  className="glass rounded-2xl p-6 cursor-pointer group text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-bl-3xl" />
                  
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4 overflow-hidden ring-4 ring-cyan-500/20 group-hover:ring-cyan-500/40 transition-all">
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl font-bold text-white">{member.name?.charAt(0)}</span>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-cyan-400 text-sm">{member.role}</p>
                    <p className="text-gray-500 text-xs mt-1">{member.department}</p>
                    <p className="text-gray-600 text-[10px] mt-2">{member.staffId}</p>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="text-sm text-cyan-400 flex items-center gap-1">
                      View Profile <ChevronRight size={14} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStaff.map((member) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedMember(member)}
                className="glass rounded-2xl p-6 cursor-pointer hover:border-cyan-400/30 transition-all flex items-center gap-6"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-white">{member.name?.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-cyan-400 text-sm">{member.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">{member.department}</p>
                  <p className="text-gray-600 text-xs">{member.staffId}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0f172a] border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4 overflow-hidden ring-4 ring-cyan-500/20">
                  {selectedMember.photo ? (
                    <img src={selectedMember.photo} alt={selectedMember.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-white">{selectedMember.name?.charAt(0)}</span>
                  )}
                </div>
                <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                <p className="text-cyan-400 text-lg">{selectedMember.role}</p>
                <p className="text-gray-500">{selectedMember.department} • {selectedMember.staffId}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedMember.email && (
                  <a href={`mailto:${selectedMember.email}`} className="glass rounded-xl p-4 flex items-center gap-3 hover:border-cyan-400/30 transition-all">
                    <Mail size={18} className="text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm text-white">{selectedMember.email}</p>
                    </div>
                  </a>
                )}
                {selectedMember.phone && (
                  <a href={`tel:${selectedMember.phone}`} className="glass rounded-xl p-4 flex items-center gap-3 hover:border-cyan-400/30 transition-all">
                    <Phone size={18} className="text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm text-white">{selectedMember.phone}</p>
                    </div>
                  </a>
                )}
              </div>

              {selectedMember.bio && (
                <div className="glass rounded-xl p-4 mb-6">
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-gray-400 text-sm">{selectedMember.bio}</p>
                </div>
              )}

              {selectedMember.skills?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <a href={`mailto:${selectedMember.email}`} className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-center">
                  Send Message
                </a>
                <a href={`tel:${selectedMember.phone}`} className="flex-1 py-3 border border-white/20 rounded-xl font-semibold text-center hover:bg-white/10 transition-all">
                  Call Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}