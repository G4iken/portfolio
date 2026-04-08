import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, Mic, Trash2, Sparkles } from 'lucide-react'

const GITHUB_USERNAME = 'G4iken'

const SUGGESTED_QUESTIONS = [
  'What are Jeremy\'s top skills?',
  'Tell me about the Aegis Smart Lock',
  'Is Jeremy available for hire?',
  'What tech stack does he use?',
]

// Simple markdown-like renderer
function MessageText({ text }) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|\n)/g)
  return (
    <span className="leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
        if (part.startsWith('`') && part.endsWith('`'))
          return <code key={i} className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{ backgroundColor: 'rgba(18,184,148,0.15)', color: '#2dd6ad' }}>{part.slice(1, -1)}</code>
        if (part === '\n') return <br key={i} />
        return part
      })}
    </span>
  )
}

// Typing animation dots
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: '#2dd6ad' }}
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I'm **Jeremy's AI assistant** 👋\n\nI can tell you about his **skills**, **projects**, **experience**, or help you figure out if he's the right fit for your team.\n\nWhat would you like to know?",
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data))
          setRepos(data.slice(0, 8).map(r => ({ name: r.name, description: r.description, stars: r.stargazers_count, lang: r.language })))
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }, [messages, isTyping])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return alert('Voice not supported in this browser.')
    const r = new SR()
    r.lang = 'en-US'
    r.start()
    r.onresult = (e) => setInput(e.results[0][0].transcript)
  }

  const clearChat = () => {
    setMessages([{
      role: 'bot',
      text: "Chat cleared! How can I help you learn more about Jeremy? 😊",
      timestamp: new Date(),
    }])
    setShowSuggestions(true)
  }

  const sendMessage = async (text) => {
    const msg = (text || input).trim()
    if (!msg || loading) return

    setShowSuggestions(false)
    const userMsg = { role: 'user', text: msg, timestamp: new Date() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)
    setIsTyping(true)

    // Build conversation history for context
    const history = updated.slice(-6).map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.text,
    }))

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, repos, history })
      })

      const data = await res.json()

      // Simulate streaming by revealing text gradually
      setIsTyping(false)
      const fullReply = data.reply || 'Sorry, I could not get a response.'

      // Add empty bot message first
      setMessages(prev => [...prev, { role: 'bot', text: '', timestamp: new Date(), streaming: true }])

      // Stream characters
      let displayed = ''
      const chars = fullReply.split('')
      for (let i = 0; i < chars.length; i++) {
        await new Promise(r => setTimeout(r, 12))
        displayed += chars[i]
        setMessages(prev => {
          const copy = [...prev]
          copy[copy.length - 1] = { ...copy[copy.length - 1], text: displayed }
          return copy
        })
      }

      // Mark streaming done
      setMessages(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = { ...copy[copy.length - 1], streaming: false }
        return copy
      })

    } catch {
      setIsTyping(false)
      setMessages([...updated, {
        role: 'bot',
        text: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date()
      }])
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
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors"
        style={{ backgroundColor: '#2dd6ad', boxShadow: '0 0 20px rgba(18,184,148,0.4)' }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={22} style={{ color: '#050810' }} />
              </motion.span>
            : <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageCircle size={22} style={{ color: '#050810' }} />
              </motion.span>
          }
        </AnimatePresence>

        {/* Unread dot */}
        {!open && (
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full border-2 animate-pulse"
            style={{ backgroundColor: '#2dd6ad', borderColor: '#050810' }} />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl"
            style={{
              bottom: '5rem',
              right: '0.75rem',
              left: 'auto',
              width: 'min(380px, calc(100vw - 1.5rem))',
              height: 'min(560px, calc(100vh - 8rem))',
              background: 'rgba(7,10,18,0.98)',
              border: '1px solid rgba(18,184,148,0.2)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(18,184,148,0.05)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(18,184,148,0.1)', background: 'rgba(9,13,24,0.8)' }}>
              <div className="relative">
                <div className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(18,184,148,0.3), rgba(18,184,148,0.1))', border: '1px solid rgba(18,184,148,0.4)' }}>
                  <Sparkles size={16} style={{ color: '#2dd6ad' }} />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 animate-pulse"
                  style={{ backgroundColor: '#2dd6ad', borderColor: '#070a12' }} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm font-semibold text-white leading-none">
                  Jeremy's AI Assistant
                </p>
                <p className="font-mono text-xs mt-0.5 flex items-center gap-1.5"
                  style={{ color: '#2dd6ad' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block"
                    style={{ backgroundColor: '#2dd6ad' }} />
                  {loading ? 'Thinking...' : 'Online · Powered by AI'}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button onClick={clearChat} title="Clear chat"
                  className="w-7 h-7 flex items-center justify-center rounded-lg transition-all"
                  style={{ color: '#475569' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                  onMouseLeave={e => e.currentTarget.style.color = '#475569'}>
                  <Trash2 size={13} />
                </button>
                <button onClick={() => setOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg transition-all"
                  style={{ color: '#475569' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                  onMouseLeave={e => e.currentTarget.style.color = '#475569'}>
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(18,184,148,0.2) transparent' }}>

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Bot avatar */}
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-1"
                      style={{ background: 'rgba(18,184,148,0.15)', border: '1px solid rgba(18,184,148,0.3)' }}>
                      <Bot size={13} style={{ color: '#2dd6ad' }} />
                    </div>
                  )}

                  <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm break-words ${
                        msg.role === 'user'
                          ? 'rounded-tr-sm'
                          : 'rounded-tl-sm'
                      }`}
                      style={msg.role === 'user'
                        ? { background: 'linear-gradient(135deg, #12b894, #2dd6ad)', color: '#050810' }
                        : { background: 'rgba(14,20,34,0.9)', color: '#cbd5e1', border: '1px solid rgba(30,40,60,0.8)' }
                      }
                    >
                      <MessageText text={msg.text} />
                      {msg.streaming && (
                        <span className="inline-block w-0.5 h-3.5 ml-0.5 animate-pulse align-middle rounded-full"
                          style={{ backgroundColor: '#2dd6ad' }} />
                      )}
                    </div>

                    {/* Timestamp */}
                    <span className="font-mono text-[10px] px-1"
                      style={{ color: '#334155' }}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 items-start"
                >
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(18,184,148,0.15)', border: '1px solid rgba(18,184,148,0.3)' }}>
                    <Bot size={13} style={{ color: '#2dd6ad' }} />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm"
                    style={{ background: 'rgba(14,20,34,0.9)', border: '1px solid rgba(30,40,60,0.8)' }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              {/* Suggested questions */}
              {showSuggestions && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2 mt-2"
                >
                  <p className="font-mono text-[10px] text-slate-600 tracking-widest uppercase">
                    Suggested
                  </p>
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      onClick={() => sendMessage(q)}
                      className="w-full text-left px-3 py-2 rounded-xl font-mono text-xs transition-all duration-200"
                      style={{
                        background: 'rgba(14,20,34,0.6)',
                        border: '1px solid rgba(18,184,148,0.15)',
                        color: '#94a3b8',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(18,184,148,0.4)'
                        e.currentTarget.style.color = '#2dd6ad'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(18,184,148,0.15)'
                        e.currentTarget.style.color = '#94a3b8'
                      }}
                    >
                      {q}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(18,184,148,0.1)', background: 'rgba(9,13,24,0.8)' }}>
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={e => {
                      setInput(e.target.value)
                      e.target.style.height = 'auto'
                      e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px'
                    }}
                    onKeyDown={handleKey}
                    placeholder="Ask me anything about Jeremy..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm resize-none focus:outline-none transition-all"
                    style={{
                      background: 'rgba(14,20,34,0.8)',
                      border: '1px solid rgba(30,40,60,0.8)',
                      color: '#e2e8f0',
                      minHeight: '42px',
                      maxHeight: '80px',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(18,184,148,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(30,40,60,0.8)'}
                  />
                </div>

                <button onClick={startVoice}
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl transition-all"
                  style={{ background: 'rgba(14,20,34,0.8)', border: '1px solid rgba(30,40,60,0.8)', color: '#475569' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#2dd6ad'; e.currentTarget.style.borderColor = 'rgba(18,184,148,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = 'rgba(30,40,60,0.8)' }}
                  title="Voice input">
                  <Mic size={15} />
                </button>

                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl transition-all"
                  style={{
                    background: input.trim() && !loading ? 'linear-gradient(135deg, #12b894, #2dd6ad)' : 'rgba(14,20,34,0.8)',
                    color: input.trim() && !loading ? '#050810' : '#334155',
                    border: '1px solid transparent',
                  }}
                >
                  <Send size={15} />
                </button>
              </div>

              <p className="text-center font-mono text-[10px] mt-2" style={{ color: '#1e293b' }}>
                AI can make mistakes · Powered by OpenRouter
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}