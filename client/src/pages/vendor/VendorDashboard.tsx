export default function VendorDashboard() {

  const vendor =
    JSON.parse(
      localStorage.getItem('vendor') || '{}'
    )

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <h1 className="text-3xl font-bold">
        Vendor Dashboard
      </h1>

      <p className="text-gray-400 mt-2">
        Welcome,
        {' '}
        {vendor.businessName}
      </p>

      <div className="grid md:grid-cols-3 gap-5 mt-8">

        <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

          <h2 className="text-gray-400">
            Vendor Status
          </h2>

          <p className="text-2xl font-bold mt-2 text-green-400">
            {vendor.approved
              ? 'Approved'
              : 'Pending'}
          </p>

        </div>

        <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

          <h2 className="text-gray-400">
            Products
          </h2>

          <p className="text-2xl font-bold mt-2">
            0
          </p>

        </div>

        <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

          <h2 className="text-gray-400">
            Revenue
          </h2>

          <p className="text-2xl font-bold mt-2 text-blue-400">
            GHS 0.00
          </p>

        </div>

      </div>

    </div>
  )
}