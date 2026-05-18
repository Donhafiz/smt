import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = ['Initializing platform…', 'Loading services…', 'Almost ready…']

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Advance progress smoothly
    const progInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progInterval); return 100 }
        return p + 1.5
      })
    }, 30)

    // Cycle through steps
    const stepInterval = setInterval(() => {
      setStepIndex(i => (i + 1) % steps.length)
    }, 900)

    // Dismiss after 2.5 s
    const hideTimer = setTimeout(() => setVisible(false), 2500)

    return () => {
      clearInterval(progInterval)
      clearInterval(stepInterval)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#020617' }}>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800;12..96,900&family=DM+Sans:wght@400;500&display=swap');
            .ld-display { font-family: 'Bricolage Grotesque', sans-serif; }
            .ld-body { font-family: 'DM Sans', sans-serif; }
            @keyframes spin-slow { to { transform: rotate(360deg); } }
            @keyframes spin-rev  { to { transform: rotate(-360deg); } }
            .spin-slow { animation: spin-slow 3s linear infinite; }
            .spin-rev  { animation: spin-rev 2.2s linear infinite; }
            @keyframes particle-rise {
              0%   { transform: translateY(0) scale(1); opacity: 0.8; }
              100% { transform: translateY(-120px) scale(0); opacity: 0; }
            }
          `}</style>

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          </div>

          {/* Rotating rings */}
          <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
            {/* Outer ring */}
            <div className="spin-slow absolute inset-0 rounded-full"
              style={{ border: '1.5px solid transparent', borderTopColor: '#06b6d4', borderRightColor: 'rgba(6,182,212,0.3)' }} />
            {/* Middle ring */}
            <div className="spin-rev absolute inset-3 rounded-full"
              style={{ border: '1.5px solid transparent', borderBottomColor: '#a78bfa', borderLeftColor: 'rgba(167,139,250,0.3)' }} />
            {/* Inner ring */}
            <div className="spin-slow absolute inset-7 rounded-full"
              style={{ border: '1px solid transparent', borderTopColor: 'rgba(6,182,212,0.5)' }} />

            {/* Center logo */}
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)', boxShadow: '0 0 40px rgba(6,182,212,0.4)' }}>
              <span className="ld-display text-lg font-black text-white tracking-tight">SMT</span>
            </motion.div>

            {/* Orbiting dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full bg-cyan-400"
                style={{ boxShadow: '0 0 8px rgba(6,182,212,0.8)' }} />
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="ld-display font-black text-white text-xl tracking-tight mb-1">
            STAR <span style={{ color: '#06b6d4' }}>MEDIA</span> TECH
          </motion.p>

          {/* Animated step label */}
          <div className="h-6 overflow-hidden mb-6">
            <AnimatePresence mode="wait">
              <motion.p key={stepIndex}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="ld-body text-xs text-slate-500 text-center">
                {steps[stepIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ ease: 'easeOut' }}
              style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6)' }}>
              <div className="h-full w-full" style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6)' }} />
            </motion.div>
          </div>

          <p className="ld-body text-[10px] text-slate-700 mt-3 tracking-widest uppercase">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}