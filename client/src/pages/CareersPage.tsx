import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, MapPin, Clock, Search, ArrowRight, Sparkles,
  Users, Zap, Heart, Shield, Star, DollarSign, GraduationCap,
  Building2, ChevronRight, Calendar, CheckCircle2
} from 'lucide-react'

export default function CareersPage() {
  const [search, setSearch] = useState('')
  const [activeDept, setActiveDept] = useState('all')
  const [selectedJob, setSelectedJob] = useState<any>(null)

  const departments = ['all', 'Engineering', 'Design', 'Marketing', 'Sales', 'Support']

  const jobs = [
    { title: 'Senior Full Stack Developer', dept: 'Engineering', location: 'Tamale, Ghana', type: 'Full-time', salary: 'GHS 5,000 - 8,000', posted: '2 days ago', description: 'We are looking for an experienced Full Stack Developer to build and maintain web applications using React, Node.js, and MongoDB.' },
    { title: 'UI/UX Designer', dept: 'Design', location: 'Remote', type: 'Full-time', salary: 'GHS 3,500 - 6,000', posted: '5 days ago', description: 'Join our design team to create beautiful, intuitive interfaces for our platform and client projects.' },
    { title: 'Digital Marketing Specialist', dept: 'Marketing', location: 'Tamale, Ghana', type: 'Full-time', salary: 'GHS 2,500 - 4,000', posted: '1 week ago', description: 'Drive our digital marketing strategy across social media, email campaigns, and content marketing.' },
    { title: 'IT Trainer (Web Development)', dept: 'Engineering', location: 'Tamale, Ghana', type: 'Full-time', salary: 'GHS 3,000 - 5,000', posted: '3 days ago', description: 'Teach and mentor students in our IT Training School. Must have strong web development skills and a passion for teaching.' },
    { title: 'Customer Support Specialist', dept: 'Support', location: 'Remote', type: 'Part-time', salary: 'GHS 1,500 - 2,500', posted: '1 week ago', description: 'Help our customers with inquiries, technical issues, and ensure they have the best experience with SMT.' },
    { title: 'Sales Representative', dept: 'Sales', location: 'Tamale, Ghana', type: 'Full-time', salary: 'GHS 2,000 - 3,500 + Commission', posted: '4 days ago', description: 'Drive sales for our Commerce Market and IT training programs. Excellent communication skills required.' },
  ]

  const filteredJobs = activeDept === 'all' 
    ? jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase()))
    : jobs.filter(j => j.dept === activeDept && j.title.toLowerCase().includes(search.toLowerCase()))

  const benefits = [
    { icon: <DollarSign size={22} />, title: 'Competitive Salary', desc: 'Market-leading pay with performance bonuses' },
    { icon: <GraduationCap size={22} />, title: 'Learning Budget', desc: 'Free access to all SMT courses + external training' },
    { icon: <Heart size={22} />, title: 'Health Benefits', desc: 'Comprehensive health insurance coverage' },
    { icon: <Zap size={22} />, title: 'Flexible Hours', desc: 'Work when you\'re most productive' },
    { icon: <Users size={22} />, title: 'Great Team', desc: 'Work with passionate, talented people' },
    { icon: <Star size={22} />, title: 'Career Growth', desc: 'Clear promotion paths and mentorship' },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles size={14} className="text-orange-400" />
            <span className="text-sm text-gray-400">Join Our Team</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Careers at SMT
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Build your career with Ghana's premier technology institution
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {benefits.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 text-center hover:scale-105 transition-all">
              <div className="text-orange-400 mb-3 flex justify-center">{b.icon}</div>
              <h3 className="font-bold text-sm">{b.title}</h3>
              <p className="text-gray-500 text-[11px] mt-1">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-3.5 text-gray-500" />
            <input type="text" placeholder="Search positions..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {departments.map(d => (
              <button key={d} onClick={() => setActiveDept(d)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                  activeDept === d ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>{d}</button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedJob(job)}
              className="glass rounded-2xl p-6 cursor-pointer hover:border-orange-400/30 transition-all group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-orange-400 transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Briefcase size={14} /> {job.dept}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                    <span className="flex items-center gap-1"><DollarSign size={14} /> {job.salary}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{job.posted}</span>
                  <ArrowRight size={16} className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Job Detail Modal */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedJob(null)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                <div className="flex flex-wrap gap-3 mb-6 text-sm text-gray-400">
                  <span>{selectedJob.dept}</span> · <span>{selectedJob.location}</span> · <span>{selectedJob.type}</span>
                </div>
                <p className="text-gray-300 mb-6">{selectedJob.description}</p>
                <p className="text-orange-400 font-bold text-lg mb-6">{selectedJob.salary}</p>
                <button className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-semibold hover:scale-105 transition-all">
                  Apply Now — Send CV to starmedia568@gmail.com
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-10 text-center mt-16">
          <Building2 size={40} className="text-orange-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Don't see the right role?</h2>
          <p className="text-gray-400 mb-6">Send your CV and we'll keep you in mind for future opportunities</p>
          <a href="mailto:starmedia568@gmail.com" className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-semibold hover:scale-105 transition-all inline-block">
            Send Your CV
          </a>
        </motion.div>
      </div>
    </div>
  )
}