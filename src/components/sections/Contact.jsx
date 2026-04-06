import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, viewportOptions } from '../../utils/motion'
import { profile } from '../../data'

const INFO_CARDS = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    color: 'text-cyber-400',
    bg: 'bg-cyber-500/10 border-cyber-500/25',
  },
  {
    icon: <Github size={20} />,
    label: 'GitHub',
    value: 'github.com/jeremyebardo',
    href: profile.github,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/25',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Location',
    value: profile.location,
    href: null,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/25',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()  // ← stops page from refreshing
  setStatus('sending')

  try {
    const res = await fetch('https://formspree.io/f/mojpylbb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) throw new Error('Failed')

    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
  } catch (err) {
    setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-28 relative">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-cyber-500/6 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="// let's connect"
          title="Get In Touch"
          subtitle="Have a project, opportunity, or just want to say hi? My inbox is open."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: info */}
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              custom={0}
              className="text-slate-400 leading-relaxed mb-10"
            >
              I'm currently a 4th-year Computer Engineering student actively looking for internships,
              part-time roles, or collaborative projects in web development and IoT. Whether you have
              a question about my work or a potential opportunity — let's talk.
            </motion.p>

            <div className="space-y-4">
              {INFO_CARDS.map((card, i) => (
                <motion.div
                  key={card.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOptions}
                  custom={i + 1}
                >
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 rounded-xl border ${card.bg} hover:scale-[1.02] transition-transform duration-200 group`}
                    >
                      <span className={`${card.color} flex-shrink-0`}>{card.icon}</span>
                      <div>
                        <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">{card.label}</p>
                        <p className={`${card.color} text-sm font-medium mt-0.5 group-hover:underline`}>{card.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className={`flex items-center gap-4 p-4 rounded-xl border ${card.bg}`}>
                      <span className={`${card.color} flex-shrink-0`}>{card.icon}</span>
                      <div>
                        <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">{card.label}</p>
                        <p className={`${card.color} text-sm font-medium mt-0.5`}>{card.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            custom={1}
            className="relative glass rounded-2xl p-8 clip-corner-lg"
          >
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-cyber-500/40 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-cyber-500/40 rounded-br-2xl" />

            {status === 'sent' ? (
              <div className="py-12 flex flex-col items-center gap-4 text-center">
                <CheckCircle size={48} className="text-cyber-400" />
                <h4 className="font-display text-xl font-bold text-white">Message Sent!</h4>
                <p className="text-slate-400 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 font-mono text-xs text-cyber-400 underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-6">
                  Send a Message
                </p>

                {/* Name */}
                <div>
                  <label className="block font-mono text-xs text-slate-500 mb-2 tracking-wider">NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg bg-void-700/60 border border-void-500 text-slate-200 placeholder-slate-600 font-body text-sm focus:outline-none focus:border-cyber-500/60 focus:ring-1 focus:ring-cyber-500/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono text-xs text-slate-500 mb-2 tracking-wider">EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-void-700/60 border border-void-500 text-slate-200 placeholder-slate-600 font-body text-sm focus:outline-none focus:border-cyber-500/60 focus:ring-1 focus:ring-cyber-500/20 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-xs text-slate-500 mb-2 tracking-wider">MESSAGE</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-4 py-3 rounded-lg bg-void-700/60 border border-void-500 text-slate-200 placeholder-slate-600 font-body text-sm focus:outline-none focus:border-cyber-500/60 focus:ring-1 focus:ring-cyber-500/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 font-mono text-sm font-medium text-void-900 bg-cyber-400 clip-corner hover:bg-cyber-300 disabled:opacity-60 transition-all duration-200"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center font-mono text-xs text-slate-600 mt-2">
                  Or email directly at{' '}
                  <a href={`mailto:${profile.email}`} className="text-cyber-400/80 hover:text-cyber-400">
                    {profile.email}
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
