import Order from '../models/Order.js'

// ================================
// BASIC FORECAST ENGINE (TREND-BASED)
// ================================
export const generateForecast = async (tenantId) => {
  const orders = await Order.find({ tenantId })

  // group by day
  const daily = {}

  orders.forEach(o => {
    const day = new Date(o.createdAt).toISOString().split('T')[0]

    if (!daily[day]) daily[day] = 0
    daily[day] += o.total || 0
  })

  const values = Object.values(daily)

  // simple trend calculation
  const avg =
    values.reduce((a, b) => a + b, 0) / (values.length || 1)

  const growthRate =
    values.length > 1
      ? ((values[values.length - 1] - values[0]) / (values[0] || 1)) * 100
      : 0

  const next7DayForecast = Array.from({ length: 7 }).map((_, i) => ({
    day: `Day ${i + 1}`,
    revenue: Math.max(avg + (growthRate * i), 0)
  }))

  return {
    avgDailyRevenue: avg,
    growthRate,
    forecast: next7DayForecast
  }
}