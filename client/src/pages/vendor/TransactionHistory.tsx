import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export default function TransactionHistory() {
  const { t } = useTranslation()

  const vendor =
    JSON.parse(
      localStorage.getItem('vendor') || '{}'
    )

  const [transactions,
    setTransactions] =
      useState<any[]>([])

  useEffect(() => {

    fetchTransactions()

  }, [])

  const fetchTransactions =
    async () => {

      try {

        const res =
          await axios.get(
            `/api/transactions/${vendor._id}`
          )

        setTransactions(
          res.data
        )

      } catch (err) {
        console.log(err)
      }

    }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        Transaction History
      </h1>

      <div className="space-y-4">

        {transactions.map(tx => (

          <div
            key={tx._id}
            className="bg-[#0f172a] p-4 rounded-xl border border-gray-800 flex justify-between"
          >

            <div>

              <p className="font-semibold">
                {tx.type}
              </p>

              <p className="text-gray-400 text-sm">
                {new Date(
                  tx.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

            <div className="text-right">

              <p className="font-bold text-green-400">
                GHS {tx.amount}
              </p>

              <p className="text-xs text-gray-500">
                {tx.status}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

