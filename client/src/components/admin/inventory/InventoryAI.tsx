import { useEffect, useState } from 'react'
import socket from '../../../lib/socket'

export default function InventoryAI() {

  const [data, setData] = useState({
    total: 0,
    healthy: 0,
    low: 0,
    critical: 0
  })

  useEffect(() => {

    socket.on('inventory-health', (payload) => {
      setData(payload)
    })

    return () => {
      socket.off('inventory-health')
    }

  }, [])

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">

      <h2 className="font-bold text-lg mb-4">
        Inventory AI Status
      </h2>

      <div className="grid grid-cols-2 gap-3 text-sm">

        <div>
          <p className="text-gray-400">Total</p>
          <p className="text-white text-xl">{data.total}</p>
        </div>

        <div>
          <p className="text-gray-400">Healthy</p>
          <p className="text-green-400 text-xl">{data.healthy}</p>
        </div>

        <div>
          <p className="text-gray-400">Low Stock</p>
          <p className="text-yellow-400 text-xl">{data.low}</p>
        </div>

        <div>
          <p className="text-gray-400">Critical</p>
          <p className="text-red-400 text-xl">{data.critical}</p>
        </div>

      </div>

    </div>
  )
}