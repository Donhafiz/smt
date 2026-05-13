import { Link } from 'react-router-dom'

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-[#0f172a] min-h-screen p-4">

      <h1 className="text-xl font-bold mb-6">
        SMT Admin
      </h1>

      <nav className="space-y-3">

        <Link to="/admin" className="block hover:text-blue-400">
          Dashboard
        </Link>

        <Link to="/admin/staff" className="block hover:text-blue-400">
          Staff
        </Link>

        <Link to="/admin/services" className="block hover:text-blue-400">
          Services
        </Link>

        <Link to="/login" className="block text-red-400">
          Logout
        </Link>
      </nav>

    </div>
  )
}