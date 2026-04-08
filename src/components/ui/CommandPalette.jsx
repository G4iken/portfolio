import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Mail, Github, FileText, User, Code, GraduationCap, X } from 'lucide-react'

const COMMANDS = [
  { id: 'about', label: 'Go to About', description: 'Learn about Jeremy', icon: <User size={15} />, action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), category: 'Navigate' },
  { id: 'projects', label: 'Go to Projects', description: 'View all projects', icon: <Code size={15} />, action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), category: 'Navigate' },
  { id: 'skills', label: 'Go to Skills', description: 'See skill proficiency', icon: <Code size={15} />, action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }), category: 'Navigate' },
  { id: 'education', label: 'Go to Education', description: 'Academic background', icon: <GraduationCap size={15} />, action: () => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }), category: 'Navigate' },
  { id: 'contact', label: 'Go to Contact', description: 'Get in touch', icon: <Mail size={15} />, action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), category: 'Navigate' },
  { id: 'email', label: 'Send Email', description: 'ebardojeremyelmo@gmail.com', icon: <Mail size={15} />, action: () => window.location.href = 'mailto:ebardojeremyelmo@gmail.com', category: 'Contact' },
  { id: 'github', label: 'Open GitHub', description: 'github.com/G4iken', icon: <Github size={15} />, action: () => window.open('https://github.com/G4iken', '_blank'), category: 'Contact' },
  { id: 'resume', label: 'Download Resume', description: 'Get my CV as PDF', icon: <FileText size={15} />, action: () => { const a = document.createElement('a'); a.href = '/resume.pdf'; a.download = 'Jeremy_Ebardo_Resume.pdf'; a.click() }, category: 'Contact' },
  { id: 'top', label: 'Back to Top', description: 'Scroll to the top', icon: <ArrowRight size={15} />, action: () => window.scrollTo({ top: 0, behavior: 'smooth' }), category: 'Navigate' },
]

const CATEGORY_COLORS = {
  Navigate: 'text-cyber-400',
  Contact: 'text-violet-400',
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(v => !v)
        setQuery('')
        setSelected(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => { setSelected(0) }, [query])

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(i => Math.min(i + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && filtered[selected]) {
      filtered[selected].action()
      setOpen(false)
      setQuery('')
    }
  }

  const execute = (cmd) => {
    cmd.action()
    setOpen(false)
    setQuery('')
  }

  // Group by category
  const grouped = {}
  filtered.forEach(c => {
    if (!grouped[c.category]) grouped[c.category] = []
    grouped[c.category].push(c)
  })

  return (
    <>
      {/* Hint badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="fixed bottom-24 left-4 z-40 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs text-slate-600 cursor-pointer hover:text-slate-400 transition-colors"
        style={{ border: '1px solid rgba(30,40,60,0.8)', background: 'rgba(9,13,24,0.7)' }}
        onClick={() => setOpen(true)}
      >
        <kbd className="px-1.5 py-0.5 rounded text-[10px]"
          style={{ background: 'rgba(20,27,45,1)', border: '1px solid rgba(40,50,70,1)' }}>
          Ctrl
        </kbd>
        <span>+</span>
        <kbd className="px-1.5 py-0.5 rounded text-[10px]"
          style={{ background: 'rgba(20,27,45,1)', border: '1px solid rgba(40,50,70,1)' }}>
          K
        </kbd>
        <span className="ml-1">Command palette</span>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
            style={{ backgroundColor: 'rgba(5,8,16,0.8)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: 'rgba(9,13,24,0.98)',
                border: '1px solid rgba(18,184,148,0.2)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(18,184,148,0.1)',
              }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderBottom: '1px solid rgba(20,27,45,1)' }}>
                <Search size={16} className="text-slate-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-white placeholder-slate-600 font-mono text-sm focus:outline-none"
                />
                <button onClick={() => setOpen(false)}
                  className="text-slate-600 hover:text-slate-400 transition-colors">
                  <X size={15} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <p className="text-center font-mono text-sm text-slate-600 py-8">
                    No commands found
                  </p>
                ) : (
                  Object.entries(grouped).map(([category, cmds]) => (
                    <div key={category} className="mb-2">
                      <p className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1 ${CATEGORY_COLORS[category]}`}>
                        {category}
                      </p>
                      {cmds.map((cmd) => {
                        const globalIndex = filtered.indexOf(cmd)
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => execute(cmd)}
                            onMouseEnter={() => setSelected(globalIndex)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-100"
                            style={{
                              backgroundColor: globalIndex === selected ? 'rgba(18,184,148,0.1)' : 'transparent',
                              border: globalIndex === selected ? '1px solid rgba(18,184,148,0.2)' : '1px solid transparent',
                            }}
                          >
                            <span className={globalIndex === selected ? 'text-cyber-400' : 'text-slate-500'}>
                              {cmd.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className={`font-mono text-sm ${globalIndex === selected ? 'text-white' : 'text-slate-300'}`}>
                                {cmd.label}
                              </p>
                              <p className="font-mono text-xs text-slate-600 truncate">
                                {cmd.description}
                              </p>
                            </div>
                            {globalIndex === selected && (
                              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded text-slate-500"
                                style={{ background: 'rgba(20,27,45,1)', border: '1px solid rgba(40,50,70,1)' }}>
                                ↵
                              </kbd>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 flex items-center gap-4 font-mono text-[10px] text-slate-600"
                style={{ borderTop: '1px solid rgba(20,27,45,1)' }}>
                <span className="flex items-center gap-1"><kbd className="px-1 rounded" style={{ background: 'rgba(20,27,45,1)' }}>↑↓</kbd> Navigate</span>
                <span className="flex items-center gap-1"><kbd className="px-1 rounded" style={{ background: 'rgba(20,27,45,1)' }}>↵</kbd> Select</span>
                <span className="flex items-center gap-1"><kbd className="px-1 rounded" style={{ background: 'rgba(20,27,45,1)' }}>Esc</kbd> Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}