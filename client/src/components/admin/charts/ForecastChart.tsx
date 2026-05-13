import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

interface Props {
  data: any[]
}

export default function ForecastChart({ data }: Props) {
  return (
    <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

      <div className="flex items-center justify-between mb-4">

        <div>
          <h2 className="text-lg font-bold text-white">
            AI Revenue Forecast
          </h2>

          <p className="text-sm text-gray-400">
            Predictive business intelligence
          </p>
        </div>

      </div>

      <div className="h-[300px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}