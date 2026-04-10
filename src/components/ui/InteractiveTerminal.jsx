import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X, Minus, Square } from 'lucide-react'

const COMMANDS = {
  help: () => `Available commands:
  about          → Who is Jeremy
  skills         → Technical skills
  projects       → List all projects
  contact        → Contact information
  education      → Academic background
  hire           → Why hire Jeremy
  social         → Social links
  clear          → Clear terminal
  exit           → Close terminal`,

  about: () => `Jeremy Elmo D. Ebardo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Role     : 4th-year Computer Engineering Student
School   : Bulacan State University, Philippines
Focus    : Web Development · IoT · Embedded Systems
Status   : Available for internships & opportunities
Motto    : "Build things that matter."`,

  skills: () => `Technical Skills
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Languages  : C, C++, Java, Python, PHP, JavaScript
Web        : HTML, CSS, Tailwind, React, Node.js
Database   : MySQL, SQLite
Hardware   : ESP32, Arduino, Circuit Design
Tools      : Git, GitHub, VS Code, Vite
Learning   : React Native, Docker, MQTT`,

  projects: () => `Projects (11 total)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[IoT]      Aegis Smart Lock      → ESP32 + Node.js
[Web]      Fleur-c-Print         → PHP + MySQL
[Research] Bioplastic Thesis     → Sustainable materials
[Systems]  SAP-1 Architecture    → 8-bit computer
[Systems]  ATM Banking System    → C + File I/O
[Web]      Blog Platform         → PHP + Tailwind
[IoT]      Fire Alarm Circuit    → Hardware sensors
[Games]    Ping Pong             → Python + Pygame
[Games]    Scribble Jump         → Java + Swing
[Web]      Order System          → PHP + MySQL
[Systems]  Java Numerical Methods→ Algorithms

Type "project <name>" for details`,

  contact: () => `Contact Information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email    : ebardojeremyelmo@gmail.com
GitHub   : github.com/G4iken
Location : Bulacan, Philippines
Status   : Open to opportunities`,

  education: () => `Education
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[2022–Now] BS Computer Engineering
           Bulacan State University

[2020–2022] STEM Strand
           Dr. Yanga's Colleges Inc.
           ★ Honor Student
           ★ Academic Contest — 1st Place`,

  hire: () => `Why Hire Jeremy?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Full-stack capability (frontend to firmware)
✓ Real project experience (not just tutorials)
✓ IoT + Web = rare hybrid skillset
✓ Fast learner with strong fundamentals
✓ Team player with academic excellence
✓ Available immediately for internship/part-time
✓ Based in PH — no relocation needed

→ Email: ebardojeremyelmo@gmail.com`,

  social: () => `Social Links
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GitHub   : https://github.com/G4iken
Email    : ebardojeremyelmo@gmail.com`,

  whoami: () => 'jeremy-ebardo — computer-engineer, developer, builder',
  date: () => new Date().toLocaleString(),
  pwd: () => '/home/jeremy/portfolio',
  ls: () => 'about/  projects/  skills/  education/  contact/',
}

const WELCOME = `Welcome to Jeremy's Portfolio Terminal v1.0.0
Type "help" to see available commands.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`

export default function InteractiveTerminal() {
  const [open, setOpen] = useState(false)
  const [history, setHistory] = useState([{ type: 'system', text: WELCOME }])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [cmdIndex, setCmdIndex] = useState(-1)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  // Ctrl+` to open
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        setOpen(v => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const execute = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    setCmdHistory(prev => [trimmed, ...prev])
    setCmdIndex(-1)

    const newEntries = [{ type: 'input', text: `jeremy@portfolio:~$ ${cmd}` }]

    if (trimmed === 'clear') {
      setHistory([{ type: 'system', text: WELCOME }])
      setInput('')
      return
    }

    if (trimmed === 'exit') {
      setOpen(false)
      setInput('')
      return
    }

    const fn = COMMANDS[trimmed]
    if (fn) {
      newEntries.push({ type: 'output', text: fn() })
    } else {
      newEntries.push({
        type: 'error',
        text: `Command not found: "${trimmed}". Type "help" for available commands.`
      })
    }

    setHistory(prev => [...prev, ...newEntries])
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') execute(input)
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = Math.min(cmdIndex + 1, cmdHistory.length - 1)
      setCmdIndex(newIndex)
      setInput(cmdHistory[newIndex] || '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = Math.max(cmdIndex - 1, -1)
      setCmdIndex(newIndex)
      setInput(newIndex === -1 ? '' : cmdHistory[newIndex])
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const match = Object.keys(COMMANDS).find(c => c.startsWith(input))
      if (match) setInput(match)
    }
  }

  return (
    <>
      {/* Terminal toggle button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-24 right-5 z-40 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl font-mono text-xs transition-all hover:opacity-80"
        style={{
          background: 'rgba(9,13,24,0.9)',
          border: '1px solid rgba(18,184,148,0.2)',
          color: '#2dd6ad',
        }}
        title="Open terminal (Ctrl+`)"
      >
        <Terminal size={14} />
        Terminal
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[150] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              bottom: '5rem',
              right: '1rem',
              width: 'min(560px, calc(100vw - 2rem))',
              height: 'min(420px, calc(100vh - 8rem))',
              background: 'rgba(5,8,16,0.98)',
              border: '1px solid rgba(18,184,148,0.2)',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(18,184,148,0.1)', background: 'rgba(9,13,24,0.8)' }}>
              <div className="flex gap-1.5">
                <button onClick={() => setOpen(false)}
                  className="w-3 h-3 rounded-full transition-opacity hover:opacity-70"
                  style={{ backgroundColor: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#febc2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28c840' }} />
              </div>
              <div className="flex-1 text-center">
                <span className="font-mono text-xs text-slate-500">
                  jeremy@portfolio — terminal
                </span>
              </div>
              <kbd className="font-mono text-[10px] text-slate-600 px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(20,27,45,1)', border: '1px solid rgba(40,50,70,1)' }}>
                Ctrl+`
              </kbd>
            </div>

            {/* Output */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-1"
              style={{ height: 'calc(100% - 90px)' }}
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((entry, i) => (
                <pre
                  key={i}
                  className="text-xs whitespace-pre-wrap break-words leading-relaxed"
                  style={{
                    color: entry.type === 'input' ? '#2dd6ad'
                      : entry.type === 'error' ? '#f87171'
                      : entry.type === 'system' ? '#64748b'
                      : '#cbd5e1',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {entry.text}
                </pre>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3"
              style={{ borderTop: '1px solid rgba(18,184,148,0.1)', background: 'rgba(9,13,24,0.8)' }}>
              <span className="text-xs flex-shrink-0" style={{ color: '#2dd6ad' }}>
                jeremy@portfolio:~$
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                className="flex-1 bg-transparent text-xs focus:outline-none"
                style={{ color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', caretColor: '#2dd6ad' }}
                spellCheck={false}
                autoComplete="off"
              />
              <span className="text-xs animate-pulse" style={{ color: '#2dd6ad' }}>█</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}