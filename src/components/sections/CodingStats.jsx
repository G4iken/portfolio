import { motion } from 'framer-motion'
import { Code2, ExternalLink, Trophy } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, scaleIn, viewportOptions } from '../../utils/motion'

const STATS = [
  { label: 'Problems Solved', value: '50+', icon: '✅', color: '#2dd6ad' },
  { label: 'Contest Rating', value: 'Beginner', icon: '📊', color: '#818cf8' },
  { label: 'Languages Used', value: '4', icon: '💻', color: '#fbbf24' },
  { label: 'Streak', value: 'Building', icon: '🔥', color: '#f87171' },
]

const RECENT_PROBLEMS = [
  { name: 'Two Sum', difficulty: 'Easy', topic: 'Array / HashMap', status: '✓' },
  { name: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stack', status: '✓' },
  { name: 'Reverse Linked List', difficulty: 'Easy', topic: 'Linked List', status: '✓' },
  { name: 'Binary Search', difficulty: 'Easy', topic: 'Binary Search', status: '✓' },
  { name: 'Maximum Subarray', difficulty: 'Medium', topic: 'Dynamic Programming', status: '✓' },
]

const DIFF_COLORS = {
  Easy: { color: '#2dd6ad', bg: 'rgba(18,184,148,0.1)' },
  Medium: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
  Hard: { color: '#f87171', bg: 'rgba(248,113,113,0.1)' },
}

export default function CodingStats() {
  return (
    <section id="coding" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="// problem solving"
          title="Coding Challenges"
          subtitle="Sharpening algorithmic thinking and data structures."
        />

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              custom={i}
              className="p-5 rounded-xl text-center"
              style={{ background: 'rgba(9,13,24,0.7)', border: '1px solid rgba(18,184,148,0.1)' }}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="font-display text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</p>
              <p className="font-mono text-[10px] text-slate-500">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent problems */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="p-6 rounded-2xl"
            style={{ background: 'rgba(9,13,24,0.7)', border: '1px solid rgba(18,184,148,0.1)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="font-mono text-xs tracking-widest uppercase" style={{ color: '#2dd6ad' }}>
                Recent Problems
              </p>
              <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors">
                LeetCode <ExternalLink size={11} />
              </a>
            </div>
            <div className="space-y-3">
              {RECENT_PROBLEMS.map((p, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(14,20,34,0.6)', border: '1px solid rgba(20,27,45,1)' }}>
                  <span className="text-sm" style={{ color: '#2dd6ad' }}>{p.status}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-slate-300 truncate">{p.name}</p>
                    <p className="font-mono text-[10px] text-slate-600">{p.topic}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full font-mono text-[10px]"
                    style={{
                      color: DIFF_COLORS[p.difficulty].color,
                      background: DIFF_COLORS[p.difficulty].bg,
                    }}>
                    {p.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Goal tracker */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            custom={1}
            className="p-6 rounded-2xl"
            style={{ background: 'rgba(9,13,24,0.7)', border: '1px solid rgba(18,184,148,0.1)' }}
          >
            <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: '#2dd6ad' }}>
              2025 Goals
            </p>
            <div className="space-y-4">
              {[
                { goal: 'Solve 100 LeetCode problems', progress: 50, target: 100 },
                { goal: 'Complete DSA course', progress: 35, target: 100 },
                { goal: 'Build 3 more projects', progress: 66, target: 100 },
                { goal: 'Land internship', progress: 80, target: 100 },
                { goal: 'Get AWS/Google cert', progress: 10, target: 100 },
              ].map((g, i) => (
                <div key={i}>
                  <div className="flex justify-between font-mono text-xs mb-1.5">
                    <span className="text-slate-400">{g.goal}</span>
                    <span style={{ color: '#2dd6ad' }}>{g.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(20,27,45,1)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${g.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: 'linear-gradient(90deg, #12b894, #2dd6ad)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}