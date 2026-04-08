import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, viewportOptions } from '../../utils/motion'

const SKILL_DATA = [
  { category: 'Languages', skills: [
    { name: 'JavaScript', level: 80, color: '#f1e05a' },
    { name: 'Python', level: 75, color: '#3572A5' },
    { name: 'C / C++', level: 78, color: '#f34b7d' },
    { name: 'Java', level: 72, color: '#b07219' },
    { name: 'PHP', level: 70, color: '#4F5D95' },
  ]},
  { category: 'Web Development', skills: [
    { name: 'HTML / CSS', level: 88, color: '#e34c26' },
    { name: 'Tailwind CSS', level: 82, color: '#06b6d4' },
    { name: 'React.js', level: 65, color: '#61dafb' },
    { name: 'MySQL', level: 74, color: '#4479a1' },
    { name: 'Node.js / Express', level: 60, color: '#68a063' },
  ]},
  { category: 'Hardware / IoT', skills: [
    { name: 'ESP32', level: 85, color: '#2dd6ad' },
    { name: 'Embedded Systems', level: 78, color: '#ff6b35' },
    { name: 'Circuit Design', level: 72, color: '#ffd700' },
    { name: 'Arduino', level: 80, color: '#00979d' },
  ]},
]

function SkillBar({ name, level, color, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      custom={index}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-sm text-slate-300 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="font-mono text-xs font-bold" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'rgba(20,27,45,1)' }}>
        <motion.div
          className="h-full rounded-full relative"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-void-900"
            style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative">
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: 'rgba(99,102,241,0.05)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="// what i know"
          title="Skills & Proficiency"
          subtitle="Honest self-assessment of my technical skill levels."
        />

        <div className="grid md:grid-cols-3 gap-10">
          {SKILL_DATA.map((group, gi) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              custom={gi}
              className="p-6 rounded-2xl clip-corner-lg"
              style={{
                background: 'rgba(9,13,24,0.7)',
                border: '1px solid rgba(18,184,148,0.12)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <p className="font-mono text-xs tracking-widest uppercase mb-6"
                style={{ color: '#2dd6ad' }}>
                {group.category}
              </p>
              <div className="space-y-5">
                {group.skills.map((skill, si) => (
                  <SkillBar key={skill.name} {...skill} index={si} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}