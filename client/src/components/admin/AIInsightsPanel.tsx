import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AIInsightsPanel() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchInsights()
  }, [])

  const fetchInsights = async () => {
    const res = await axios.get('/api/ai/insights')
    setData(res.data)
  }

  if (!data) return null

  return (
    <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

      <h2 className="font-bold text-lg mb-3">
        🧠 AI Business Intelligence
      </h2>

      <p className="text-sm text-gray-400 mb-3">
        Revenue: GHS {data.revenue}
      </p>

      <div className="space-y-2">

        {data.insights.map((insight: any, i: number) => (
          <div
            key={i}
            className="text-sm p-2 rounded bg-black/30"
          >
            {insight.message}
          </div>
        ))}

      </div>

    </div>
  )
}