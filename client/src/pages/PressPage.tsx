import { motion } from 'framer-motion'
import { Newspaper, ExternalLink } from 'lucide-react'

export default function PressPage() {
  const articles = [
    { title: 'Star Media Tech Launches AI Training Program', date: 'March 2025', source: 'TechAfrica News' },
    { title: 'SMT Expands to Serve Pan-African Market', date: 'January 2025', source: 'Business Ghana' },
    { title: 'How SMT is Training the Next Generation of Developers', date: 'October 2024', source: 'Innovation Hub' },
    { title: 'Star Media Tech Wins Best Tech Institute Award', date: 'July 2024', source: 'Ghana Tech Awards' },
  ]

  return (
    <div className="min-h-screen pt-28 px-6 max-w-4xl mx-auto pb-20">
      <h1 className="text-5xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
        Press & Media
      </h1>
      <p className="text-gray-400 text-center mb-12">Latest news and media coverage about Star Media Tech</p>

      <div className="space-y-4">
        {articles.map((article, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Newspaper size={20} className="text-cyan-400" />
              <div>
                <h3 className="font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.date} • {article.source}</p>
              </div>
            </div>
            <ExternalLink size={16} className="text-gray-500" />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-400">Media inquiries: <a href="mailto:starmedia568@gmail.com" className="text-cyan-400">starmedia568@gmail.com</a></p>
      </div>
    </div>
  )
}