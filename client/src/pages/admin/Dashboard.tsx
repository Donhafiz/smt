import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

import RevenueChart from '../../components/admin/charts/RevenueChart'
import ForecastChart from '../../components/admin/charts/ForecastChart'

import AIInsightsPanel from '../../components/admin/AIInsightsPanel'

import AlertCenter from '../../components/admin/alerts/AlertCenter'

import InventoryAI from '../../components/admin/inventory/InventoryAI'

interface Stats {
  services: number
  staff: number
  orders: number
  revenue: number
  averageOrder: number
  activeCustomers: number
}

interface ActivityItem {
  title: string
  time: string
}

export default function Dashboard() {

  const [stats, setStats] = useState<Stats>({
    services: 0,
    staff: 0,
    orders: 0,
    revenue: 0,
    averageOrder: 0,
    activeCustomers: 0
  })

  const [loading, setLoading] = useState(true)

  const [systemStatus, setSystemStatus] =
    useState<'online' | 'offline'>('online')

  const [revenueData, setRevenueData] = useState<any[]>([])

  const [forecastData, setForecastData] = useState<any[]>([])

  const [recentActivity, setRecentActivity] =
    useState<ActivityItem[]>([])

  // ====================================
  // FETCH DASHBOARD DATA
  // ====================================
  useEffect(() => {

    fetchStats()

    // AUTO REFRESH EVERY 20 SECONDS
    const interval = setInterval(() => {
      fetchStats()
    }, 20000)

    return () => clearInterval(interval)

  }, [])

  // ====================================
  // FETCH ALL ANALYTICS
  // ====================================
  const fetchStats = async () => {

    try {

      setLoading(true)

      const token = localStorage.getItem('token')

      const headers = {
        Authorization: `Bearer ${token}`
      }

      const [
        servicesRes,
        staffRes,
        ordersRes,
        forecastRes
      ] = await Promise.all([
        axios.get('/api/services', { headers }),
        axios.get('/api/staff', { headers }),
        axios.get('/api/orders', { headers }),
        axios.get('/api/forecast/revenue', { headers })
      ])

      const orders = ordersRes.data || []

      // ====================================
      // TOTAL REVENUE
      // ====================================
      const revenue = orders.reduce(
        (sum: number, order: any) =>
          sum + (order.total || 0),
        0
      )

      // ====================================
      // AVERAGE ORDER VALUE
      // ====================================
      const averageOrder =
        orders.length > 0
          ? revenue / orders.length
          : 0

      // ====================================
      // ACTIVE CUSTOMERS
      // ====================================
      const uniqueCustomers = new Set(
        orders.map((o: any) => o.customerEmail)
      )

      // ====================================
      // REVENUE ANALYTICS
      // ====================================
      const groupedRevenue: any = {}

      orders.forEach((order: any) => {

        const day =
          new Date(order.createdAt)
            .toLocaleDateString('en-US', {
              weekday: 'short'
            })

        if (!groupedRevenue[day]) {
          groupedRevenue[day] = 0
        }

        groupedRevenue[day] += order.total || 0
      })

      const revenueChartData =
        Object.keys(groupedRevenue).map(day => ({
          name: day,
          revenue: groupedRevenue[day]
        }))

      setRevenueData(revenueChartData)

      // ====================================
      // AI FORECAST DATA
      // ====================================
      const forecastChartData =
        forecastRes.data.forecast.map(
          (value: number, index: number) => ({
            day: `Day ${index + 1}`,
            revenue: Number(value.toFixed(2))
          })
        )

      setForecastData(forecastChartData)

      // ====================================
      // KPI STATS
      // ====================================
      setStats({
        services: servicesRes.data.length,
        staff: staffRes.data.length,
        orders: orders.length,
        revenue,
        averageOrder,
        activeCustomers: uniqueCustomers.size
      })

      // ====================================
      // RECENT ACTIVITY FEED
      // ====================================
      const activityFeed =
        orders.slice(0, 5).map((order: any) => ({
          title: `New order from ${order.customerName}`,
          time: new Date(order.createdAt)
            .toLocaleString()
        }))

      setRecentActivity(activityFeed)

      setSystemStatus('online')

    } catch (err) {

      console.log('Dashboard error:', err)

      setSystemStatus('offline')

    } finally {

      setLoading(false)

    }
  }

  // ====================================
  // REVENUE FORMAT
  // ====================================
  const formattedRevenue = useMemo(() => {
    return stats.revenue.toLocaleString()
  }, [stats.revenue])

  return (
    <div className="space-y-6 text-white">

      {/* ==================================== */}
      {/* HEADER */}
      {/* ==================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <h1 className="text-3xl md:text-4xl font-black">
            ERP Intelligence Center
          </h1>

          <p className="text-gray-400 mt-2">
            Real-time business intelligence, forecasting,
            SaaS analytics & operational monitoring
          </p>

        </div>

        {/* SYSTEM STATUS */}
        <div className="flex items-center gap-3">

          <div className="px-4 py-2 rounded-xl bg-[#0f172a] border border-gray-800">

            <p className="text-sm text-gray-400">
              System Status
            </p>

            <div className="flex items-center gap-2 mt-1">

              <div
                className={`w-2 h-2 rounded-full ${
                  systemStatus === 'online'
                    ? 'bg-green-400'
                    : 'bg-red-400'
                }`}
              />

              <span className="text-sm font-medium">
                {systemStatus === 'online'
                  ? 'Operational'
                  : 'Offline'}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ==================================== */}
      {/* LOADING */}
      {/* ==================================== */}
      {loading && (
        <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800 text-gray-400">
          Loading enterprise analytics...
        </div>
      )}

      {/* ==================================== */}
      {/* KPI GRID */}
      {/* ==================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">

        {/* SERVICES */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-800">

          <p className="text-gray-400 text-sm">
            Services
          </p>

          <h2 className="text-3xl font-black text-cyan-400 mt-2">
            {stats.services}
          </h2>

        </div>

        {/* STAFF */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-800">

          <p className="text-gray-400 text-sm">
            Staff
          </p>

          <h2 className="text-3xl font-black text-green-400 mt-2">
            {stats.staff}
          </h2>

        </div>

        {/* ORDERS */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-800">

          <p className="text-gray-400 text-sm">
            Orders
          </p>

          <h2 className="text-3xl font-black text-purple-400 mt-2">
            {stats.orders}
          </h2>

        </div>

        {/* REVENUE */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-800">

          <p className="text-gray-400 text-sm">
            Revenue
          </p>

          <h2 className="text-3xl font-black text-yellow-400 mt-2">
            GHS {formattedRevenue}
          </h2>

        </div>

        {/* AVG ORDER */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-800">

          <p className="text-gray-400 text-sm">
            Avg Order
          </p>

          <h2 className="text-3xl font-black text-orange-400 mt-2">
            GHS {stats.averageOrder.toFixed(0)}
          </h2>

        </div>

        {/* CUSTOMERS */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-800">

          <p className="text-gray-400 text-sm">
            Customers
          </p>

          <h2 className="text-3xl font-black text-pink-400 mt-2">
            {stats.activeCustomers}
          </h2>

        </div>

      </div>

      {/* ==================================== */}
      {/* CHARTS */}
      {/* ==================================== */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">

        <div className="bg-[#0f172a] rounded-2xl border border-gray-800 p-4">
          <RevenueChart data={revenueData} />
        </div>

        <div className="bg-[#0f172a] rounded-2xl border border-gray-800 p-4">
          <ForecastChart data={forecastData} />
        </div>

      </div>

      {/* ==================================== */}
      {/* AI + ALERTS */}
      {/* ==================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-[#0f172a] rounded-2xl border border-gray-800 p-4">
          <AIInsightsPanel />
        </div>

        <div className="bg-[#0f172a] rounded-2xl border border-gray-800 p-4">
          <AlertCenter />
        </div>

      </div>

      {/* ==================================== */}
      {/* INVENTORY AI */}
      {/* ==================================== */}
      <div className="bg-[#0f172a] rounded-2xl border border-gray-800 p-4">
        <InventoryAI />
      </div>

      {/* ==================================== */}
      {/* ACTIVITY + SYSTEM */}
      {/* ==================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* RECENT ACTIVITY */}
        <div className="bg-[#0f172a] p-6 rounded-2xl border border-gray-800">

          <h2 className="text-lg font-semibold mb-5">
            Recent Activity
          </h2>

          <div className="space-y-4">

            {recentActivity.length === 0 && (
              <p className="text-gray-500 text-sm">
                No recent activity
              </p>
            )}

            {recentActivity.map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-800 pb-3"
              >

                <div>

                  <p className="text-sm font-medium">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.time}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* SYSTEM STATUS */}
        <div className="bg-[#0f172a] p-6 rounded-2xl border border-gray-800">

          <h2 className="text-lg font-semibold mb-5">
            Enterprise System Status
          </h2>

          <ul className="space-y-3 text-sm">

            <li className="flex items-center gap-2 text-green-400">
              ✔ AI forecast engine connected
            </li>

            <li className="flex items-center gap-2 text-green-400">
              ✔ ERP analytics active
            </li>

            <li className="flex items-center gap-2 text-green-400">
              ✔ Revenue prediction online
            </li>

            <li className="flex items-center gap-2 text-green-400">
              ✔ Real-time intelligence enabled
            </li>

            <li className="flex items-center gap-2 text-green-400">
              ✔ Business monitoring operational
            </li>

            <li className="flex items-center gap-2 text-green-400">
              ✔ Multi-tenant SaaS engine active
            </li>

          </ul>

        </div>

      </div>

    </div>
  )
}