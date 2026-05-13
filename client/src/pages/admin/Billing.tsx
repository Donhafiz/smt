import axios from 'axios'

const plans = [
  {
    name: 'Starter',
    price: 99
  },
  {
    name: 'Pro',
    price: 299
  },
  {
    name: 'Enterprise',
    price: 999
  }
]

export default function Billing() {

  const subscribe = async (
    plan: string,
    amount: number
  ) => {

    try {

      const res = await axios.post(
        '/api/billing/subscribe',
        {
          email: 'customer@email.com',
          plan: plan.toLowerCase(),
          amount
        }
      )

      window.location.href =
        res.data.data.authorization_url

    } catch (err) {

      console.log(err)

    }
  }

  return (
    <div className="space-y-6 text-white">

      <div>

        <h1 className="text-3xl font-bold">
          SaaS Billing
        </h1>

        <p className="text-gray-400">
          Upgrade your ERP subscription
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        {plans.map((plan, index) => (

          <div
            key={index}
            className="bg-[#0f172a] border border-gray-800 rounded-xl p-6"
          >

            <h2 className="text-xl font-bold">
              {plan.name}
            </h2>

            <p className="text-3xl font-bold mt-3">
              GHS {plan.price}
            </p>

            <p className="text-gray-400 mt-2">
              Monthly subscription
            </p>

            <button
              onClick={() =>
                subscribe(plan.name, plan.price)
              }
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
            >
              Upgrade Plan
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}