import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Users, Search, X, Mail, Phone,
  GraduationCap, Star, Award, Linkedin, Twitter, Globe,
  ChevronRight, Grid3X3, List,
  MessageCircle, ArrowUpRight, Shield, Sparkles
} from 'lucide-react'

interface StaffMember {
  _id: string; name: string; email: string; phone: string
  role: string; department: string; photo: string; bio: string
  staffId: string; skills: string[]; education: any[]
  socialLinks?: { linkedin?: string; twitter?: string; website?: string }
}

const DEPT_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  'Software Development': { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)',  border: 'rgba(6,182,212,0.2)'  },
  'IT Training':          { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)' },
  'Consultancy':          { color: '#f97316', bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.2)'  },
  'Commerce Market':      { color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.2)'  },
  'Admin':                { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.2)'  },
}
const getDeptStyle = (dept: string) =>
  DEPT_COLORS[dept] ?? { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)' }

function Avatar({ member, size = 'lg' }: { member: StaffMember; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const dims = { sm: 40, md: 56, lg: 80, xl: 120 }
  const dim = dims[size]
  const initials = member.name?.split(' ').map(n => n[0]).slice(0, 2).join('') || '?'
  const theme = getDeptStyle(member.department)  // ✅ This line must exist!

  return (
    <div className="relative flex-shrink-0 rounded-2xl overflow-hidden ring-2 transition-all duration-300 group-hover:ring-4"
      style={{ width: dim, height: dim, background: `linear-gradient(135deg, ${theme.color}30, ${theme.color}10)` }}>
      {member.photo ? (
        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-full flex items-center justify-center font-black text-white"
          style={{ fontSize: dim * 0.32, color: theme.color }}>
          {initials}
        </div>
      )}
    </div>
  )
}

// ── Profile modal ──────────────────────────────────────────────────────────
function ProfileModal({ member, onClose }: { member: StaffMember; onClose: () => void }) {
  const ds = getDeptStyle(member.department)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(2,6,23,0.88)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 24, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg rounded-3xl overflow-hidden max-h-[92vh] overflow-y-auto"
        style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}>

        {/* Top accent */}
        <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${ds.color}, transparent)` }} />

        {/* Header banner */}
        <div className="relative px-8 pt-8 pb-6 text-center"
          style={{ background: `linear-gradient(135deg, ${ds.bg}, transparent)` }}>
          <button onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 text-slate-500 hover:text-white transition-all">
            <X size={18} />
          </button>

          <Avatar member={member} size="xl" />
          <h2 className="font-display font-black text-white text-2xl mt-4 mb-1">{member.name}</h2>
          <p style={{ color: ds.color }} className="font-body text-sm font-semibold">{member.role}</p>
          <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-body font-semibold"
            style={{ background: ds.bg, border: `1px solid ${ds.border}`, color: ds.color }}>
            {member.department}
          </div>
          <p className="font-body text-[11px] text-slate-600 mt-1.5">{member.staffId}</p>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 space-y-5">
          {/* Contact */}
          <div className="grid grid-cols-2 gap-3">
            {member.email && (
              <a href={`mailto:${member.email}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl transition-all hover:border-cyan-400/30 group"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Mail size={15} className="text-cyan-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-body text-[10px] text-slate-600 uppercase tracking-wider">Email</p>
                  <p className="font-body text-xs text-slate-300 truncate">{member.email}</p>
                </div>
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl transition-all hover:border-cyan-400/30"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Phone size={15} className="text-cyan-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-body text-[10px] text-slate-600 uppercase tracking-wider">Phone</p>
                  <p className="font-body text-xs text-slate-300 truncate">{member.phone}</p>
                </div>
              </a>
            )}
          </div>

          {/* Bio */}
          {member.bio && (
            <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="font-body text-[10px] text-slate-600 uppercase tracking-wider mb-2 font-semibold">About</p>
              <p className="font-body text-slate-400 text-sm leading-relaxed">{member.bio}</p>
            </div>
          )}

          {/* Skills */}
          {member.skills?.length > 0 && (
            <div>
              <p className="font-body text-[10px] text-slate-600 uppercase tracking-wider mb-3 font-semibold">Skills</p>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, i) => (
                  <span key={i} className="font-body text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{ background: ds.bg, border: `1px solid ${ds.border}`, color: ds.color }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Socials */}
          {(member.socialLinks?.linkedin || member.socialLinks?.twitter || member.socialLinks?.website) && (
            <div className="flex gap-3">
              {member.socialLinks?.linkedin && (
                <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl transition-all hover:scale-110 font-body text-xs text-slate-500 hover:text-blue-400"
                  style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
                  <Linkedin size={16} />
                </a>
              )}
              {member.socialLinks?.twitter && (
                <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl transition-all hover:scale-110 text-slate-500 hover:text-sky-400"
                  style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.15)' }}>
                  <Twitter size={16} />
                </a>
              )}
              {member.socialLinks?.website && (
                <a href={member.socialLinks.website} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl transition-all hover:scale-110 text-slate-500 hover:text-white"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Globe size={16} />
                </a>
              )}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex gap-3 pt-2">
            <a href={`mailto:${member.email}`}
              className="flex-1 py-3.5 rounded-2xl font-body font-semibold text-sm text-center text-white"
              style={{ background: `linear-gradient(135deg, ${ds.color}cc, ${ds.color}88)` }}>
              Send Message
            </a>
            <a href={`tel:${member.phone}`}
              className="flex-1 py-3.5 rounded-2xl font-body font-semibold text-sm text-center text-slate-300 hover:text-white transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              Call Now
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════════════════════
export default function StaffPage() {
  const [staff, setStaff]               = useState<StaffMember[]>([])
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [selected, setSelected]         = useState<StaffMember | null>(null)
  const [viewMode, setViewMode]         = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetch('https://smt-backend-amad.onrender.com/api/staff')
      .then(r => r.json())
      .then(d => setStaff(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const departments = ['All', ...new Set(staff.map(s => s.department).filter(Boolean))]
  const filtered = staff.filter(m => {
    const q = search.toLowerCase()
    const matchSearch = m.name?.toLowerCase().includes(q) || m.role?.toLowerCase().includes(q) || m.staffId?.toLowerCase().includes(q)
    const matchDept   = selectedDept === 'All' || m.department === selectedDept
    return matchSearch && matchDept
  })

  const SkeletonGrid = () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="rounded-2xl animate-pulse p-6"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="w-20 h-20 rounded-2xl mx-auto mb-4" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="h-4 rounded-full w-3/4 mx-auto mb-2" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="h-3 rounded-full w-1/2 mx-auto" style={{ background: 'rgba(255,255,255,0.04)' }} />
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen text-white" style={{ background: '#020617' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,900&family=DM+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Bricolage Grotesque', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .dept-pill { cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; border: 1px solid transparent; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.6) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs mb-6 uppercase tracking-widest font-semibold"
            style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', color: '#06b6d4' }}>
            <Users size={13} /> {staff.length} Team Members
          </div>
          <h1 className="font-display font-black leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            <span className="text-white">Meet the</span>{' '}
            <span style={{ background: 'linear-gradient(135deg, #06b6d4, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Team
            </span>
          </h1>
          <p className="font-body text-slate-400" style={{ fontSize: '1.1rem' }}>
            The brilliant minds powering Star Media Tech's mission across Ghana and beyond.
          </p>
        </motion.div>
      </section>

      {/* ── FILTERS ──────────────────────────────────────────────────── */}
      <section className="px-6 max-w-7xl mx-auto mb-10">
        <div className="rounded-2xl p-4 space-y-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
              <input type="text" placeholder="Search by name, role, or staff ID…" value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl font-body text-sm text-white placeholder-slate-600 outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(6,182,212,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')} />
            </div>
            {/* View toggle */}
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              {(['grid', 'list'] as const).map(v => (
                <button key={v} onClick={() => setViewMode(v)}
                  className="p-2 rounded-lg transition-all"
                  style={{ background: viewMode === v ? 'rgba(6,182,212,0.2)' : 'transparent', color: viewMode === v ? '#06b6d4' : '#64748b' }}>
                  {v === 'grid' ? <Grid3X3 size={15} /> : <List size={15} />}
                </button>
              ))}
            </div>
          </div>

          {/* Dept pills */}
          <div className="flex flex-wrap gap-2">
            {departments.map(d => {
              const ds = getDeptStyle(d)
              const active = selectedDept === d
              return (
                <button key={d} onClick={() => setSelectedDept(d)}
                  className="dept-pill px-4 py-2 rounded-xl text-xs font-semibold font-body"
                  style={active
                    ? { background: ds.bg, borderColor: ds.border, color: ds.color }
                    : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: '#64748b' }}>
                  {d}
                </button>
              )
            })}
          </div>
        </div>
        {!loading && <p className="font-body text-xs text-slate-600 mt-2">{filtered.length} member{filtered.length !== 1 ? 's' : ''}</p>}
      </section>

      {/* ── GRID / LIST ──────────────────────────────────────────────── */}
      <section className="px-6 max-w-7xl mx-auto pb-24">
        {loading ? <SkeletonGrid /> :
        filtered.length === 0 ? (
          <div className="text-center py-20">
            <Users size={40} className="mx-auto mb-3 text-slate-700" />
            <p className="font-display font-bold text-white text-lg mb-1">No members found</p>
            <p className="font-body text-slate-500 text-sm">Try a different search or department.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence>
              {filtered.map((m, i) => {
                const ds = getDeptStyle(m.department)
                return (
                  <motion.div key={m._id} layout
                    initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }} transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelected(m)}
                    className="group relative rounded-2xl p-6 text-center cursor-pointer overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.3s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${ds.color}30`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>

                    {/* Top corner glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle, ${ds.color}15, transparent)` }} />

                    <div className="relative flex justify-center mb-4">
                      <Avatar member={m} size="lg" />
                    </div>

                    <h3 className="font-display font-bold text-white text-base mb-0.5">{m.name}</h3>
                    <p className="font-body text-xs font-semibold mb-1" style={{ color: ds.color }}>{m.role}</p>
                    <p className="font-body text-[11px] text-slate-600 mb-1">{m.department}</p>
                    <p className="font-body text-[10px] text-slate-700">{m.staffId}</p>

                    <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ background: 'linear-gradient(to top, rgba(2,6,23,0.9) 0%, transparent 60%)' }}>
                      <span className="font-body text-xs font-semibold flex items-center gap-1" style={{ color: ds.color }}>
                        View Profile <ChevronRight size={12} />
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((m, i) => {
              const ds = getDeptStyle(m.department)
              return (
                <motion.div key={m._id}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  onClick={() => setSelected(m)}
                  className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${ds.color}30`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                  <Avatar member={m} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-white text-sm">{m.name}</p>
                    <p className="font-body text-xs" style={{ color: ds.color }}>{m.role}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="font-body text-[10px] px-3 py-1 rounded-full font-semibold"
                      style={{ background: ds.bg, border: `1px solid ${ds.border}`, color: ds.color }}>
                      {m.department}
                    </span>
                  </div>
                  <p className="hidden md:block font-body text-xs text-slate-600">{m.staffId}</p>
                  <ChevronRight size={14} className="text-slate-700 flex-shrink-0" />
                </motion.div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── MODAL ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && <ProfileModal member={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}