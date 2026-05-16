import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export default function DriverDashboard() {
  const { t } = useTranslation()

  const [deliveries,
    setDeliveries] =
      useState<any[]>([])

  useEffect(() => {

    fetchDeliveries()

  }, [])

  const fetchDeliveries =
    async () => {

      try {

        const res =
          await axios.get(
            '/api/deliveries'
          )

        setDeliveries(
          res.data
        )

      } catch (err) {
        console.log(err)
      }

    }

  const updateStatus =
    async (
      id: string,
      status: string
    ) => {

      try {

        await axios.put(
          `/api/deliveries/${id}/status`,
          { status }
        )

        fetchDeliveries()

      } catch (err) {
        console.log(err)
      }

    }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Driver Dashboard
        </h1>

        <p className="text-gray-400">
          Manage active deliveries
        </p>

      </div>

      <div className="space-y-4">

        {deliveries.map(delivery => (

          <div
            key={delivery._id}
            className="bg-[#0f172a] border border-gray-800 rounded-xl p-5"
          >

            <div className="flex justify-between">

              <div>

                <h2 className="font-bold text-lg">
                  {delivery.trackingCode}
                </h2>

                <p className="text-gray-400">
                  Status:
                  {' '}
                  {delivery.status}
                </p>

              </div>

              <div className="space-x-2">

                <button
                  onClick={() =>
                    updateStatus(
                      delivery._id,
                      'picked-up'
                    )
                  }
                  className="bg-yellow-600 px-3 py-2 rounded"
                >
                  Picked Up
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      delivery._id,
                      'in-transit'
                    )
                  }
                  className="bg-blue-600 px-3 py-2 rounded"
                >
                  In Transit
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      delivery._id,
                      'delivered'
                    )
                  }
                  className="bg-green-600 px-3 py-2 rounded"
                >
                  Delivered
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

