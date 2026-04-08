import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 600)
          }, 200)
          return 100
        }
        return prev + Math.random() * 18
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#050810' }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `linear-gradient(rgba(18,184,148,0.07) 1px, transparent 1px),
                linear-gradient(90deg, rgba(18,184,148,0.07) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Glow */}
          <div className="absolute w-64 h-64 rounded-full blur-[100px] opacity-20"
            style={{ background: 'radial-gradient(circle, #12b894, transparent)' }} />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-display font-extrabold"
            >
              <span style={{ color: '#2dd6ad' }}>&lt;</span>
              <span className="text-white">JE</span>
              <span style={{ color: '#2dd6ad' }}>/&gt;</span>
            </motion.div>

            {/* Name */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-mono text-xs tracking-[0.3em] text-slate-500 uppercase"
            >
              Jeremy Elmo D. Ebardo
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 h-px bg-void-600 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #0a9378, #2dd6ad)',
                  boxShadow: '0 0 8px rgba(18,184,148,0.6)'
                }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Percentage */}
            <motion.p
              className="font-mono text-xs text-slate-600"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              {Math.min(Math.floor(progress), 100)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}