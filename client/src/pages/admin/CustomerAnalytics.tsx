import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

interface Order {
  customerName: string
  total: number
}

export default function CustomerAnalytics() {
  const { t } = useTranslation()

  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {

    try {

      const res = await axios.get('/api/orders')
      setOrders(res.data)

    } catch (err) {
      console.log(err)
    }

  }

  const totalCustomers =
    new Set(
      orders.map(o => o.customerName)
    ).size

  const averageSpend =
    orders.length > 0
      ? orders.reduce((acc, o) => acc + o.total, 0)
          / orders.length
      : 0

  return (
    <div className="space-y-6 text-white">

      <div>

        <h1 className="text-3xl font-bold">
          Customer Intelligence
        </h1>

        <p className="text-gray-400">
          AI customer behavior insights
        </p>

      </div>

      {/* CUSTOMER COUNT */}
      <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

        <h2 className="text-gray-400">
          Total Customers
        </h2>

        <p className="text-4xl font-bold text-blue-400 mt-2">
          {totalCustomers}
        </p>

      </div>

      {/* AVERAGE SPEND */}
      <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

        <h2 className="text-gray-400">
          Average Customer Spend
        </h2>

        <p className="text-4xl font-bold text-green-400 mt-2">
          GHS {averageSpend.toFixed(2)}
        </p>

      </div>

    </div>
  )
}

