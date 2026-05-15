import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../lib/axios'
import { BookOpen, Clock, DollarSign, User, Calendar, CheckCircle2, ArrowLeft, GraduationCap, Star, Users, Award } from 'lucide-react'

export default function CourseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/courses/${id}`).then(res => setCourse(res.data)).catch(() => {
      // Fallback mock data
      setCourse({
        _id: id, title: 'Full Stack Web Development', category: 'Web Development',
        price: 2500, duration: '16 weeks', level: 'Beginner', instructor: 'Mr. Hafiz Iddrisu',
        description: 'Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build 5 real-world projects.',
        syllabus: [
          { title: 'HTML & CSS Fundamentals', desc: 'Learn the building blocks of the web' },
          { title: 'JavaScript Mastery', desc: 'From basics to advanced ES6+' },
          { title: 'React.js', desc: 'Build modern single-page applications' },
          { title: 'Node.js & Express', desc: 'Server-side development' },
          { title: 'MongoDB & Databases', desc: 'NoSQL database design' },
          { title: 'Final Project', desc: 'Build a full-stack application' }
        ]
      })
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#020617]"><div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" /></div>

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/training')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Courses
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">{course?.category}</span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">{course?.level}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black">{course?.title}</h1>
              <p className="text-gray-400 mt-4 leading-relaxed">{course?.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { icon: <Clock size={18} />, label: 'Duration', value: course?.duration },
                  { icon: <DollarSign size={18} />, label: 'Price', value: `GHS ${course?.price?.toLocaleString()}` },
                  { icon: <User size={18} />, label: 'Instructor', value: course?.instructor },
                  { icon: <Users size={18} />, label: 'Students', value: '120+ Enrolled' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-white/5">
                    <div className="text-cyan-400 mb-1 flex justify-center">{item.icon}</div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><BookOpen size={22} className="text-cyan-400" /> Course Syllabus</h2>
              <div className="space-y-3">
                {(course?.syllabus || []).map((item: any, i: number) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="glass rounded-3xl p-6 sticky top-28 space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-3">
                  <GraduationCap size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Enroll Now</h3>
                <p className="text-3xl font-black text-cyan-400 mt-2">GHS {course?.price?.toLocaleString()}</p>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                {['Lifetime access', 'Certificate of completion', 'Hands-on projects', 'Mentorship support', 'Job placement assistance'].map((f, i) => (
                  <div key={i} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> {f}</div>
                ))}
              </div>

              <button className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-all shadow-xl shadow-purple-500/20">
                Enroll Now
              </button>
              <button onClick={() => navigate('/contact')} className="w-full py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all">
                Ask Question
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}