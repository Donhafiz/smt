import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import { GraduationCap, Plus, Edit2, Trash2, X, Save, BookOpen, Clock, DollarSign } from 'lucide-react'

interface Course {
  _id: string
  title: string
  category: string
  price: number
  duration: string
  level: string
  description: string
  instructor: string
}

const emptyForm = {
  title: '',
  category: 'Web Development',
  price: '',
  duration: '',
  level: 'Beginner',
  description: '',
  instructor: ''
}

export default function CoursesAdmin() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<Course | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses')
      setCourses(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCourses() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, price: Number(form.price) }
      if (editItem) {
        await api.put(`/courses/${editItem._id}`, payload)
      } else {
        await api.post('/courses', payload)
      }
      setShowForm(false)
      setEditItem(null)
      setForm(emptyForm)
      fetchCourses()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (course: Course) => {
    setEditItem(course)
    setForm({
      title: course.title,
      category: course.category,
      price: String(course.price),
      duration: course.duration,
      level: course.level,
      description: course.description || '',
      instructor: course.instructor || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return
    try {
      await api.delete(`/courses/${id}`)
      fetchCourses()
    } catch (err) {
      console.error(err)
    }
  }

  const categories = ['Web Development', 'Mobile', 'Cybersecurity', 'Data Analysis', 'AI', 'Networking', 'Graphic Design']
  const levels = ['Beginner', 'Intermediate', 'Advanced']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Courses Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">{courses.length} courses available</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditItem(null); setForm(emptyForm) }}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-sm font-semibold hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Add Course
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editItem ? 'Edit Course' : 'Add Course'}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-white/10 transition-all">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Course Title</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all"
                  placeholder="e.g. Web Development Bootcamp"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Level</label>
                  <select
                    value={form.level}
                    onChange={e => setForm({ ...form, level: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all"
                  >
                    {levels.map(lev => (
                      <option key={lev} value={lev}>{lev}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Price (GHS)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Duration</label>
                  <input
                    value={form.duration}
                    onChange={e => setForm({ ...form, duration: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all"
                    placeholder="e.g. 12 weeks"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Instructor</label>
                <input
                  value={form.instructor}
                  onChange={e => setForm({ ...form, instructor: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all"
                  placeholder="e.g. Mr. Hafiz"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all resize-none"
                  placeholder="Course description..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {editItem ? 'Update Course' : 'Create Course'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-20">
          <GraduationCap size={64} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-500 text-lg mb-4">No courses available</p>
          <button
            onClick={() => { setShowForm(true); setEditItem(null); setForm(emptyForm) }}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold transition-all"
          >
            Add Your First Course
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(course => (
            <div
              key={course._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-cyan-400/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-cyan-400" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400">{course.level}</span>
              </div>
              
              <h3 className="font-bold text-lg mb-1">{course.title}</h3>
              <p className="text-xs text-cyan-400 mb-2">{course.category}</p>
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">{course.description}</p>
              
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                <span className="flex items-center gap-1"><DollarSign size={12} /> GHS {course.price?.toLocaleString()}</span>
              </div>
              
              <p className="text-xs text-gray-600 mb-3">Instructor: {course.instructor || 'TBD'}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="flex-1 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all flex items-center justify-center gap-1 text-sm"
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="flex-1 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all flex items-center justify-center gap-1 text-sm"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}