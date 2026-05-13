import { useState } from 'react'
import axios from 'axios'

export default function TrackOrderPage() {

  const [trackingCode,
    setTrackingCode] =
      useState('')

  const [delivery,
    setDelivery] =
      useState<any>(null)

  const searchTracking =
    async () => {

      try {

        const res =
          await axios.get(
            `/api/deliveries/track/${trackingCode}`
          )

        setDelivery(
          res.data
        )

      } catch (err) {
        console.log(err)
      }

    }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <div className="max-w-xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Track Your Order
        </h1>

        <div className="flex gap-3">

          <input
            placeholder="Enter tracking code"
            className="flex-1 p-3 rounded bg-black border border-gray-700"
            value={trackingCode}
            onChange={e =>
              setTrackingCode(
                e.target.value
              )
            }
          />

          <button
            onClick={searchTracking}
            className="bg-blue-600 px-5 rounded"
          >
            Track
          </button>

        </div>

        {delivery && (

          <div className="mt-8 bg-[#0f172a] p-6 rounded-xl border border-gray-800">

            <h2 className="text-2xl font-bold">
              {delivery.trackingCode}
            </h2>

            <p className="text-green-400 mt-3">
              Current Status:
              {' '}
              {delivery.status}
            </p>

            {/* TIMELINE */}
            <div className="mt-6 space-y-4">

              <div
                className={
                  delivery.status !== 'pending'
                    ? 'text-green-400'
                    : 'text-gray-500'
                }
              >
                ✓ Order Assigned
              </div>

              <div
                className={
                  [
                    'picked-up',
                    'in-transit',
                    'delivered'
                  ].includes(
                    delivery.status
                  )
                    ? 'text-green-400'
                    : 'text-gray-500'
                }
              >
                ✓ Picked Up
              </div>

              <div
                className={
                  [
                    'in-transit',
                    'delivered'
                  ].includes(
                    delivery.status
                  )
                    ? 'text-green-400'
                    : 'text-gray-500'
                }
              >
                ✓ In Transit
              </div>

              <div
                className={
                  delivery.status ===
                  'delivered'
                    ? 'text-green-400'
                    : 'text-gray-500'
                }
              >
                ✓ Delivered
              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  )
}