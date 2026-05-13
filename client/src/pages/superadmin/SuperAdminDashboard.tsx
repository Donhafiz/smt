import { useEffect, useState } from 'react'
import axios from 'axios'

export default function SuperAdminDashboard() {

  const [stats, setStats] = useState<any>({})
  const [tenants, setTenants] = useState<any[]>([])

  useEffect(() => {

    fetchData()

  }, [])

  const fetchData = async () => {

    try {

      const [statsRes, tenantsRes] =
        await Promise.all([

          axios.get(
            '/api/super-admin/stats'
          ),

          axios.get(
            '/api/super-admin/tenants'
          )

        ])

      setStats(statsRes.data)

      setTenants(tenantsRes.data)

    } catch (err) {

      console.log(err)

    }
  }

  return (
    <div className="space-y-6 text-white">

      {/* HEADER */}
      <div>

        <h1 className="text-3xl font-bold">
          SaaS Platform Control Center
        </h1>

        <p className="text-gray-400">
          Enterprise platform intelligence
        </p>

      </div>

      {/* KPI GRID */}
      <div className="grid md:grid-cols-5 gap-4">

        <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

          <p className="text-gray-400">
            Tenants
          </p>

          <h2 className="text-2xl font-bold text-blue-400">
            {stats.tenants || 0}
          </h2>

        </div>

        <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

          <p className="text-gray-400">
            Users
          </p>

          <h2 className="text-2xl font-bold text-green-400">
            {stats.users || 0}
          </h2>

        </div>

        <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

          <p className="text-gray-400">
            Orders
          </p>

          <h2 className="text-2xl font-bold text-purple-400">
            {stats.orders || 0}
          </h2>

        </div>

        <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

          <p className="text-gray-400">
            Revenue
          </p>

          <h2 className="text-2xl font-bold text-yellow-400">
            GHS {stats.revenue || 0}
          </h2>

        </div>

        <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

          <p className="text-gray-400">
            Active Subs
          </p>

          <h2 className="text-2xl font-bold text-pink-400">
            {stats.activeSubscriptions || 0}
          </h2>

        </div>

      </div>

      {/* TENANTS TABLE */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden">

        <div className="p-5 border-b border-gray-800">

          <h2 className="font-bold text-lg">
            Companies
          </h2>

        </div>

        <table className="w-full text-sm">

          <thead className="bg-black/30">

            <tr>

              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Plan
              </th>

              <th className="p-4 text-left">
                Created
              </th>

            </tr>

          </thead>

          <tbody>

            {tenants.map((tenant, index) => (

              <tr
                key={index}
                className="border-t border-gray-800"
              >

                <td className="p-4">
                  {tenant.name}
                </td>

                <td className="p-4">
                  {tenant.email}
                </td>

                <td className="p-4 capitalize">
                  {tenant.plan}
                </td>

                <td className="p-4">
                  {
                    new Date(
                      tenant.createdAt
                    ).toLocaleDateString()
                  }
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}