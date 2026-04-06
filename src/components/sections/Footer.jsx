import { motion } from 'framer-motion'
import { Github, Mail, ArrowUp } from 'lucide-react'
import { fadeUp, viewportOptions } from '../../utils/motion'
import { profile } from '../../data'

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative border-t border-void-600/60 overflow-hidden">
      {/* Glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyber-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            custom={0}
          >
            <button
              onClick={scrollTop}
              className="font-display text-2xl font-bold text-white mb-3 hover:text-cyber-400 transition-colors"
            >
              <span className="text-cyber-400">&lt;</span>JE<span className="text-cyber-400">/&gt;</span>
            </button>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Computer Engineering Student building at the intersection of software and hardware.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            custom={1}
          >
            <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-4">Navigation</p>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-slate-400 hover:text-cyber-400 text-sm transition-colors font-mono"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            custom={2}
          >
            <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-4">Connect</p>
            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-slate-400 hover:text-cyber-400 transition-colors group"
              >
                <Mail size={15} className="group-hover:text-cyber-400" />
                <span className="text-sm font-mono">{profile.email}</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-400 hover:text-cyber-400 transition-colors group"
              >
                <Github size={15} className="group-hover:text-cyber-400" />
                <span className="text-sm font-mono">github.com/jeremyebardo</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-void-600/40">
          <p className="font-mono text-xs text-slate-600">
            © {new Date().getFullYear()} Jeremy Elmo D. Ebardo · Built with React + Vite + Tailwind
          </p>

          <button
            onClick={scrollTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-void-600 text-slate-500 hover:text-cyber-400 hover:border-cyber-500/40 transition-all font-mono text-xs group"
          >
            Back to top
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
