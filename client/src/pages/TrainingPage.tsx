import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, Clock, ArrowRight, GraduationCap, Star, Users,
  Search, ChevronRight, Play, Award, TrendingUp, Zap,
  Filter, X, CheckCircle2, Lock, Globe
} from 'lucide-react'

interface Course {
  _id: string
  title: string
  category: string
  price: number
  duration: string
  level: string
  description: string
  instructor: string
  image: string
}

const LEVEL_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  Beginner:     { color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.2)' },
  Intermediate: { color: '#f97316', bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.2)' },
  Advanced:     { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)' },
}

const MOCK_RATINGS: Record<string, number> = {}
const getRating = (id: string) => {
  if (!MOCK_RATINGS[id]) MOCK_RATINGS[id] = 4 + Math.random()
  return MOCK_RATINGS[id]
}

// ── Skeleton card ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="h-40" style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="p-5 space-y-3">
        <div className="h-3 rounded-full w-1/3" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="h-4 rounded-full w-3/4" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="h-3 rounded-full w-full"  style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="h-3 rounded-full w-2/3"   style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="h-8 rounded-xl mt-4"      style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>
    </div>
  )
}

// ── Course card ────────────────────────────────────────────────────────────
function CourseCard({ course, index, onClick }: { course: Course; index: number; onClick: () => void }) {
  const cfg = LEVEL_CONFIG[course.level] ?? LEVEL_CONFIG.Beginner
  const rating = getRating(course._id)
  const enrolled = Math.floor(Math.random() * 400) + 50

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.3s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>

      {/* Banner */}
      <div className="relative h-40 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(6,182,212,0.15))' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen size={48} style={{ color: 'rgba(167,139,250,0.3)' }} />
        </div>
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(167,139,250,0.9)' }}>
            <Play size={18} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
        {/* Level badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold font-body uppercase tracking-wider"
          style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
          {course.level}
        </div>
        {/* Category */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold"
          style={{ background: 'rgba(0,0,0,0.5)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>
          {course.category}
        </div>
      </div>

      <div className="p-5">
        {/* Rating row */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={10} fill={s <= Math.round(rating) ? '#f59e0b' : 'none'}
                style={{ color: s <= Math.round(rating) ? '#f59e0b' : '#374151' }} />
            ))}
          </div>
          <span className="font-body text-[11px] text-slate-500">{rating.toFixed(1)}</span>
          <span className="font-body text-[11px] text-slate-600">·</span>
          <span className="font-body text-[11px] text-slate-600 flex items-center gap-1"><Users size={9} />{enrolled}</span>
        </div>

        <h3 className="font-display font-bold text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors"
          style={{ fontSize: '1rem' }}>
          {course.title}
        </h3>
        <p className="font-body text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">{course.description}</p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-slate-600 font-body mb-5">
          <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
          <span className="flex items-center gap-1"><GraduationCap size={11} /> {course.instructor || 'Expert'}</span>
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-[10px] text-slate-600 uppercase tracking-wider mb-0.5">Price</p>
            <p className="font-display font-black text-white text-lg">
              GHS {course.price?.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-purple-400 text-xs font-body font-semibold group-hover:gap-2 transition-all">
            Enrol Now <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════════════════════
export default function TrainingPage() {
  const navigate = useNavigate()
  const [courses, setCourses]           = useState<Course[]>([])
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [activeLevel, setActiveLevel]   = useState('All')
  const [activeCategory, setActiveCategory] = useState('All')
  const [showFilters, setShowFilters]   = useState(false)

  useEffect(() => {
    fetch('https://smt-backend-amad.onrender.com/api/courses')
      .then(r => r.json())
      .then(d => setCourses(Array.isArray(d) ? d : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(courses.map(c => c.category).filter(Boolean))]
  const levels     = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filtered = courses.filter(c => {
    const s = c.title?.toLowerCase().includes(search.toLowerCase())
    const l = activeLevel === 'All' || c.level === activeLevel
    const k = activeCategory === 'All' || c.category === activeCategory
    return s && l && k
  })

  const stats = [
    { icon: BookOpen, value: `${courses.length}+`, label: 'Courses' },
    { icon: Users,    value: '500+',               label: 'Students' },
    { icon: Award,    value: '100%',               label: 'Certified' },
    { icon: Globe,    value: 'Online',              label: 'Access' },
  ]

  return (
    <div className="min-h-screen text-white" style={{ background: '#020617', fontFamily: 'DM Sans, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800;12..96,900&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Bricolage Grotesque', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .cat-pill { transition: all 0.2s; cursor: pointer; border: 1px solid transparent; font-family: 'DM Sans', sans-serif; }
        .cat-pill.active { background: rgba(167,139,250,0.15); border-color: rgba(167,139,250,0.4); color: #a78bfa; }
        .cat-pill:not(.active) { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.07); color: #64748b; }
        .cat-pill:not(.active):hover { color: #fff; background: rgba(255,255,255,0.06); }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs mb-6 uppercase tracking-widest font-semibold"
            style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', color: '#a78bfa' }}>
            <GraduationCap size={13} /> {courses.length} Courses Available
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            <span className="text-white">IT Training</span>{' '}
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              School
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="font-body text-slate-400 max-w-xl mx-auto leading-relaxed mb-10"
            style={{ fontSize: '1.1rem' }}>
            Professional IT courses with mentorship and certification from industry experts shaping Africa's digital talent.
          </motion.p>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-body"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Icon size={14} style={{ color: '#a78bfa' }} />
                  <span className="text-white font-semibold text-sm">{s.value}</span>
                  <span className="text-slate-600 text-xs">{s.label}</span>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FILTERS ──────────────────────────────────────────────────── */}
      <section className="px-6 max-w-7xl mx-auto mb-10">
        <div className="rounded-2xl p-4 space-y-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Search row */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
              <input type="text" placeholder="Search courses…" value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl font-body text-sm text-white placeholder-slate-600 outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(167,139,250,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')} />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
            <button onClick={() => setShowFilters(p => !p)}
              className="px-4 py-3 rounded-xl font-body text-sm font-medium flex items-center gap-2 transition-all"
              style={{
                background: showFilters ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${showFilters ? 'rgba(167,139,250,0.4)' : 'rgba(255,255,255,0.07)'}`,
                color: showFilters ? '#a78bfa' : '#64748b',
              }}>
              <Filter size={14} /> Filters
            </button>
          </div>

          {/* Level tabs — always visible */}
          <div className="flex flex-wrap gap-2">
            {levels.map(l => (
              <button key={l} onClick={() => setActiveLevel(l)}
                className={`cat-pill px-4 py-2 rounded-xl text-xs font-semibold ${activeLevel === l ? 'active' : ''}`}>
                {l}
              </button>
            ))}
          </div>

          {/* Category tabs — shown when filters open */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <p className="font-body text-[10px] uppercase tracking-widest text-slate-600 mb-2 font-semibold">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <button key={c} onClick={() => setActiveCategory(c)}
                      className={`cat-pill px-4 py-2 rounded-xl text-xs font-semibold ${activeCategory === c ? 'active' : ''}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results count */}
        {!loading && (
          <p className="font-body text-xs text-slate-600 mt-3">
            {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
            {search && <> for "<span className="text-purple-400">{search}</span>"</>}
          </p>
        )}
      </section>

      {/* ── GRID ─────────────────────────────────────────────────────── */}
      <section className="px-6 max-w-7xl mx-auto pb-24">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <BookOpen size={28} className="text-slate-600" />
            </div>
            <p className="font-display font-bold text-white text-xl mb-2">No courses found</p>
            <p className="font-body text-slate-500 text-sm">Try adjusting your filters or search term.</p>
            <button onClick={() => { setSearch(''); setActiveLevel('All'); setActiveCategory('All') }}
              className="mt-5 px-5 py-2.5 rounded-xl font-body text-sm font-semibold text-purple-400 hover:text-white transition-all"
              style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}>
              Clear filters
            </button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course, i) => (
              <CourseCard key={course._id} course={course} index={i}
                onClick={() => navigate(`/training/${course._id}`)} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}