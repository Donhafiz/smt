import { useEffect, useState } from 'react'
import axios from 'axios'

export default function RestockAI() {

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {

    try {

      const res = await axios.get(
        '/api/restock/insights'
      )

      setData(res.data)

    } catch (err) {

      console.log(err)

    }
  }

  return (
    <div className="space-y-6 text-white">

      <div>

        <h1 className="text-3xl font-bold">
          Auto Restock AI
        </h1>

        <p className="text-gray-400">
          Self-managing inventory intelligence
        </p>

      </div>

      {/* SUMMARY */}
      <div className="bg-[#0f172a] p-6 rounded-xl border border-gray-800">

        <p>Total Products: {data?.totalProducts}</p>
        <p>Critical: {data?.criticalCount}</p>
        <p>Warnings: {data?.warningCount}</p>

      </div>

      {/* ALERTS */}
      <div className="space-y-3">

        {data?.alerts?.map((a: any, i: number) => (

          <div
            key={i}
            className={`p-4 rounded-lg border ${
              a.level === 'critical'
                ? 'border-red-500'
                : a.level === 'warning'
                ? 'border-yellow-500'
                : 'border-blue-500'
            }`}
          >

            <p className="font-semibold">
              {a.level.toUpperCase()}
            </p>

            <p className="text-gray-300">
              {a.message}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}