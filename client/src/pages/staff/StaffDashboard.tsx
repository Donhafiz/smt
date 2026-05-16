import { useState, useEffect, useRef } from 'react'
import api from '../../lib/axios'
import { motion, AnimatePresence } from 'framer-motion'
import { useReactToPrint } from 'react-to-print'
import StaffIDCard from '../../components/StaffIDCard'
import { 
  User, Camera, Clock, Calendar, CheckCircle, Upload,
  MapPin, Phone, Mail, Briefcase, Award, TrendingUp,
  Star, Zap, CreditCard, Printer, X, Sparkles, ChevronRight
} from 'lucide-react'

export default function StaffDashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [greeting, setGreeting] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [uploading, setUploading] = useState(false)
  const [attendanceMarked, setAttendanceMarked] = useState(false)
  const [quote, setQuote] = useState('')
  const [showIDCard, setShowIDCard] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const idCardRef = useRef<HTMLDivElement>(null)

  const quotes = [
    '"The only way to do great work is to love what you do." — Steve Jobs',
    '"Success is not final, failure is not fatal." — Winston Churchill',
    '"Your work is going to fill a large part of your life." — Steve Jobs',
    '"Strive not to be a success, but rather to be of value." — Albert Einstein',
  ]

  // Print handler
  const handlePrint = useReactToPrint({
    contentRef: idCardRef,   // ✅ New API
    documentTitle: `${profile?.name?.replace(/\s+/g, '_') || 'Staff'}_ID_Card`,
    pageStyle: `@page { size: 54mm 85mm; margin: 0; } @media print { body { -webkit-print-color-adjust: exact; } }`,
  })

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')

    setQuote(quotes[Math.floor(Math.random() * quotes.length)])

    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
      }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)

    const token = localStorage.getItem('staffToken')
    api.get('/staff-portal/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProfile(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))

    checkTodayAttendance()
    return () => clearInterval(timer)
  }, [])

  const checkTodayAttendance = async () => {
    try {
      const token = localStorage.getItem('staffToken')
      const res = await api.get('/staff-portal/profile', { headers: { Authorization: `Bearer ${token}` } })
      const today = new Date().toDateString()
      const marked = res.data.attendance?.some((a: any) => new Date(a.date).toDateString() === today)
      setAttendanceMarked(marked)
    } catch (err) {}
  }

  const handleAttendance = async () => {
    try {
      const token = localStorage.getItem('staffToken')
      await api.post('/staff-portal/attendance', {}, { headers: { Authorization: `Bearer ${token}` } })
      setAttendanceMarked(true)
      alert('✅ Attendance marked successfully!')
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to mark attendance')
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const photoUrl = event.target?.result as string
        const token = localStorage.getItem('staffToken')
        await api.put('/staff-portal/profile', { photo: photoUrl }, { headers: { Authorization: `Bearer ${token}` } })
        setProfile((prev: any) => ({ ...prev, photo: photoUrl }))
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      console.error(err)
      setUploading(false)
    }
  }

  const stats = [
    { icon: <Calendar size={22} />, label: 'Joined', value: profile?.joiningDate ? new Date(profile.joiningDate).toLocaleDateString() : 'N/A', color: 'from-cyan-400 to-blue-500' },
    { icon: <Briefcase size={22} />, label: 'Department', value: profile?.department || 'N/A', color: 'from-purple-400 to-pink-500' },
    { icon: <Award size={22} />, label: 'Staff ID', value: profile?.staffId || 'N/A', color: 'from-orange-400 to-yellow-500' },
    { icon: <CheckCircle size={22} />, label: 'Status', value: profile?.isActive ? 'Active' : 'Inactive', color: 'from-green-400 to-emerald-500' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-4 border-cyan-500/30 border-t-cyan-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">{currentTime}</p>
            <h1 className="text-3xl md:text-4xl font-black">
              {greeting},{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {profile?.name?.split(' ')[0] || 'Staff'}
              </span>! 👋
            </h1>
            <p className="text-gray-500 mt-2 italic">{quote}</p>
          </div>
          <button onClick={handleAttendance} disabled={attendanceMarked}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              attendanceMarked ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 shadow-lg shadow-cyan-500/25'}`}>
            <CheckCircle size={20} />
            {attendanceMarked ? 'Attendance Marked ✓' : 'Mark Attendance'}
          </button>
        </div>
      </motion.div>

      {/* Profile & Photo Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-6 text-center relative group">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto overflow-hidden ring-4 ring-cyan-500/20">
              {profile?.photo ? <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                : <User size={48} className="text-white/80" />}
            </div>
            <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
              className="absolute bottom-0 right-0 p-2.5 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg transition-all hover:scale-110">
              {uploading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Camera size={16} />}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </div>
          <h2 className="text-xl font-bold mt-4">{profile?.name}</h2>
          <p className="text-cyan-400 text-sm">{profile?.role}</p>
          <p className="text-gray-500 text-xs mt-1">{profile?.staffId}</p>
        </motion.div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 hover:border-white/10 transition-all">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 mb-3`}>
                <span className="text-white">{stat.icon}</span>
              </div>
              <p className="text-gray-500 text-xs">{stat.label}</p>
              <p className="text-white font-bold mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: <Phone size={18} />, label: 'Phone', value: profile?.phone || 'Not set', color: 'text-green-400', bg: 'bg-green-500/10' },
          { icon: <Mail size={18} />, label: 'Email', value: profile?.email || 'Not set', color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { icon: <MapPin size={18} />, label: 'Location', value: profile?.address?.city || 'Tamale, Ghana', color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
            className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${item.bg}`}><span className={item.color}>{item.icon}</span></div>
            <div><p className="text-gray-500 text-xs">{item.label}</p><p className="text-white font-medium">{item.value}</p></div>
          </motion.div>
        ))}
      </div>

      {/* ID Card Section — UPGRADED */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <CreditCard size={20} className="text-yellow-400" />
          Staff ID Card
        </h3>
        {profile?.idCardGenerated ? (
          <div className="text-center">
            <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-6 inline-block">
              <div className="flex items-center gap-4 text-white">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  {profile?.photo ? <img src={profile.photo} alt="ID" className="w-full h-full object-cover" />
                    : <User size={28} className="text-white/60" />}
                </div>
                <div className="text-left">
                  <h3 className="font-bold">{profile?.name}</h3>
                  <p className="text-white/80 text-sm">{profile?.staffId}</p>
                  <p className="text-white/60 text-xs">{profile?.idCardNumber}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button onClick={() => setShowIDCard(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold flex items-center gap-2 mx-auto hover:scale-105 transition-all shadow-lg">
                <CreditCard size={16} /> View & Print ID Card
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">ID Card not generated yet. Contact admin.</p>
        )}
      </motion.div>

      {/* Attendance History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Recent Attendance</h3>
        {profile?.attendance?.length > 0 ? (
          <div className="space-y-3">
            {profile.attendance.slice(-5).reverse().map((record: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${record.status === 'Present' ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span>{new Date(record.date).toLocaleDateString()}</span>
                </div>
                <span className="text-sm text-gray-400">{record.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No attendance records yet</p>
        )}
      </motion.div>

      {/* ID Card Modal */}
      <AnimatePresence>
        {showIDCard && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowIDCard(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-transparent" onClick={e => e.stopPropagation()}>
              <div ref={idCardRef} className="print-area">
                <StaffIDCard staff={{
                  name: profile?.name || 'Staff Name',
                  staffId: profile?.staffId || 'SMT-000',
                  role: profile?.role || 'Staff',
                  department: profile?.department || 'General',
                  email: profile?.email || '',
                  phone: profile?.phone || '',
                  photo: profile?.photo || '',
                  idCardNumber: profile?.idCardNumber || '',
                  joiningDate: profile?.joiningDate || new Date().toISOString()
                }} />
              </div>
              <div className="flex justify-center gap-3 mt-4">
                <button onClick={handlePrint}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold flex items-center gap-2 hover:scale-105 transition-all shadow-lg">
                  <Printer size={16} /> Print ID Card
                </button>
                <button onClick={() => setShowIDCard(false)}
                  className="px-6 py-2.5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}