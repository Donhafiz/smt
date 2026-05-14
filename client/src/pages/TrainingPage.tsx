import { useState, useEffect } from 'react'
import api from '../lib/axios'
import { motion } from 'framer-motion'
import { BookOpen, Clock, DollarSign, ArrowRight } from 'lucide-react'

export default function TrainingPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/courses').then(res => setCourses(res.data)).catch(console.error).finally(() => setLoading(false))
  }, [])

  const handleEnroll = (course) => {
    // Open a modal with enrollment form or redirect to contact
    alert(`Enrollment for "${course.title}" will be available soon.`)
  }

  return (
    <div className="min-h-screen pt-28 px-6 max-w-7xl mx-auto pb-20">
      <h1 className="text-5xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-12">
        IT Training Courses
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <motion.div key={course._id} whileHover={{ y: -5 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-cyan-400 mb-2"><BookOpen size={28} /></div>
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p className="text-gray-400 text-sm mt-2">{course.description}</p>
            <div className="flex gap-4 mt-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
              <span className="flex items-center gap-1"><DollarSign size={14} /> GHS {course.price}</span>
            </div>
            <button onClick={() => handleEnroll(course)} className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg flex items-center justify-center gap-2">
              Enroll Now <ArrowRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}