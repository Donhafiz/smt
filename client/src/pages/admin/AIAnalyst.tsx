import { useState } from 'react'
import axios from 'axios'

interface Message {
  role: 'user' | 'ai'
  text: string
}

export default function AIAnalyst() {

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: 'Hello 👋 Ask me anything about your business.'
    }
  ])

  const [input, setInput] = useState('')

  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {

    if (!input.trim()) return

    const userMessage = {
      role: 'user' as const,
      text: input
    }

    setMessages(prev => [...prev, userMessage])

    const currentInput = input

    setInput('')

    try {

      setLoading(true)

      const res = await axios.post('/api/ai/chat', {
        message: currentInput
      })

      const aiMessage = {
        role: 'ai' as const,
        text: res.data.response
      }

      setMessages(prev => [...prev, aiMessage])

    } catch (err) {

      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          text: 'AI service unavailable.'
        }
      ])

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="space-y-6 text-white">

      {/* HEADER */}
      <div>

        <h1 className="text-3xl font-bold">
          AI CFO Analyst
        </h1>

        <p className="text-gray-400">
          Ask your ERP intelligence engine anything
        </p>

      </div>

      {/* CHAT BOX */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-xl h-[600px] flex flex-col">

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.role === 'user'
                  ? 'bg-blue-600 ml-auto'
                  : 'bg-black/40'
              }`}
            >

              <p className="text-sm">
                {msg.text}
              </p>

            </div>

          ))}

          {loading && (
            <div className="bg-black/40 p-3 rounded-xl max-w-[200px]">
              AI is thinking...
            </div>
          )}

        </div>

        {/* INPUT */}
        <div className="border-t border-gray-800 p-4 flex gap-3">

          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about revenue, orders, stock..."
            className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-3"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                sendMessage()
              }
            }}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  )
}