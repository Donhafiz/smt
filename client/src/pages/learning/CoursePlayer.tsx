import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../../lib/axios'
import {
  Play, CheckCircle2, Clock, BookOpen, ChevronRight,
  Award, Download, Lock, ArrowLeft, Trophy, Shield,
  CreditCard, Users
} from 'lucide-react'

declare global {
  interface Window {
    PaystackPop: any
  }
}

export default function CoursePlayer() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [content, setContent] = useState<any>(null)
  const [enrollment, setEnrollment] = useState<any>(null)
  const [activeLesson, setActiveLesson] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [percentage, setPercentage] = useState(0)
  const [needsAuth, setNeedsAuth] = useState(false)
  const [paying, setPaying] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setNeedsAuth(true)
      setLoading(false)
      return
    }
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

  // ✅ ENROLL WITH PAYSTACK PAYMENT
  const handleEnroll = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    navigate('/login')
    return
  }

  const coursePrice = content?.courseId?.price || 2500
  const userData = JSON.parse(localStorage.getItem('user') || '{}')

  // ✅ Check if Paystack is available — if not, load it dynamically
  if (typeof window.PaystackPop === 'undefined') {
    // Load Paystack script dynamically
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.onload = () => {
      // Script loaded, now try payment again
      openPaystackPopup(coursePrice, userData)
    }
    script.onerror = () => {
      alert('Payment system is unavailable. Please refresh the page and try again.')
      setPaying(false)
    }
    document.head.appendChild(script)
    return
  }

  openPaystackPopup(coursePrice, userData)
}

// Separate function for opening Paystack
const openPaystackPopup = (coursePrice: number, userData: any) => {
  setPaying(true)
  
  try {
    const handler = window.PaystackPop.setup({
      key: 'pk_live_f494a9f7aa60622b8212549908a6f8dd8ab691c8',
      email: userData.email || 'customer@smt.com',
      amount: Math.round(coursePrice * 100),
      currency: 'GHS',
      ref: 'SMT-COURSE-' + Date.now(),
      metadata: {
        courseId: courseId,
        type: 'course_enrollment'
      },
      callback: async function(response: any) {
        try {
          await api.post('/paystack/verify', { reference: response.reference })
          await api.post('/lms/enroll', { courseId })
          fetchCourseData()
          setPaying(false)
        } catch (err: any) {
          alert('Payment verified but enrollment failed. Contact support.')
          setPaying(false)
        }
      },
      onClose: function() {
        setPaying(false)
      }
    })
    handler.openIframe()
  } catch (err: any) {
    console.error('Paystack error:', err)
    alert('Payment failed to initialize. Please try again.')
    setPaying(false)
  }
}
  const handleLessonComplete = async (lessonId: string) => {
    await api.put('/lms/progress', { courseId, lessonId, completed: true })
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

  if (needsAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-6">
        <div className="text-center max-w-md">
          <Shield size={64} className="mx-auto text-cyan-400 mb-6" />
          <h1 className="text-3xl font-black mb-4">Login Required</h1>
          <p className="text-gray-400 mb-8">Create an account or log in to access this course.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/login')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
              Login
            </button>
            <button onClick={() => navigate('/register')}
              className="px-6 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/10">
              Register
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  // ✅ Not enrolled — show payment enrollment screen
  if (!enrollment) {
    const coursePrice = content?.courseId?.price || 2500
    const totalLessons = content?.sections?.reduce((sum: number, s: any) => sum + s.lessons.length, 0) || 0

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-6">
        <div className="text-center max-w-md">
          <BookOpen size={64} className="mx-auto text-purple-400 mb-6" />
          <h1 className="text-3xl font-black mb-4">Enroll to Start Learning</h1>
          <p className="text-gray-400 mb-8">Get access to all course materials, videos, and earn your certificate upon completion.</p>
          
          {/* Course Details Card */}
          <div className="bg-white/5 rounded-2xl p-6 mb-6 text-left">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-gray-400 flex items-center gap-2"><BookOpen size={14} /> Total Lessons</span>
              <span className="text-white font-bold">{totalLessons}</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-gray-400 flex items-center gap-2"><Award size={14} /> Certificate</span>
              <span className="text-green-400 font-bold">Yes, upon completion</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-gray-400 flex items-center gap-2"><Clock size={14} /> Duration</span>
              <span className="text-white font-bold">{content?.sections?.length || 0} sections</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center gap-2"><Users size={14} /> Access</span>
              <span className="text-white font-bold">Lifetime</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-5xl font-black text-purple-400">
              GHS {coursePrice?.toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm mt-1">One-time payment · Lifetime access · Certificate included</p>
          </div>

          {/* Pay Button */}
          <button onClick={handleEnroll} disabled={paying}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl font-semibold text-lg hover:scale-105 transition-all shadow-xl w-full flex items-center justify-center gap-2 disabled:opacity-50">
            {paying ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <CreditCard size={20} />
            )}
            {paying ? 'Processing Payment...' : `Pay & Enroll — GHS ${coursePrice?.toLocaleString()}`}
          </button>

          <p className="text-xs text-gray-600 mt-3 flex items-center justify-center gap-1">
            <Shield size={10} className="text-green-400" /> Secure payment via Paystack · 7-day refund guarantee
          </p>
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
            <ArrowLeft size={16} /> My Courses
          </button>
          <h2 className="font-bold text-lg">Course Content</h2>
          <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all" style={{ width: `${percentage}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">{percentage}% complete</p>
        </div>

        <div className="p-3">
          {content?.sections?.map((section: any, si: number) => (
            <div key={si} className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">{section.title}</h3>
              {section.lessons.map((lesson: any, li: number) => {
                const prog = enrollment?.progress?.find((p: any) => p.lessonId === lesson._id)
                const isActive = activeLesson?._id === lesson._id
                const isCompleted = prog?.completed

                return (
                  <button key={li} onClick={() => setActiveLesson(lesson)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-1 ${
                      isActive ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}>
                    {isCompleted ? <CheckCircle2 size={14} className="text-green-400 flex-shrink-0" /> : <Play size={14} className="flex-shrink-0" />}
                    <span className="truncate text-left">{lesson.title}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-black aspect-video flex items-center justify-center">
          {activeLesson?.videoUrl ? (
            <iframe src={activeLesson.videoUrl} className="w-full h-full" allowFullScreen />
          ) : (
            <div className="text-center text-gray-500">
              <Play size={48} className="mx-auto mb-4" />
              <p>Select a lesson to start</p>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{activeLesson?.title || 'Select a Lesson'}</h1>
            </div>
            {activeLesson && (
              <button onClick={() => handleLessonComplete(activeLesson._id)}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold flex items-center gap-2 transition-all">
                <CheckCircle2 size={18} /> Mark as Complete
              </button>
            )}
          </div>

          {percentage === 100 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-8 text-center">
              <Trophy size={48} className="text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">🎉 Course Completed!</h2>
              <p className="text-gray-400 mb-6">Claim your certificate now!</p>
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