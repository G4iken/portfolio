import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, Mic } from 'lucide-react'

const GITHUB_USERNAME = 'G4iken'

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm Jeremy's AI assistant. Ask me about his skills, projects, or how to hire him! 👋" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])
  const bottomRef = useRef(null)
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data.slice(0, 5).map(r => ({ name: r.name, description: r.description })))
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return alert('Voice not supported in this browser.')
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.start()
    recognition.onresult = (e) => setInput(e.results[0][0].transcript)
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', text: input.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input.trim(), repos })
  })

  const data = await res.json()

  if (!res.ok) {
    setMessages([...updated, { role: 'bot', text: `Error: ${data.error}` }])
    return
  }

  setMessages([...updated, { role: 'bot', text: data.reply }])
} catch {
  setMessages([...updated, { role: 'bot', text: 'Error fetching response. Please try again.' }])
} finally {
  setLoading(false)
}
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-cyber-500 text-void-900 flex items-center justify-center shadow-lg shadow-cyber-500/30 hover:bg-cyber-400 transition-colors"
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} /></motion.span>
            : <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><MessageCircle size={22} /></motion.span>
          }
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl shadow-black/50"
            style={{
              bottom: '5rem',
              right: '0.75rem',
              left: 'auto',
              width: 'min(360px, calc(100vw - 1.5rem))',
              height: 'min(500px, calc(100vh - 8rem))',
              background: 'rgba(9, 13, 24, 0.97)',
              border: '1px solid rgba(18, 184, 148, 0.2)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-void-600/60 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-cyber-500/20 border border-cyber-500/40 flex items-center justify-center">
                <Bot size={15} className="text-cyber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm font-semibold text-white leading-none">Jeremy's Assistant</p>
                <p className="font-mono text-xs text-cyber-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-400 animate-pulse inline-block" />
                  Powered by Nvidia
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-void-600 transition-all flex-shrink-0"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-xl text-sm leading-relaxed max-w-[85%] break-words ${
                    msg.role === 'user'
                      ? 'bg-cyber-500 text-void-900 font-medium rounded-br-sm'
                      : 'bg-void-700/80 text-slate-300 border border-void-600/60 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-void-700/80 border border-void-600/60 px-3 py-2 rounded-xl rounded-bl-sm">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-void-600/60 flex gap-2 flex-shrink-0">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about Jeremy..."
                className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-void-700/60 border border-void-500 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-cyber-500/60 transition-all"
              />
              <button
                onClick={startVoice}
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-void-700 border border-void-500 text-slate-400 hover:text-cyber-400 transition-all"
                title="Voice input"
              >
                <Mic size={15} />
              </button>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-cyber-500 text-void-900 hover:bg-cyber-400 disabled:opacity-40 transition-all"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}