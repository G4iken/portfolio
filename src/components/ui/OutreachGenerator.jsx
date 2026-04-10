import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, X, Copy, Check, Linkedin, ChevronDown } from 'lucide-react'

const TEMPLATES = {
  email_intern: {
    label: 'Internship Email',
    icon: '📧',
    subject: 'Internship Application — Jeremy Elmo D. Ebardo | Computer Engineering Student',
    body: `Dear Hiring Manager,

I hope this message finds you well. I am Jeremy Elmo D. Ebardo, a 4th-year Computer Engineering student at Bulacan State University, Philippines, reaching out to express my interest in an internship opportunity at [Company Name].

I specialize in full-stack web development and IoT systems, having built projects such as the Aegis Smart Lock (ESP32 + Node.js) and a full-featured printing shop website. My technical skills include JavaScript, React, PHP, MySQL, C/C++, and ESP32 embedded systems.

I am eager to contribute to your team while growing my professional skills. I have attached my resume for your review and would welcome the opportunity to discuss how I can add value to [Company Name].

Thank you for your time and consideration.

Best regards,
Jeremy Elmo D. Ebardo
ebardojeremyelmo@gmail.com
github.com/G4iken
portfolio: [your-portfolio-url]`,
  },

  linkedin: {
    label: 'LinkedIn Connection',
    icon: '💼',
    subject: null,
    body: `Hi [Name],

I came across your profile and was impressed by your work at [Company]. I'm a Computer Engineering student from Bulacan State University specializing in web development and IoT systems.

I'd love to connect and learn from your experience in the industry. I'm currently seeking internship opportunities and would greatly value any insights you might share.

Looking forward to connecting!

Best,
Jeremy Ebardo`,
  },

  cold_web: {
    label: 'Web Agency Cold Email',
    icon: '🌐',
    subject: 'Junior Developer Inquiry — Jeremy Ebardo | React + PHP Developer',
    body: `Hi [Name],

I've been following [Agency Name]'s work and I'm impressed by your portfolio, especially [specific project].

I'm Jeremy, a Computer Engineering student from Bulacan State University with hands-on experience in React, PHP, MySQL, and Tailwind CSS. I've built production-level projects including a full-stack printing shop website and a blogging platform.

I'm looking for part-time or project-based opportunities where I can contribute immediately while learning from an experienced team.

Would you be open to a quick 15-minute call to explore if there's a fit?

Portfolio: [your-portfolio-url]
GitHub: github.com/G4iken

Best,
Jeremy Ebardo
ebardojeremyelmo@gmail.com`,
  },

  mnc: {
    label: 'Big Tech / MNC',
    icon: '🏢',
    subject: 'Internship Application — Jeremy Elmo D. Ebardo | CS/CE Student Philippines',
    body: `Dear Recruiting Team,

I am writing to express my strong interest in a software engineering internship at [Company]. I am a 4th-year Computer Engineering student at Bulacan State University with a focus on full-stack development and embedded systems.

Key highlights:
- Built Aegis Smart Lock — a full-stack IoT system (ESP32 + REST API + React dashboard)
- Experience with JavaScript, React, Node.js, Python, C/C++
- Strong fundamentals in data structures, algorithms, and computer architecture
- Academic excellence — 1st place academic contest, honor student

I am particularly drawn to [Company] because of [specific reason — product, mission, tech stack]. I believe my combination of hardware and software experience brings a unique perspective to your team.

I have attached my resume. I would welcome the opportunity to discuss my application further.

Sincerely,
Jeremy Elmo D. Ebardo
ebardojeremyelmo@gmail.com | github.com/G4iken`,
  },
}

export default function OutreachGenerator() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('email_intern')
  const [copied, setCopied] = useState(false)

  const template = TEMPLATES[selected]

  const copy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-40 right-5 z-40 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl font-mono text-xs transition-all hover:opacity-80"
        style={{
          background: 'rgba(9,13,24,0.9)',
          border: '1px solid rgba(99,102,241,0.3)',
          color: '#818cf8',
        }}
        title="Outreach templates"
      >
        <Mail size={13} />
        Outreach
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(5,8,16,0.85)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
              style={{
                background: 'rgba(9,13,24,0.99)',
                border: '1px solid rgba(99,102,241,0.2)',
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-6 py-4 sticky top-0 z-10"
                style={{ borderBottom: '1px solid rgba(99,102,241,0.15)', background: 'rgba(9,13,24,0.99)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
                  <Mail size={16} className="text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-white text-lg">Outreach Templates</h3>
                  <p className="font-mono text-xs text-slate-500">Copy and customize for your job search</p>
                </div>
                <button onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Template selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(TEMPLATES).map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => setSelected(key)}
                      className="p-3 rounded-xl font-mono text-xs text-center transition-all"
                      style={{
                        background: selected === key ? 'rgba(99,102,241,0.15)' : 'rgba(14,20,34,0.8)',
                        border: selected === key ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(30,40,60,0.8)',
                        color: selected === key ? '#818cf8' : '#64748b',
                      }}
                    >
                      <div className="text-xl mb-1">{t.icon}</div>
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Subject line */}
                {template.subject && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-mono text-xs text-slate-500 tracking-widest uppercase">
                        Subject Line
                      </label>
                      <button onClick={() => copy(template.subject)}
                        className="font-mono text-xs flex items-center gap-1 transition-colors"
                        style={{ color: '#818cf8' }}>
                        <Copy size={11} /> Copy
                      </button>
                    </div>
                    <div className="px-4 py-2.5 rounded-lg font-mono text-xs text-slate-300"
                      style={{ background: 'rgba(14,20,34,0.8)', border: '1px solid rgba(30,40,60,0.8)' }}>
                      {template.subject}
                    </div>
                  </div>
                )}

                {/* Body */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-xs text-slate-500 tracking-widest uppercase">
                      Message Body
                    </label>
                    <button
                      onClick={() => copy(template.subject
                        ? `Subject: ${template.subject}\n\n${template.body}`
                        : template.body)}
                      className="font-mono text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
                      style={{
                        background: copied ? 'rgba(18,184,148,0.15)' : 'rgba(99,102,241,0.15)',
                        border: copied ? '1px solid rgba(18,184,148,0.3)' : '1px solid rgba(99,102,241,0.3)',
                        color: copied ? '#2dd6ad' : '#818cf8',
                      }}
                    >
                      {copied ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy All</>}
                    </button>
                  </div>
                  <pre
                    className="px-4 py-3 rounded-xl text-xs text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto"
                    style={{
                      background: 'rgba(14,20,34,0.8)',
                      border: '1px solid rgba(30,40,60,0.8)',
                      fontFamily: 'DM Sans, sans-serif',
                      maxHeight: '320px',
                      overflowY: 'auto',
                    }}
                  >
                    {template.body}
                  </pre>
                </div>

                <div className="p-3 rounded-xl font-mono text-xs"
                  style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)', color: '#fbbf24' }}>
                  💡 Remember to replace [Company Name], [Name], and [specific details] before sending.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}