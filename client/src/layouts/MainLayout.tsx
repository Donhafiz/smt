import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}