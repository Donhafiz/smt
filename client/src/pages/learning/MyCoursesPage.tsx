import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../../lib/axios'
import { BookOpen, Play, Award, Clock, BarChart3, ChevronRight, GraduationCap, ArrowRight } from 'lucide-react'

export default function MyCoursesPage() {
  const navigate = useNavigate()
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    api.get('/lms/my-courses')
      .then(res => setEnrollments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Courses
          </h1>
          <p className="text-gray-400 mt-3">Continue your learning journey</p>
        </motion.div>

        {enrollments.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={64} className="mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No courses yet</h2>
            <p className="text-gray-500 mb-6">Enroll in a course to start learning!</p>
            <button onClick={() => navigate('/training')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold">
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {enrollments.map((enrollment: any) => {
              const course = enrollment.courseId
              const progress = enrollment.progress?.filter((p: any) => p.completed).length || 0
              const total = enrollment.progress?.length || 0
              const percentage = total > 0 ? Math.round((progress / total) * 100) : 0

              return (
                <motion.div
                  key={enrollment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(`/learning/${course?._id}`)}
                  className="glass rounded-2xl p-6 cursor-pointer group hover:border-purple-400/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">
                        {course?.title || 'Course'}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {course?.category} • {course?.instructor}
                      </p>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>{percentage}% complete</span>
                          <span>{progress}/{total} lessons</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center justify-between mt-4">
                        {enrollment.completedAt ? (
                          <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 flex items-center gap-1">
                            <Award size={12} /> Completed
                          </span>
                        ) : (
                          <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center gap-1">
                            <Clock size={12} /> In Progress
                          </span>
                        )}
                        <span className="text-purple-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          {enrollment.completedAt ? 'Review' : 'Continue'} <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}