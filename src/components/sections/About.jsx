import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, scaleIn, viewportOptions } from '../../utils/motion'
import { skills, profile } from '../../data'

const SKILL_COLORS = {
  Programming: 'border-cyber-500/40 text-cyber-400 bg-cyber-500/5 hover:bg-cyber-500/15 hover:border-cyber-400',
  'Web Development': 'border-violet-500/40 text-violet-400 bg-violet-500/5 hover:bg-violet-500/15 hover:border-violet-400',
  'Hardware / IoT': 'border-orange-500/40 text-orange-400 bg-orange-500/5 hover:bg-orange-500/15 hover:border-orange-400',
  'Soft Skills': 'border-blue-500/40 text-blue-400 bg-blue-500/5 hover:bg-blue-500/15 hover:border-blue-400',
}

export default function About() {
  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="// who am i"
          title="About Me"
          subtitle="A curious engineer who builds things."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              custom={0}
              className="relative p-8 glass rounded-2xl glow-border-hover clip-corner-lg"
            >
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-cyber-500/50 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-cyber-500/50 rounded-br-2xl" />

              <p className="text-slate-400 leading-relaxed mb-6">
                {profile.summary}
              </p>

              <div className="space-y-3">
                {[
                  { label: 'Location', value: profile.location, icon: '📍' },
                  { label: 'Email', value: profile.email, icon: '📧' },
                  { label: 'Focus', value: 'Web · Embedded · IoT', icon: '🎯' },
                  { label: 'Status', value: 'Seeking Opportunities', icon: '🟢' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 font-mono text-sm">
                    <span>{item.icon}</span>
                    <span className="text-slate-500 w-20 shrink-0">{item.label}</span>
                    <span className="text-slate-300">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Philosophy card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              custom={1}
              className="mt-6 p-6 rounded-xl border border-void-600 bg-void-800/50"
            >
              <p className="font-mono text-xs text-cyber-400 mb-2 tracking-widest">// PHILOSOPHY</p>
              <p className="text-slate-400 text-sm italic leading-relaxed">
                "I believe the best engineers don't just write code — they{' '}
                <span className="text-slate-200">understand the system</span> from hardware to user interface,
                and design solutions that are both elegant and practical."
              </p>
            </motion.div>
          </div>

          {/* Skills */}
          <div className="space-y-8">
            {Object.entries(skills).map(([category, items], ci) => (
              <motion.div
                key={category}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                custom={ci}
              >
                <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, si) => (
                    <motion.span
                      key={skill}
                      variants={scaleIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportOptions}
                      custom={si * 0.05}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`px-3 py-1.5 rounded-lg border font-mono text-xs cursor-default transition-all duration-200 ${
                        SKILL_COLORS[category]
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
