import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, X, Send, Sparkles, Bot, User,
  Zap, GraduationCap, ShoppingCart, Wrench, Lightbulb,
  Loader2
} from 'lucide-react'
import api from '../../lib/axios'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! 👋 I'm your SMT AI Assistant. I can help you with:\n\n• 💻 Software Development\n• 🎓 IT Training Courses\n• 🔧 IT Consultancy\n• 🛒 Products & Shopping\n• 🤖 AI Solutions\n\nHow can I help you today?"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const suggestedQuestions = [
    { icon: <GraduationCap size={14} />, text: 'What IT courses do you offer?' },
    { icon: <Wrench size={14} />, text: 'How can I hire your tech team?' },
    { icon: <ShoppingCart size={14} />, text: 'Show me available laptops' },
    { icon: <Zap size={14} />, text: 'Tell me about your AI services' },
  ]

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await api.post('/ai-chat', {
        messages: [...messages, userMessage].map(m => ({
          role: m.role,
          content: m.content
        }))
      })

      const assistantMessage: Message = {
        role: 'assistant',
        content: res.data.reply
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble right now. Please call us at +233 559 137 611 or email starmedia568@gmail.com."
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggested = (question: string) => {
    setInput(question)
    setTimeout(() => handleSend(), 100)
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-2xl shadow-cyan-500/30 flex items-center justify-center hover:scale-110 transition-all group"
          >
            <MessageCircle size={24} className="text-white group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#020617] animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] sm:w-[420px] h-[600px] bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">SMT AI Assistant</h3>
                  <p className="text-xs text-white/70 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-300" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-all"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'assistant' 
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                      : 'bg-gradient-to-br from-purple-500 to-pink-600'
                  }`}>
                    {msg.role === 'assistant' ? <Bot size={14} className="text-white" /> : <User size={14} className="text-white" />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'assistant'
                      ? 'bg-white/5 text-gray-200 rounded-tl-sm'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggested(q.text)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:border-cyan-400/30 hover:bg-cyan-500/10 transition-all"
                    >
                      {q.icon}
                      {q.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? (
                    <Loader2 size={18} className="text-white animate-spin" />
                  ) : (
                    <Send size={18} className="text-white" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}