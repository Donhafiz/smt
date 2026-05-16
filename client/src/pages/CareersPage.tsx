import { useTranslation } from 'react-i18next'

import { motion } from 'framer-motion'
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function CareersPage() {
  const { t } = useTranslation()
  const jobs = [
    { title: 'Senior Web Developer', dept: 'Software Development', location: 'Tamale, Ghana', type: 'Full-time' },
    { title: 'IT Trainer', dept: 'IT Training School', location: 'Tamale, Ghana', type: 'Full-time' },
    { title: 'Cybersecurity Analyst', dept: 'Consultancy', location: 'Tamale, Ghana', type: 'Full-time' },
    { title: 'UI/UX Designer', dept: 'Software Development', location: 'Remote', type: 'Contract' },
    { title: 'Sales Representative', dept: 'Commerce Market', location: 'Tamale, Ghana', type: 'Full-time' },
  ]

  return (
    <div className="min-h-screen pt-28 px-6 max-w-6xl mx-auto pb-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center mb-6">
          Join Our Team
        </h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Build your career with Star Media Tech and help shape the future of technology in Africa.
        </p>
      </motion.div>

      <div className="grid gap-4">
        {jobs.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-xl font-bold">{job.title}</h3>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Briefcase size={14} /> {job.dept}</span>
                <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
              </div>
            </div>
            <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all">
              Apply Now <ArrowRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12 p-8 bg-white/5 border border-white/10 rounded-2xl">
        <h2 className="text-2xl font-bold mb-2">Don't see a fit?</h2>
        <p className="text-gray-400">Send your CV to starmedia568@gmail.com</p>
      </div>
    </div>
  )
}


