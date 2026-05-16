import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export default function AIAdvisor() {
  const { t } = useTranslation()

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchAdvice()
  }, [])

  const fetchAdvice = async () => {

    try {

      const res = await axios.get(
        '/api/ai-advisor/business-advice'
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
          AI Business Advisor
        </h1>

        <p className="text-gray-400">
          Autonomous ERP intelligence engine
        </p>

      </div>

      {/* SUMMARY */}
      <div className="bg-[#0f172a] p-6 rounded-xl border border-gray-800 whitespace-pre-line">

        {data?.summary}

      </div>

      {/* INSIGHTS */}
      <div className="space-y-3">

        {data?.insights?.map((insight: any, i: number) => (

          <div
            key={i}
            className={`p-4 rounded-lg border ${
              insight.type === 'risk'
                ? 'border-red-500'
                : insight.type === 'warning'
                ? 'border-yellow-500'
                : 'border-green-500'
            }`}
          >

            <p className="font-semibold">
              {insight.type.toUpperCase()}
            </p>

            <p className="text-gray-300">
              {insight.message}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}

