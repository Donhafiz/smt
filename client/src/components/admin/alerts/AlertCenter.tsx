import { useEffect, useState } from 'react'
import socket from '../../../lib/socket'

interface Alert {
  type: string
  message: string
  time: string
}

export default function AlertCenter() {

  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {

    socket.on('alert', (data) => {

      const newAlert = {
        ...data,
        time: new Date().toLocaleTimeString()
      }

      setAlerts(prev => [newAlert, ...prev])

    })

    return () => {
      socket.off('alert')
    }

  }, [])

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">

      <div className="flex justify-between mb-4">

        <h2 className="font-bold text-lg">
          Live Smart Alerts
        </h2>

        <span className="text-xs bg-red-600 px-2 py-1 rounded-full">
          {alerts.length}
        </span>

      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto">

        {alerts.length === 0 && (
          <p className="text-gray-400 text-sm">
            No alerts yet
          </p>
        )}

        {alerts.map((a, i) => (
          <div key={i} className="p-3 bg-black/30 rounded-lg">

            <p className="text-sm">{a.message}</p>

            <p className="text-xs text-gray-500 mt-1">
              {a.time}
            </p>

          </div>
        ))}

      </div>

    </div>
  )
}