import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export function useLiveData() {
  const [liveStats, setLiveStats] = useState({
    visitors: Math.floor(Math.random() * 50) + 10,
    orders: 0,
    revenue: 0,
    lastOrder: null as any
  })

  useEffect(() => {
    if (!socket) {
      socket = io('http://localhost:5000', {
        transports: ['websocket', 'polling']
      })
    }

    socket.on('newOrder', (order: any) => {
      setLiveStats(prev => ({
        ...prev,
        orders: prev.orders + 1,
        revenue: prev.revenue + (order.total || 0),
        lastOrder: order
      }))
    })

    socket.on('visitorUpdate', (count: number) => {
      setLiveStats(prev => ({ ...prev, visitors: count }))
    })

    return () => {
      socket?.off('newOrder')
      socket?.off('visitorUpdate')
    }
  }, [])

  return liveStats
}