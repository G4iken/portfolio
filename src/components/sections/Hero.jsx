import { motion } from 'framer-motion'
import { ArrowDown, Github, Mail, ExternalLink } from 'lucide-react'
import GlitchText from '../ui/GlitchText'
import { fadeUp, fadeIn } from '../../utils/motion'
import { profile } from '../../data'

const ROLES = ['Software Developer', 'IoT Engineer', 'Embedded Systems', 'Problem Solver']

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-100"
        style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-cyber-500/8 blur-[120px] animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/6 blur-[100px] pointer-events-none" />

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyber-400/30 to-transparent animate-scan" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status badge */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-cyber-500/30 bg-cyber-500/5 text-cyber-400 font-mono text-xs tracking-widest"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-400 animate-pulse" />
          AVAILABLE FOR OPPORTUNITIES
        </motion.div>

        {/* Name */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mb-4"
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold leading-none tracking-tight">
            <span className="text-white dark:text-white text-slate-900">Jeremy Elmo</span>
            <br />
            <span className="relative">
              <span className="text-cyber-400 glow-text">Dimagiba Ebardo</span>
            </span>
          </h1>
        </motion.div>

        {/* Glitch role */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mb-6"
        >
          <GlitchText
            text="[ Computer Engineering Student ]"
            className="text-slate-400 text-base md:text-lg tracking-widest"
          />
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg leading-relaxed mb-10"
        >
          Building real-world systems at the intersection of{' '}
          <span className="text-cyber-400">web</span>,{' '}
          <span className="text-cyber-400">embedded</span>, and{' '}
          <span className="text-cyber-400">IoT</span> technologies.
          Based in{' '}
          <span className="text-slate-300">Bulacan, Philippines</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="group relative px-7 py-3 font-mono text-sm font-medium text-void-900 bg-cyber-400 clip-corner hover:bg-cyber-300 transition-all duration-200 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 font-mono text-sm text-cyber-400 border border-cyber-500/50 clip-corner hover:bg-cyber-500/10 hover:border-cyber-400 transition-all duration-200 flex items-center gap-2"
          >
          <Mail size={14} />
            Contact Me
          </button>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 font-mono text-sm text-slate-400 border border-slate-700 clip-corner hover:text-slate-200 hover:border-slate-500 transition-all duration-200 flex items-center gap-2"
          >
            <Github size={14} />
            GitHub
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="flex flex-wrap justify-center gap-10 text-center"
        >
          {[
            { value: '11+', label: 'Projects Built' },
            { value: '7+', label: 'Languages' },
            { value: '3+', label: 'Years Learning' },
            { value: '1st', label: 'Academic Award' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-bold text-cyber-400 glow-text">{stat.value}</p>
              <p className="font-mono text-xs text-slate-500 tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-cyber-400 transition-colors animate-float"
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <ArrowDown size={16} />
      </motion.button>
    </section>
  )
}
