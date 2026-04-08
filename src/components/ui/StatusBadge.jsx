import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function StatusBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed top-20 right-4 z-40 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl font-mono text-xs"
      style={{
        background: 'rgba(9,13,24,0.9)',
        border: '1px solid rgba(18,184,148,0.2)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Zap size={11} style={{ color: '#2dd6ad' }} />
      <span className="text-slate-400">Currently:</span>
      <span className="font-semibold" style={{ color: '#2dd6ad' }}>
        Building Aegis Smart Lock
      </span>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse ml-1"
        style={{ backgroundColor: '#2dd6ad' }} />
    </motion.div>
  )
}