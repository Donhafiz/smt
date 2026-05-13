import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts'

const mockData = [
  { name: 'Jan', services: 4, staff: 2 },
  { name: 'Feb', services: 7, staff: 3 },
  { name: 'Mar', services: 5, staff: 4 },
  { name: 'Apr', services: 9, staff: 6 },
  { name: 'May', services: 12, staff: 7 },
  { name: 'Jun', services: 15, staff: 9 }
]

export default function AnalyticsCharts() {
  return (
    <div className="space-y-6">

      {/* TITLE */}
      <div>
        <h2 className="text-xl font-bold">Analytics Overview</h2>
        <p className="text-gray-400 text-sm">
          SMT performance insights (mock + real data ready)
        </p>
      </div>

      {/* LINE CHART */}
      <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
        <h3 className="text-sm text-gray-400 mb-4">
          Growth Trend (Services vs Staff)
        </h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="services"
                stroke="#3b82f6"
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="staff"
                stroke="#22c55e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BAR CHART */}
      <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
        <h3 className="text-sm text-gray-400 mb-4">
          Monthly Performance
        </h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />

              <Bar dataKey="services" fill="#3b82f6" />
              <Bar dataKey="staff" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}