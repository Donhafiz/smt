import { useEffect, useState } from 'react'
import socket from '../../lib/socket'

export default function LiveAlerts() {
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {

    socket.on('new-order', (data) => {
      setAlerts(prev => [
        {
          type: 'order',
          message: data.message
        },
        ...prev
      ])
    })

    socket.on('ai-alert', (data) => {
      setAlerts(prev => [
        {
          type: 'ai',
          message: data.message
        },
        ...prev
      ])
    })

    return () => {
      socket.off('new-order')
      socket.off('ai-alert')
    }

  }, [])

  return (
    <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">

      <h2 className="font-bold mb-3">Live ERP Alerts</h2>

      <div className="space-y-2">

        {alerts.map((a, i) => (
          <div
            key={i}
            className="text-sm p-2 rounded bg-black/30"
          >
            {a.type === 'order' && '🛒 '}
            {a.type === 'ai' && '🧠 '}
            {a.message}
          </div>
        ))}

      </div>

    </div>
  )
}