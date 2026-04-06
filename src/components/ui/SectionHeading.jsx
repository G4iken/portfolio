import { motion } from 'framer-motion'
import { fadeUp, viewportOptions } from '../../utils/motion'

export default function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="mb-16 text-center">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        custom={0}
        className="font-mono text-cyber-400 text-sm tracking-[0.25em] uppercase mb-3"
      >
        {label}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        custom={1}
        className="font-display text-4xl md:text-5xl font-bold text-white dark:text-white text-slate-900 mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          custom={2}
          className="text-slate-400 max-w-xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        custom={2}
        className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cyber-500 to-transparent"
      />
    </div>
  )
}
