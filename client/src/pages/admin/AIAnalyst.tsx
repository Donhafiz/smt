import { useState, useRef, useEffect } from 'react'
import api from '../../lib/axios'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {   Brain, Send, Sparkles, TrendingUp, TrendingDown,
  DollarSign, ShoppingCart, Users, Package, ChartBar,
  Lightbulb, Zap, RefreshCw, Trash2, Copy, Check,
  Download, History, ArrowRight, Bot, User
} from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  data?: any
}

export default function AIAnalyst() {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hello! I'm your AI CFO Analyst. I have access to your entire ERP data.\n\nI can answer questions like:\n\n📊 **Revenue Analysis**\n• \"What's our total revenue this month?\"\n• \"Show me revenue trends\"\n\n📦 **Orders & Products**\n• \"How many orders do we have?\"\n• \"What's our best-selling product?\"\n\n👥 **Customers & Users**\n• \"How many customers do we have?\"\n• \"Show user growth\"\n\n💡 **Insights**\n• \"Give me a business summary\"\n• \"What should I focus on?\"\n\nJust type your question below!",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const processQuery = async (query: string) => {
    const q = query.toLowerCase()

    try {
      // Fetch real data based on the query
      if (q.includes('revenue') || q.includes('sales') || q.includes('money') || q.includes('income')) {
        const ordersRes = await api.get('/orders')
        const orders = ordersRes.data || []
        const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0)
        const thisMonth = orders.filter((o: any) => {
          const d = new Date(o.createdAt)
          return d.getMonth() === new Date().getMonth()
        })
        const monthRevenue = thisMonth.reduce((sum: number, o: any) => sum + (o.total || 0), 0)

        return `📊 **Revenue Analysis**\n\n` +
          `💰 **Total Revenue:** GHS ${totalRevenue.toLocaleString()}\n` +
          `📅 **This Month:** GHS ${monthRevenue.toLocaleString()}\n` +
          `📦 **Total Orders:** ${orders.length}\n` +
          `📊 **Avg Order Value:** GHS ${orders.length > 0 ? (totalRevenue / orders.length).toFixed(2) : '0.00'}\n\n` +
          (monthRevenue > 0 ? `📈 Revenue this month is tracking well. Keep pushing!` : `📉 No revenue this month yet. Time to run promotions!`)
      }

      if (q.includes('order') || q.includes('purchase')) {
        const ordersRes = await api.get('/orders')
        const orders = ordersRes.data || []
        const pending = orders.filter((o: any) => o.status === 'pending').length
        const completed = orders.filter((o: any) => o.status === 'completed').length

        return `📦 **Orders Overview**\n\n` +
          `📋 **Total Orders:** ${orders.length}\n` +
          `⏳ **Pending:** ${pending}\n` +
          `✅ **Completed:** ${completed}\n` +
          `❌ **Cancelled:** ${orders.filter((o: any) => o.status === 'cancelled').length}\n\n` +
          `📊 Completion rate: ${orders.length > 0 ? ((completed / orders.length) * 100).toFixed(1) : 0}%`
      }

      if (q.includes('product') || q.includes('inventory') || q.includes('stock') || q.includes('best sell')) {
        const productsRes = await api.get('/products')
        const products = productsRes.data || []
        const totalStock = products.reduce((sum: number, p: any) => sum + (p.stock || 0), 0)
        const lowStock = products.filter((p: any) => p.stock < 10)

        return `📦 **Product Analysis**\n\n` +
          `🛍️ **Total Products:** ${products.length}\n` +
          `📦 **Total Stock:** ${totalStock} units\n` +
          `⚠️ **Low Stock Items:** ${lowStock.length}\n\n` +
          (lowStock.length > 0 ? `**Low Stock Alert:**\n${lowStock.map((p: any) => `• ${p.name} — ${p.stock} left`).join('\n')}\n\nConsider restocking soon!` : `✅ All products are well stocked.`)
      }

      if (q.includes('customer') || q.includes('user') || q.includes('client') || q.includes('people')) {
        const usersRes = await api.get('/staff')
        const users = usersRes.data || []
        const customers = users.filter((u: any) => u.role === 'user')

        return `👥 **Customer Analysis**\n\n` +
          `👤 **Total Users:** ${users.length}\n` +
          `🛒 **Customers:** ${customers.length}\n` +
          `👷 **Staff:** ${users.filter((u: any) => u.role !== 'user').length}\n\n` +
          `Your user base is growing! Focus on retention and customer satisfaction.`
      }

      if (q.includes('staff') || q.includes('employee') || q.includes('team')) {
        const staffRes = await api.get('/staff')
        const staff = staffRes.data || []
        const departments = [...new Set(staff.map((s: any) => s.department))]

        return `👷 **Staff Overview**\n\n` +
          `👥 **Total Staff:** ${staff.length}\n` +
          `🏢 **Departments:** ${departments.length}\n\n` +
          `**By Department:**\n${departments.map((d: any) => `• ${d}: ${staff.filter((s: any) => s.department === d).length} members`).join('\n')}`
      }

      if (q.includes('summary') || q.includes('overview') || q.includes('insight') || q.includes('focus') || q.includes('what should')) {
        const [ordersRes, productsRes, staffRes] = await Promise.all([
          api.get('/orders'),
          api.get('/products'),
          api.get('/staff')
        ])

        const orders = ordersRes.data || []
        const products = productsRes.data || []
        const staff = staffRes.data || []
        const revenue = orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0)

        return `📊 **Business Summary**\n\n` +
          `## 📈 Key Metrics\n` +
          `• **Revenue:** GHS ${revenue.toLocaleString()}\n` +
          `• **Orders:** ${orders.length}\n` +
          `• **Products:** ${products.length}\n` +
          `• **Staff:** ${staff.length}\n\n` +
          `## 💡 AI Recommendations\n` +
          `1. 📦 ${products.filter((p: any) => p.stock < 10).length} products are low in stock — restock soon\n` +
          `2. 📊 Revenue tracking: GHS ${(revenue / (orders.length || 1)).toFixed(2)} avg per order\n` +
          `3. 👥 Customer engagement is key — consider email campaigns\n` +
          `4. 🎯 Focus on marketing your top services\n\n` +
          `Your business is healthy! Keep optimizing. 🚀`
      }

      // Default response with real data
      const [ordersRes, productsRes, staffRes] = await Promise.allSettled([
        api.get('/orders'),
        api.get('/products'),
        api.get('/staff')
      ])

      const orderCount = ordersRes.status === 'fulfilled' ? ordersRes.value.data.length : 'N/A'
      const productCount = productsRes.status === 'fulfilled' ? productsRes.value.data.length : 'N/A'
      const staffCount = staffRes.status === 'fulfilled' ? staffRes.value.data.length : 'N/A'

      return `🤔 I'm not sure how to answer that specific question. But here's what I know about your business:\n\n` +
        `📦 Orders: ${orderCount}\n🛍️ Products: ${productCount}\n👥 Staff: ${staffCount}\n\n` +
        `Try asking:\n• "Revenue analysis"\n• "Product inventory"\n• "Business summary"\n• "Customer stats"`

    } catch (err) {
      return `❌ Sorry, I couldn't fetch the data. Please try again.\n\nError: ${(err as any)?.message || 'Unknown error'}`
    }
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    const response = await processQuery(input)

    const assistantMessage: Message = {
      role: 'assistant',
      content: response,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, assistantMessage])
    setLoading(false)
  }

  const handleClear = () => {
    setMessages([messages[0]])
  }

  const suggestedQuestions = [
    'Business summary',
    'Revenue analysis',
    'Product inventory',
    'Customer stats',
    'Staff overview',
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            AI CFO Analyst
          </h1>
          <p className="text-gray-400 text-sm mt-1">Ask your ERP intelligence engine anything</p>
        </div>
        <button onClick={handleClear} className="px-4 py-2 border border-white/20 rounded-xl text-sm hover:bg-white/10 transition-all flex items-center gap-2">
          <Trash2 size={14} /> Clear Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass rounded-2xl p-6 mb-4 overflow-y-auto space-y-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                msg.role === 'assistant'
                  ? 'bg-gradient-to-br from-purple-500 to-pink-600'
                  : 'bg-gradient-to-br from-cyan-500 to-blue-600'
              }`}>
                {msg.role === 'assistant' ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                msg.role === 'assistant'
                  ? 'bg-white/5 rounded-tl-sm'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-sm'
              }`}>
                <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                <p className="text-[10px] mt-2 opacity-50">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => { setInput(q); setTimeout(() => handleSend(), 100) }}
              className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm hover:bg-purple-500/20 transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about revenue, orders, products, customers..."
          disabled={loading}
          className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-purple-500/25 flex items-center gap-2"
        >
          {loading ? (
            <RefreshCw size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>
    </div>
  )
}


