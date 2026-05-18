import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, X, Send, Sparkles, Bot, User,
  Zap, GraduationCap, ShoppingCart, Wrench, Lightbulb,
  Loader2, Mic, ThumbsUp, ThumbsDown, Copy, Check, ArrowDown,
  Phone, Mail, ExternalLink
} from 'lucide-react'
import api from '../../lib/axios'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  liked?: boolean
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! 👋 I'm your SMT AI Assistant.\n\nI can help with:\n• 💻 Software Development\n• 🎓 IT Training Courses\n• 🔧 Hiring Our Tech Team\n• 🛒 Products & Shopping\n• 🤖 AI Solutions\n\nHow can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [typing, setTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [messages, isOpen])

  const suggestedQuestions = [
    { icon: <Wrench size={13} />, text: 'How can I hire your tech team?' },
    { icon: <GraduationCap size={13} />, text: 'What IT courses do you offer?' },
    { icon: <ShoppingCart size={13} />, text: 'Show me available products' },
    { icon: <Zap size={13} />, text: 'Tell me about your pricing' },
  ]

  const quickActions = [
    { icon: <Phone size={14} />, label: 'Call', action: () => window.open('tel:+233559137611') },
    { icon: <Mail size={14} />, label: 'Email', action: () => window.open('mailto:starmedia568@gmail.com') },
    { icon: <ExternalLink size={14} />, label: 'Site', action: () => window.open('/') },
  ]

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || loading) return

    const userMessage: Message = { role: 'user', content: messageText, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setTyping(true)

    try {
      const res = await api.post('/ai-chat', {
        messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
      })

      setTimeout(() => {
        setTyping(false)
        setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply, timestamp: new Date() }])
      }, 800)
    } catch (err) {
      setTyping(false)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble right now. Please call us at +233 559 137 611 or email starmedia568@gmail.com.",
        timestamp: new Date()
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

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(index)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleLike = (index: number) => {
    setMessages(prev => prev.map((msg, i) => i === index ? { ...msg, liked: !msg.liked } : msg))
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 sm:bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl shadow-cyan-500/30 flex items-center justify-center hover:scale-110 transition-all group"
          >
            <MessageCircle size={24} className="text-white group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-green-400 rounded-full border-2 border-[#020617] animate-pulse" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-30" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window — Mobile Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed z-50 flex flex-col overflow-hidden
              // Mobile: covers most of screen but not full
              inset-x-0 bottom-0 h-[85vh] 
              // Desktop: fixed size card
              sm:inset-auto sm:bottom-6 sm:right-6 
              sm:w-[400px] sm:h-[580px] sm:max-h-[80vh]
              // Styling
              bg-[#0a0f1e] border border-white/10 
              sm:rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-4 flex items-center justify-between shrink-0 sm:rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Bot size={22} className="text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-cyan-600" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">SMT Assistant</h3>
                  <p className="text-[10px] text-white/70 flex items-center gap-1">
                    <Sparkles size={10} /> Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsMinimized(!isMinimized)}
                  className="hidden sm:flex p-1.5 rounded-lg hover:bg-white/10 transition-all text-white/80">
                  <ArrowDown size={16} className={`transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
                </button>
                <button onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all text-white/80">
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                  {messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'assistant' ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 'bg-gradient-to-br from-purple-500 to-pink-600'
                      }`}>
                        {msg.role === 'assistant' ? <Bot size={14} className="text-white" /> : <User size={14} className="text-white" />}
                      </div>
                      <div className="group relative">
                        <div className={`max-w-[240px] sm:max-w-[280px] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                          msg.role === 'assistant' ? 'bg-white/5 text-gray-200 rounded-tl-sm' : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-sm'
                        }`}>
                          {msg.content}
                        </div>
                        {msg.role === 'assistant' && (
                          <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleCopy(msg.content, i)}
                              className="p-1 rounded-md hover:bg-white/10 text-gray-500 hover:text-white">
                              {copiedId === i ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                            </button>
                            <button onClick={() => handleLike(i)}
                              className={`p-1 rounded-md hover:bg-white/10 ${msg.liked ? 'text-green-400' : 'text-gray-500'}`}>
                              <ThumbsUp size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {typing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <Bot size={14} className="text-white" />
                      </div>
                      <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2 shrink-0">
                    <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">Suggested</p>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedQuestions.map((q, i) => (
                        <button key={i} onClick={() => handleSend(q.text)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-400 hover:text-white hover:border-cyan-400/30 hover:bg-cyan-500/10 transition-all">
                          {q.icon} {q.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="px-4 pb-2 shrink-0">
                  <div className="flex gap-2">
                    {quickActions.map((action, i) => (
                      <button key={i} onClick={action.action}
                        className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-1.5">
                        {action.icon} {action.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <input ref={inputRef} type="text" value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        disabled={loading}
                        className="w-full pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all text-sm" />
                    </div>
                    <button onClick={() => handleSend()} disabled={loading || !input.trim()}
                      className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:scale-105 transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20">
                      {loading ? <Loader2 size={18} className="text-white animate-spin" /> : <Send size={18} className="text-white" />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}