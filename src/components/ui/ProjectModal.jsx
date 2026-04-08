import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github } from 'lucide-react'
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

  if (!project) return null; // Safety check

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(5,8,16,0.85)', backdropFilter: 'blur(8px)' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{ background: 'rgba(9,13,24,0.98)', border: '1px solid rgba(18,184,148,0.15)' }}
        >
          {/* Header gradient bar */}
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
                  <span className="font-mono text-xs tracking-widest" style={{ color: '#2dd6ad' }}>
                    {project.category_tag}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white transition-all"
                style={{ backgroundColor: 'rgba(20,27,45,0.8)' }}
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
                {project.highlights?.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5 shrink-0" style={{ color: '#2dd6ad' }}>▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="mb-8">
              <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech?.map(t => (
                  <span key={t} className="px-3 py-1 rounded-md font-mono text-xs text-slate-400"
                    style={{ border: '1px solid rgba(20,27,45,1)', backgroundColor: 'rgba(14,20,34,0.8)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons - FIXED TAGS BELOW */}
            <div className="flex flex-wrap gap-3">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 font-mono text-sm font-medium rounded-lg transition-all hover:opacity-80"
                  style={{ backgroundColor: '#2dd6ad', color: '#050810' }}
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 font-mono text-sm text-slate-300 rounded-lg hover:text-white transition-all"
                  style={{ border: '1px solid rgba(51,65,85,0.8)' }}
                >
                  <Github size={14} />
                  View Code
                </a>
              )}
              {!project.demo && !project.repo && (
                <span className="font-mono text-xs text-slate-600 flex items-center gap-2">
                  <span>🔒</span> Private / Hardware Project
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}