import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, slideLeft, viewportOptions } from '../../utils/motion'
import { education } from '../../data'

export default function Education() {
  return (
    <section id="education" className="py-28 relative">
      {/* Background accent */}
      <div className="absolute left-0 top-1/3 w-80 h-80 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="// my journey"
          title="Education"
          subtitle="Academic foundations that shaped my engineering mindset."
        />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-500/50 via-cyber-500/20 to-transparent" />

          <div className="space-y-16">
            {education.map((item, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyber-500 border-4 border-void-900 shadow-[0_0_12px_rgba(18,184,148,0.6)] z-10" />

                {/* Spacer for center layout */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <motion.div
                  variants={i % 2 === 0 ? fadeUp : slideLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOptions}
                  custom={i}
                  className="w-full md:w-1/2 ml-12 md:ml-0"
                >
                  <div className="relative p-7 glass rounded-2xl glow-border-hover clip-corner-lg group">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-cyber-500/40 rounded-tl-2xl group-hover:border-cyber-500/70 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-cyber-500/40 rounded-br-2xl group-hover:border-cyber-500/70 transition-colors" />

                    {/* Period badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-cyber-500/25 bg-cyber-500/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-400" />
                      <span className="font-mono text-xs text-cyber-400 tracking-widest">{item.period}</span>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <h3 className="font-display font-bold text-white text-lg leading-tight">
                          {item.degree}
                        </h3>
                        <p className="text-cyber-400 font-mono text-sm mt-1">{item.school}</p>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map(h => (
                        <span
                          key={h}
                          className="px-3 py-1 rounded-lg border border-void-500 bg-void-700/50 font-mono text-xs text-slate-400 flex items-center gap-1.5"
                        >
                          <span className="text-cyber-400">✓</span>
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Currently learning */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          custom={2}
          className="mt-20 p-8 rounded-2xl border border-dashed border-cyber-500/25 text-center"
        >
          <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3">
            Currently Exploring
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['React.js', 'Node.js', 'RTOS', 'Docker', 'MQTT / IoT Protocols', 'Machine Learning Basics'].map(topic => (
              <span
                key={topic}
                className="px-4 py-1.5 rounded-full border border-cyber-500/20 bg-cyber-500/5 font-mono text-xs text-cyber-400/80"
              >
                {topic}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
