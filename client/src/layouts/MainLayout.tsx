import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AIChatWidget from '../components/ai/AIChatWidget'
import LoadingScreen from '../components/LoadingScreen'
import AnimatedBackground from '../components/AnimatedBackground'

export default function MainLayout() {
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1e] to-[#020617] text-white flex flex-col relative">
        <AnimatedBackground />
        <Navbar />
        <main className="flex-1 relative z-10">
          <Outlet />
        </main>
        <Footer />
        <AIChatWidget />
      </div>
    </>
  )
}