import { useEffect, useState } from 'react'
import axios from 'axios'

export default function VendorWallet() {

  const vendor =
    JSON.parse(
      localStorage.getItem('vendor') || '{}'
    )

  const [wallet, setWallet] =
    useState<any>(null)

  const [amount, setAmount] =
    useState(0)

  const [bankName, setBankName] =
    useState('')

  const [accountNumber,
    setAccountNumber] =
      useState('')

  const [accountName,
    setAccountName] =
      useState('')

  useEffect(() => {

    fetchWallet()

  }, [])

  const fetchWallet = async () => {

    try {

      const res = await axios.get(
        `/api/wallet/${vendor._id}`
      )

      setWallet(res.data)

    } catch (err) {
      console.log(err)
    }

  }

  const handleWithdraw =
    async () => {

      try {

        await axios.post(
          '/api/wallet/withdraw',

          {

            vendorId: vendor._id,

            amount,

            bankName,

            accountNumber,

            accountName

          }

        )

        alert(
          'Withdrawal request submitted'
        )

        fetchWallet()

      } catch (err) {
        console.log(err)
      }

    }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Vendor Wallet
        </h1>

        <p className="text-gray-400">
          Manage marketplace earnings
        </p>

      </div>

      {/* BALANCE */}
      <div className="bg-[#0f172a] p-6 rounded-xl border border-gray-800">

        <h2 className="text-gray-400">
          Wallet Balance
        </h2>

        <p className="text-4xl font-bold text-green-400 mt-2">
          GHS {wallet?.balance || 0}
        </p>

      </div>

      {/* TOTAL EARNINGS */}
      <div className="bg-[#0f172a] p-6 rounded-xl border border-gray-800">

        <h2 className="text-gray-400">
          Total Earnings
        </h2>

        <p className="text-4xl font-bold text-blue-400 mt-2">
          GHS {wallet?.totalEarnings || 0}
        </p>

      </div>

      {/* WITHDRAWAL FORM */}
      <div className="bg-[#0f172a] p-6 rounded-xl border border-gray-800 space-y-4">

        <h2 className="text-xl font-semibold">
          Request Withdrawal
        </h2>

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-3 rounded bg-black border border-gray-700"
          onChange={e =>
            setAmount(
              Number(e.target.value)
            )
          }
        />

        <input
          placeholder="Bank Name"
          className="w-full p-3 rounded bg-black border border-gray-700"
          onChange={e =>
            setBankName(
              e.target.value
            )
          }
        />

        <input
          placeholder="Account Number"
          className="w-full p-3 rounded bg-black border border-gray-700"
          onChange={e =>
            setAccountNumber(
              e.target.value
            )
          }
        />

        <input
          placeholder="Account Name"
          className="w-full p-3 rounded bg-black border border-gray-700"
          onChange={e =>
            setAccountName(
              e.target.value
            )
          }
        />

        <button
          onClick={handleWithdraw}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
        >
          Withdraw Funds
        </button>

      </div>

    </div>
  )
}