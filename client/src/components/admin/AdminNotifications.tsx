import { useEffect, useState } from 'react'
import socket from '../../lib/socket'

interface Notification {
    message: string
    time: string
}

export default function AdminNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([])

    useEffect(() => {

        // NEW ORDER EVENT
        socket.on('new-order', data => {

            const item: Notification = {
                message: data.message,
                time: new Date().toLocaleTimeString()
            }

            setNotifications(prev => [item, ...prev])

        })

        // PAYMENT SUCCESS EVENT
        socket.on('payment-success', data => {

            const item: Notification = {
                message: data.message,
                time: new Date().toLocaleTimeString()
            }

            setNotifications(prev => [item, ...prev])

        })

        socket.on('low-stock', data => {

            const item: Notification = {
                message: data.message,
                time: new Date().toLocaleTimeString()
            }

            setNotifications(prev => [item, ...prev])

                if (Notification.permission === 'granted') {

                new Notification('🛒 New Order', {
                    body: data.message
                })

                }

        })
        // CLEANUP
        return () => {
            socket.off('new-order')
            socket.off('payment-success')
            socket.off('low-stock')
        }

    }, [])

    return (
        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">

                <h2 className="font-bold text-lg">
                    Notifications
                </h2>

                <div className="bg-red-600 text-xs px-2 py-1 rounded-full">
                    {notifications.length}
                </div>

            </div>

            {/* EMPTY STATE */}
            {notifications.length === 0 && (
                <p className="text-gray-400 text-sm">
                    No notifications yet.
                </p>
            )}

            {/* NOTIFICATION LIST */}
            <div className="space-y-3">

                {notifications.map((n, index) => (
                    <div
                        key={index}
                        className="bg-black/30 p-3 rounded-lg border border-gray-800"
                    >

                        <p className="text-sm">
                            {n.message}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            {n.time}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    )
}