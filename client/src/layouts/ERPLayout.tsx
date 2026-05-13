import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function ERPLayout() {

  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 bg-blue-600 px-3 py-2 rounded md:hidden"
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:relative z-40
          h-full w-64 bg-[#0f172a]
          border-r border-gray-800
          p-5 transition-all duration-300

          ${open ? 'left-0' : '-left-72'}
          md:left-0
        `}
      >

        <h1 className="text-2xl font-bold mb-8">
          SMT ERP
        </h1>

        <div className="space-y-4">

          <NavLink to="/admin">
            Dashboard
          </NavLink>

          <NavLink to="/admin/analytics">
            Analytics
          </NavLink>

          <NavLink to="/admin/orders">
            Orders
          </NavLink>

          <NavLink to="/admin/products">
            Products
          </NavLink>

          <NavLink to="/admin/staff">
            Staff
          </NavLink>

          <NavLink to="/admin/inventory">
            Inventory
          </NavLink>

          <NavLink to="/admin/revenue">
            Revenue AI
          </NavLink>

          <NavLink to="/admin/sales-forecast">
            Sales Forecast
          </NavLink>

          <NavLink to="/admin/recommendations">
            AI Recommendations
          </NavLink>

          <NavLink to="/admin/customer-analytics">
            Customer Analytics
          </NavLink>

        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 md:ml-64 p-4 md:p-6">

        <Outlet />

      </div>

    </div>
  )
}