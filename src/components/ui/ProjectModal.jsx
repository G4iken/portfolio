import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-void-900/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl glass rounded-2xl overflow-hidden clip-corner-lg"
        >
          {/* Header bar */}
          <div className={`h-1.5 w-full bg-gradient-to-r ${project.color}`} />

          <div className="p-8">
            {/* Title row */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {project.icon}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
                  <span className="font-mono text-xs text-cyber-400 tracking-widest">{project.category_tag}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-void-600 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Description */}
            <p className="text-slate-400 leading-relaxed mb-6">{project.description}</p>

            {/* Highlights */}
            <div className="mb-6">
              <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3">Key Features</p>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="text-cyber-400 mt-0.5 shrink-0">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="mb-8">
              <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-md border border-void-500 bg-void-700/50 font-mono text-xs text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <a
                href="https://github.com/jeremyebardo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 font-mono text-sm text-slate-300 border border-void-500 rounded-lg hover:border-slate-400 hover:text-white transition-all"
              >
                <Github size={14} />
                View Code
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
