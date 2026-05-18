import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, Plus, Edit2, Trash2, X, Save, BookOpen, Clock, 
  DollarSign, Play, FileText, Upload, Link, GripVertical,
  ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Video,
  Layers, Award, User, Calendar, Globe
} from 'lucide-react'

interface Lesson {
  _id?: string
  title: string
  description: string
  videoUrl: string
  duration: number
  order: number
  isPreview: boolean
}

interface Section {
  _id?: string
  title: string
  lessons: Lesson[]
}

interface CourseContent {
  _id?: string
  courseId: string
  sections: Section[]
  requirements: string[]
  whatYouWillLearn: string[]
  instructor: { name: string; bio: string; photo: string }
  thumbnail: string
  trailerUrl: string
}

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

const emptyCourse = {
  title: '', category: 'Web Development', price: '', duration: '',
  level: 'Beginner', description: '', instructor: ''
}

export default function CoursesAdmin() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<Course | null>(null)
  const [form, setForm] = useState(emptyCourse)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // Content Manager State
  const [showContentManager, setShowContentManager] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [courseContent, setCourseContent] = useState<CourseContent>({
    courseId: '',
    sections: [],
    requirements: [''],
    whatYouWillLearn: [''],
    instructor: { name: '', bio: '', photo: '' },
    thumbnail: '',
    trailerUrl: ''
  })
  const [expandedSections, setExpandedSections] = useState<number[]>([])
  const [savingContent, setSavingContent] = useState(false)

  useEffect(() => { fetchCourses() }, [])

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
      setForm(emptyCourse)
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
      title: course.title || '',
      category: course.category || 'Web Development',
      price: String(course.price || ''),
      duration: course.duration || '',
      level: course.level || 'Beginner',
      description: course.description || '',
      instructor: course.instructor || ''
    })
    setShowForm(true)
  }
  // ========================
  // CONTENT MANAGER FUNCTIONS
  // ========================
  const openContentManager = async (course: Course) => {
    setSelectedCourse(course)
    try {
      const res = await api.get(`/lms/course/${course._id}/content`)
      if (res.data) {
        setCourseContent(res.data)
      } else {
        setCourseContent({
          courseId: course._id,
          sections: [],
          requirements: [''],
          whatYouWillLearn: [''],
          instructor: { name: course.instructor || '', bio: '', photo: '' },
          thumbnail: '',
          trailerUrl: ''
        })
      }
    } catch (err) {
      setCourseContent({
        courseId: course._id,
        sections: [],
        requirements: [''],
        whatYouWillLearn: [''],
        instructor: { name: course.instructor || '', bio: '', photo: '' },
        thumbnail: '',
        trailerUrl: ''
      })
    }
    setShowContentManager(true)
  }

  const addSection = () => {
    setCourseContent(prev => ({
      ...prev,
      sections: [...prev.sections, { title: 'New Section', lessons: [] }]
    }))
    setExpandedSections(prev => [...prev, courseContent.sections.length])
  }

  const removeSection = (index: number) => {
    setCourseContent(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }))
  }

  const updateSection = (index: number, field: string, value: string) => {
    setCourseContent(prev => {
      const updated = [...prev.sections]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, sections: updated }
    })
  }

  const addLesson = (sectionIndex: number) => {
    setCourseContent(prev => {
      const updated = [...prev.sections]
      updated[sectionIndex].lessons.push({
        title: 'New Lesson',
        description: '',
        videoUrl: '',
        duration: 0,
        order: updated[sectionIndex].lessons.length + 1,
        isPreview: false
      })
      return { ...prev, sections: updated }
    })
  }

  const removeLesson = (sectionIndex: number, lessonIndex: number) => {
    setCourseContent(prev => {
      const updated = [...prev.sections]
      updated[sectionIndex].lessons = updated[sectionIndex].lessons.filter((_, i) => i !== lessonIndex)
      return { ...prev, sections: updated }
    })
  }

  const updateLesson = (sectionIndex: number, lessonIndex: number, field: string, value: any) => {
    setCourseContent(prev => {
      const updated = [...prev.sections]
      updated[sectionIndex].lessons[lessonIndex] = {
        ...updated[sectionIndex].lessons[lessonIndex],
        [field]: value
      }
      return { ...prev, sections: updated }
    })
  }

  const saveContent = async () => {
    setSavingContent(true)
    try {
      if (courseContent._id) {
        await api.put(`/lms/course/${selectedCourse?._id}/content`, courseContent)
      } else {
        await api.post(`/lms/course/${selectedCourse?._id}/content`, courseContent)
      }
      setMessage('✅ Course content saved!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error(err)
      setMessage('❌ Failed to save')
    } finally {
      setSavingContent(false)
    }
  }

  const toggleSection = (index: number) => {
    setExpandedSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const categories = ['Web Development', 'Mobile', 'Cybersecurity', 'Data Analysis', 'AI', 'Networking', 'Graphic Design']
  const levels = ['Beginner', 'Intermediate', 'Advanced']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Course Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">{courses.length} courses</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditItem(null); setForm(emptyCourse) }}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-sm font-semibold hover:scale-105 transition-all flex items-center gap-2">
          <Plus size={18} /> Add Course
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm ${message.includes('✅') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {message}
        </div>
      )}

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-20">
          <GraduationCap size={64} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-500">No courses yet</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(course => (
            <motion.div key={course._id} whileHover={{ y: -3 }}
              className="glass rounded-2xl p-5 hover:border-purple-400/30 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <BookOpen size={22} className="text-white" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { handleEdit(course); setForm({ title: course.title, category: course.category, price: String(course.price), duration: course.duration, level: course.level, description: course.description || '', instructor: course.instructor || '' }); }}
                    className="p-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"><Edit2 size={14} /></button>
                  <button onClick={() => { if (confirm('Delete?')) api.delete(`/courses/${course._id}`).then(fetchCourses) }}
                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"><Trash2 size={14} /></button>
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-1">{course.title}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">{course.level}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">{course.category}</span>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">{course.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                <span className="flex items-center gap-1"><DollarSign size={12} /> GHS {course.price?.toLocaleString()}</span>
              </div>
              
              <button onClick={() => openContentManager(course)}
                className="w-full py-2.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl text-purple-400 text-sm font-semibold hover:bg-purple-500/30 transition-all flex items-center justify-center gap-2">
                <Video size={14} /> Manage Content
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Course Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{editItem ? 'Edit Course' : 'Add Course'}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-white/10"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input placeholder="Course Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400" />
                <div className="grid grid-cols-2 gap-4">
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={form.level} onChange={e => setForm({...form, level: e.target.value})}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white">
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Price (GHS)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white" />
                  <input placeholder="Duration (e.g. 12 weeks)" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} required
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white" />
                </div>
                <input placeholder="Instructor Name" value={form.instructor} onChange={e => setForm({...form, instructor: e.target.value})}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white" />
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white resize-none" />
                <div className="flex gap-3">
                  <button type="submit" disabled={saving}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold flex items-center justify-center gap-2">
                    {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                    {editItem ? 'Update' : 'Add Course'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-white/20 rounded-xl">Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Manager Modal */}
      <AnimatePresence>
        {showContentManager && selectedCourse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowContentManager(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}>
              
              {/* Header */}
              <div className="sticky top-0 bg-[#0f172a] border-b border-white/10 p-6 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-xl font-bold">{selectedCourse.title}</h2>
                  <p className="text-sm text-gray-500">Content Manager — Sections & Lessons</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={saveContent} disabled={savingContent}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold text-sm flex items-center gap-2">
                    {savingContent ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                    Save Content
                  </button>
                  <button onClick={() => setShowContentManager(false)} className="p-2 rounded-lg hover:bg-white/10"><X size={20} /></button>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-6">
                {/* Course Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Thumbnail URL</label>
                    <input value={courseContent.thumbnail} onChange={e => setCourseContent({...courseContent, thumbnail: e.target.value})}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Trailer URL (YouTube/Vimeo)</label>
                    <input value={courseContent.trailerUrl} onChange={e => setCourseContent({...courseContent, trailerUrl: e.target.value})}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm" placeholder="https://youtube.com/..." />
                  </div>
                </div>

                {/* Instructor */}
                <div className="grid grid-cols-3 gap-4">
                  <input placeholder="Instructor Name" value={courseContent.instructor.name}
                    onChange={e => setCourseContent({...courseContent, instructor: {...courseContent.instructor, name: e.target.value}})}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm" />
                  <input placeholder="Bio" value={courseContent.instructor.bio}
                    onChange={e => setCourseContent({...courseContent, instructor: {...courseContent.instructor, bio: e.target.value}})}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm" />
                  <input placeholder="Photo URL" value={courseContent.instructor.photo}
                    onChange={e => setCourseContent({...courseContent, instructor: {...courseContent.instructor, photo: e.target.value}})}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm" />
                </div>

                {/* Sections & Lessons */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Layers size={18} className="text-purple-400" /> Sections ({courseContent.sections.length})
                    </h3>
                    <button onClick={addSection}
                      className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400 text-sm hover:bg-purple-500/30 transition-all flex items-center gap-2">
                      <Plus size={14} /> Add Section
                    </button>
                  </div>

                  {courseContent.sections.length === 0 ? (
                    <div className="text-center py-10 text-gray-600 border-2 border-dashed border-white/10 rounded-xl">
                      <Layers size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No sections yet. Add your first section to start building the course.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {courseContent.sections.map((section, si) => (
                        <div key={si} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
                          {/* Section Header */}
                          <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-white/[0.04] transition-all"
                            onClick={() => toggleSection(si)}>
                            {expandedSections.includes(si) ? <ChevronDown size={16} className="text-gray-500" /> : <ChevronUp size={16} className="text-gray-500" />}
                            <input
                              value={section.title}
                              onChange={e => updateSection(si, 'title', e.target.value)}
                              onClick={e => e.stopPropagation()}
                              className="flex-1 bg-transparent text-white font-medium text-sm focus:outline-none"
                              placeholder="Section Title"
                            />
                            <span className="text-xs text-gray-600">{section.lessons.length} lessons</span>
                            <button onClick={(e) => { e.stopPropagation(); removeSection(si) }}
                              className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-all">
                              <Trash2 size={14} />
                            </button>
                          </div>

                          {/* Lessons */}
                          {expandedSections.includes(si) && (
                            <div className="border-t border-white/5 p-4 space-y-2">
                              {section.lessons.map((lesson, li) => (
                                <div key={li} className="bg-white/[0.02] rounded-lg p-4 space-y-3">
                                  <div className="flex items-center gap-3">
                                    <Play size={14} className="text-purple-400" />
                                    <input
                                      value={lesson.title}
                                      onChange={e => updateLesson(si, li, 'title', e.target.value)}
                                      className="flex-1 bg-transparent text-white text-sm focus:outline-none"
                                      placeholder="Lesson Title"
                                    />
                                    <label className="flex items-center gap-1.5 text-xs text-gray-500">
                                      <input type="checkbox" checked={lesson.isPreview}
                                        onChange={e => updateLesson(si, li, 'isPreview', e.target.checked)}
                                        className="rounded border-gray-600" /> Preview
                                    </label>
                                    <button onClick={() => removeLesson(si, li)}
                                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400">
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                  <input
                                    value={lesson.videoUrl}
                                    onChange={e => updateLesson(si, li, 'videoUrl', e.target.value)}
                                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-xs"
                                    placeholder="Video URL (YouTube embed: https://www.youtube.com/embed/VIDEO_ID)"
                                  />
                                  <div className="flex gap-3">
                                    <input
                                      type="number"
                                      value={lesson.duration}
                                      onChange={e => updateLesson(si, li, 'duration', Number(e.target.value))}
                                      className="w-24 p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-xs"
                                      placeholder="Duration (min)"
                                    />
                                    <input
                                      value={lesson.description}
                                      onChange={e => updateLesson(si, li, 'description', e.target.value)}
                                      className="flex-1 p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-xs"
                                      placeholder="Lesson description"
                                    />
                                  </div>
                                </div>
                              ))}
                              <button onClick={() => addLesson(si)}
                                className="w-full py-2.5 border-2 border-dashed border-white/10 rounded-xl text-gray-500 text-sm hover:border-purple-400/30 hover:text-purple-400 transition-all flex items-center justify-center gap-2">
                                <Plus size={14} /> Add Lesson
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}