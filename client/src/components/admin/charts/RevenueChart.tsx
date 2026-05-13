import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface Props {
  data: {
    name: string
    revenue: number
  }[]
}

export default function RevenueChart({ data }: Props) {
  return (
    <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
      <h2 className="text-lg font-semibold mb-4">
        Revenue Trend
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}