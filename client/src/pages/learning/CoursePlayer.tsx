import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../../lib/axios'
import {
  Play, CheckCircle2, Clock, BookOpen, ChevronRight,
  Award, Download, Lock, ArrowLeft, BarChart3, Trophy
} from 'lucide-react'

export default function CoursePlayer() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [content, setContent] = useState<any>(null)
  const [enrollment, setEnrollment] = useState<any>(null)
  const [activeLesson, setActiveLesson] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    fetchCourseData()
  }, [courseId])

  const fetchCourseData = async () => {
    try {
      const [contentRes, progressRes] = await Promise.all([
        api.get(`/lms/course/${courseId}/content`),
        api.get(`/lms/progress/${courseId}`)
      ])
      setContent(contentRes.data)
      setEnrollment(progressRes.data.enrollment)
      setPercentage(progressRes.data.percentage)
      
      // Set first incomplete lesson as active
      const firstIncomplete = contentRes.data?.sections
        ?.flatMap((s: any) => s.lessons)
        ?.find((l: any) => {
          const prog = progressRes.data.enrollment?.progress?.find((p: any) => p.lessonId === l._id)
          return !prog?.completed
        })
      setActiveLesson(firstIncomplete || contentRes.data?.sections?.[0]?.lessons?.[0])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLessonComplete = async (lessonId: string) => {
    await api.put('/lms/progress', { courseId, lessonId, completed: true })
    fetchCourseData()
  }

  const handleEnroll = async () => {
    await api.post('/lms/enroll', { courseId })
    fetchCourseData()
  }

  const handleGenerateCertificate = async () => {
    try {
      const res = await api.post(`/lms/certificate/${courseId}`)
      alert(`🎉 Certificate generated! ${res.data.certificateUrl}`)
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Complete the course first!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-6">
        <div className="text-center max-w-md">
          <BookOpen size={64} className="mx-auto text-cyan-400 mb-6" />
          <h1 className="text-3xl font-black mb-4">Enroll to Start Learning</h1>
          <p className="text-gray-400 mb-8">Get access to all course materials, videos, and earn your certificate.</p>
          <button onClick={handleEnroll}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold text-lg hover:scale-105 transition-all shadow-xl">
            Enroll Now — Free
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {/* Sidebar — Lesson List */}
      <div className="w-80 bg-[#0f172a] border-r border-white/10 h-screen overflow-y-auto flex-shrink-0 hidden lg:block">
        <div className="p-5 border-b border-white/10">
          <button onClick={() => navigate('/my-courses')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4">
            <ArrowLeft size={16} /> Back to Courses
          </button>
          <h2 className="font-bold text-lg">{content?.courseId?.title || 'Course'}</h2>
          <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all" style={{ width: `${percentage}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">{percentage}% complete</p>
        </div>

        <div className="p-3">
          {content?.sections?.map((section: any, si: number) => (
            <div key={si} className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                {section.title}
              </h3>
              {section.lessons.map((lesson: any, li: number) => {
                const prog = enrollment?.progress?.find((p: any) => p.lessonId === lesson._id)
                const isActive = activeLesson?._id === lesson._id
                const isCompleted = prog?.completed

                return (
                  <button
                    key={li}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-1 ${
                      isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}>
                    {isCompleted ? (
                      <CheckCircle2 size={14} className="text-green-400 flex-shrink-0" />
                    ) : (
                      <Play size={14} className="flex-shrink-0" />
                    )}
                    <span className="truncate text-left">{lesson.title}</span>
                    {lesson.duration && <span className="text-[10px] text-gray-600 ml-auto">{lesson.duration}m</span>}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Video Player */}
        <div className="bg-black aspect-video flex items-center justify-center">
          {activeLesson?.videoUrl ? (
            <iframe
              src={activeLesson.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-center text-gray-500">
              <Play size={48} className="mx-auto mb-4" />
              <p>Select a lesson to start</p>
            </div>
          )}
        </div>

        {/* Lesson Info */}
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{activeLesson?.title || 'Select a Lesson'}</h1>
              <p className="text-gray-400 text-sm mt-1">{activeLesson?.description}</p>
            </div>
            {activeLesson && (
              <button
                onClick={() => handleLessonComplete(activeLesson._id)}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold flex items-center gap-2 transition-all">
                <CheckCircle2 size={18} /> Mark as Complete
              </button>
            )}
          </div>

          {/* Certificate Section */}
          {percentage === 100 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-8 text-center">
              <Trophy size={48} className="text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">🎉 Course Completed!</h2>
              <p className="text-gray-400 mb-6">You've completed all lessons. Claim your certificate now!</p>
              <button onClick={handleGenerateCertificate}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl font-semibold text-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto shadow-xl">
                <Award size={20} /> Get Certificate
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}