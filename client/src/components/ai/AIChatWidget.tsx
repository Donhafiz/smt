import { useState } from 'react'
import axios from 'axios'

export default function AIChatWidget() {

  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {

    if (!input) return

    const userMessage = {
      role: 'user',
      text: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {

      const res = await axios.post('/api/ai/chat', {
        message: input
      })

      const aiMessage = {
        role: 'ai',
        text: res.data.reply
      }

      setMessages(prev => [...prev, aiMessage])

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4">

      <h2 className="font-bold mb-3">
        SMT AI Assistant
      </h2>

      <div className="h-64 overflow-y-auto space-y-2 mb-3">

        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === 'user'
                ? 'text-right'
                : 'text-left'
            }
          >
            <span
              className={
                m.role === 'user'
                  ? 'bg-blue-600 px-3 py-2 rounded inline-block'
                  : 'bg-green-600 px-3 py-2 rounded inline-block'
              }
            >
              {m.text}
            </span>
          </div>
        ))}

        {loading && (
          <p className="text-gray-400">
            AI is typing...
          </p>
        )}

      </div>

      <div className="flex gap-2">

        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 p-2 bg-black border border-gray-700 rounded"
          placeholder="Ask SMT AI..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 rounded"
        >
          Send
        </button>

      </div>

    </div>
  )
}