import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Clock, DollarSign, ArrowRight, GraduationCap, Star, Users, Award, Search, Filter } from 'lucide-react'

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

export default function TrainingPage() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(courses.map(c => c.category).filter(Boolean))]
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title?.toLowerCase().includes(search.toLowerCase())
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    return matchesSearch && matchesLevel && matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <GraduationCap size={16} className="text-purple-400" />
            <span className="text-sm text-gray-400">{courses.length} Courses Available</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            IT Training School
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Professional IT courses with mentorship and certification from industry experts
          </p>
        </motion.div>

        {/* Filters */}
        <div className="glass rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-3 text-gray-500" />
            <input type="text" placeholder="Search courses..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-400" />
          </div>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm">
            {levels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <p>No courses found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, i) => (
              <motion.div key={course._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }} onClick={() => navigate(`/training/${course._id}`)}
                className="glass rounded-2xl p-6 cursor-pointer group hover:border-purple-400/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                  <BookOpen size={22} className="text-white" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">{course.level}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">{course.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                  <span className="flex items-center gap-1"><Users size={14} /> {course.instructor || 'Expert Instructor'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-purple-400">GHS {course.price?.toLocaleString()}</span>
                  <span className="text-purple-400 flex items-center gap-1 text-sm group-hover:gap-2 transition-all">
                    Learn More <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}