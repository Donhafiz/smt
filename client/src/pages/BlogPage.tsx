import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, Calendar, User, ArrowRight, Sparkles, TrendingUp,
  Clock, BookOpen, Tag, ChevronRight, Heart, MessageCircle, Share2
} from 'lucide-react'

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', 'Technology', 'Education', 'Business', 'Design', 'Career']

  const posts = [
    {
      title: 'The Future of Tech Education in Africa',
      excerpt: 'How digital learning platforms are transforming education across the continent and creating new opportunities for millions.',
      author: 'Hafiz Iddrisu',
      date: 'May 15, 2026',
      readTime: '5 min read',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80',
      likes: 234,
      comments: 45
    },
    {
      title: 'Why Every Business Needs a Website in 2026',
      excerpt: 'Discover why having an online presence is no longer optional and how SMT can help you build the perfect website.',
      author: 'Ama Serwaa',
      date: 'May 10, 2026',
      readTime: '4 min read',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      likes: 189,
      comments: 32
    },
    {
      title: 'Top 10 Cybersecurity Threats in 2026',
      excerpt: 'Stay ahead of hackers with our comprehensive guide to the most pressing cybersecurity threats this year.',
      author: 'Kwame Asante',
      date: 'May 5, 2026',
      readTime: '7 min read',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
      likes: 312,
      comments: 67
    },
    {
      title: 'From Zero to Developer: A Student Success Story',
      excerpt: 'How one of our students went from knowing nothing about coding to landing a job at a top tech company.',
      author: 'Grace Osei',
      date: 'April 28, 2026',
      readTime: '6 min read',
      category: 'Career',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
      likes: 456,
      comments: 89
    },
  ]

  const filteredPosts = activeCategory === 'all' 
    ? posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    : posts.filter(p => p.category === activeCategory && p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-sm text-gray-400">Insights & Stories</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            SMT Blog
          </h1>
          <p className="mt-4 text-xl text-gray-400">Tech insights, tutorials, and success stories</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-3.5 text-gray-500" />
            <input type="text" placeholder="Search articles..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                  activeCategory === cat ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredPosts.map((post, i) => (
            <motion.article key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }} className="glass rounded-2xl overflow-hidden group cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <span className="text-xs text-purple-400 font-semibold">{post.category}</span>
                <h2 className="text-xl font-bold mt-2 group-hover:text-purple-400 transition-colors">{post.title}</h2>
                <p className="text-gray-400 text-sm mt-3 line-clamp-2">{post.excerpt}</p>
                
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Heart size={12} /> {post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={12} /> {post.comments}</span>
                  </div>
                  <button className="text-purple-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}