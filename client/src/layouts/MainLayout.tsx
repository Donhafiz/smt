import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AIChatWidget from '../components/ai/AIChatWidget'
import LoadingScreen from '../components/LoadingScreen'

export default function MainLayout() {
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-[#020617] text-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <AIChatWidget />
      </div>
    </>
  )
}