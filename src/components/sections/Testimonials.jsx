import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, viewportOptions } from '../../utils/motion'

const TESTIMONIALS = [
  {
    name: 'Add a Professor / Mentor',
    role: 'Professor, Bulacan State University',
    avatar: '👨‍🏫',
    text: 'Replace this with a real testimonial from a professor, mentor, classmate, or anyone who has worked with you. Ask your capstone adviser or a professor to write a short recommendation.',
    relation: 'Academic Mentor',
  },
  {
    name: 'Add a Classmate / Teammate',
    role: 'Computer Engineering Student',
    avatar: '👨‍💻',
    text: 'Ask a groupmate or classmate who worked on a project with you to write a short testimonial about your skills, work ethic, and contributions to the team.',
    relation: 'Project Collaborator',
  },
  {
    name: 'Add an Industry Contact',
    role: 'Software Engineer / Recruiter',
    avatar: '💼',
    text: 'If you have done any freelance work, OJT, or internship, ask your supervisor or client to write a short recommendation about your technical skills and professionalism.',
    relation: 'Industry Contact',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = () => {
    setDirection(-1)
    setCurrent(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent(i => (i + 1) % TESTIMONIALS.length)
  }

  const t = TESTIMONIALS[current]

  return (
    <section id="testimonials" className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-64 rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: 'rgba(18,184,148,0.04)' }} />

      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          label="// kind words"
          title="Testimonials"
          subtitle="What professors, mentors, and collaborators say."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="relative p-8 md:p-12 rounded-2xl clip-corner-lg"
          style={{
            background: 'rgba(9,13,24,0.7)',
            border: '1px solid rgba(18,184,148,0.12)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t border-l rounded-tl-2xl"
            style={{ borderColor: 'rgba(18,184,148,0.4)' }} />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r rounded-br-2xl"
            style={{ borderColor: 'rgba(18,184,148,0.4)' }} />

          <Quote size={40} className="mb-6 opacity-20" style={{ color: '#2dd6ad' }} />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-slate-300 text-lg leading-relaxed italic mb-8">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: 'rgba(18,184,148,0.1)', border: '1px solid rgba(18,184,148,0.2)' }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-display font-bold text-white">{t.name}</p>
                  <p className="font-mono text-xs text-slate-500">{t.role}</p>
                </div>
                <span className="ml-auto font-mono text-xs px-3 py-1 rounded-full border"
                  style={{ color: '#2dd6ad', borderColor: 'rgba(18,184,148,0.3)', backgroundColor: 'rgba(18,184,148,0.05)' }}>
                  {t.relation}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6"
            style={{ borderTop: '1px solid rgba(20,27,45,1)' }}>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{ backgroundColor: i === current ? '#2dd6ad' : 'rgba(100,116,139,0.4)',
                    boxShadow: i === current ? '0 0 6px rgba(18,184,148,0.6)' : 'none' }} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all"
                style={{ border: '1px solid rgba(20,27,45,1)' }}>
                <ChevronLeft size={16} />
              </button>
              <button onClick={next}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all"
                style={{ border: '1px solid rgba(20,27,45,1)' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}