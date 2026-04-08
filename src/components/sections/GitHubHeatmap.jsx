import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, viewportOptions } from '../../utils/motion'
import { GITHUB_USERNAME } from '../../data'

export default function GitHubHeatmap() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // Generate mock contribution grid (52 weeks x 7 days)
  const generateGrid = () => {
    const grid = []
    for (let w = 0; w < 52; w++) {
      const week = []
      for (let d = 0; d < 7; d++) {
        week.push(Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0)
      }
      grid.push(week)
    }
    return grid
  }

  const [grid] = useState(generateGrid)

  const levelColors = [
    'rgba(20,27,45,1)',
    'rgba(18,184,148,0.2)',
    'rgba(18,184,148,0.4)',
    'rgba(18,184,148,0.7)',
    'rgba(18,184,148,1)',
  ]

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  return (
    <section id="github" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="// open source"
          title="GitHub Activity"
          subtitle="Contributions and open source involvement."
        />

        {/* Stats row */}
        {stats && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {[
              { label: 'Public Repos', value: stats.public_repos },
              { label: 'Followers', value: stats.followers },
              { label: 'Following', value: stats.following },
              { label: 'Gists', value: stats.public_gists },
            ].map(s => (
              <div key={s.label} className="p-5 rounded-xl text-center"
                style={{ background: 'rgba(9,13,24,0.7)', border: '1px solid rgba(18,184,148,0.1)' }}>
                <p className="font-display text-3xl font-bold mb-1" style={{ color: '#2dd6ad' }}>
                  {s.value}
                </p>
                <p className="font-mono text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Heatmap */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="p-6 rounded-2xl overflow-x-auto"
          style={{ background: 'rgba(9,13,24,0.7)', border: '1px solid rgba(18,184,148,0.12)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Github size={16} style={{ color: '#2dd6ad' }} />
              <span className="font-mono text-sm text-slate-400">
                Contribution Activity — {GITHUB_USERNAME}
              </span>
            </div>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-xs hover:opacity-80 transition-opacity"
              style={{ color: '#2dd6ad' }}>
              View Profile <ExternalLink size={11} />
            </a>
          </div>

          {/* Month labels */}
          <div className="flex gap-1 mb-1 pl-6">
            {MONTHS.map(m => (
              <div key={m} className="font-mono text-[9px] text-slate-600"
                style={{ minWidth: '28px' }}>{m}</div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1 mr-1">
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <div key={i} className="font-mono text-[9px] text-slate-600 w-4 h-2.5 flex items-center">
                  {i % 2 === 0 ? d : ''}
                </div>
              ))}
            </div>

            {/* Weeks */}
            {grid.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((level, di) => (
                  <motion.div
                    key={di}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (wi * 7 + di) * 0.001, duration: 0.2 }}
                    title={`${level} contributions`}
                    className="w-2.5 h-2.5 rounded-sm cursor-pointer hover:ring-1 hover:ring-cyber-400 transition-all"
                    style={{
                      backgroundColor: levelColors[level],
                      boxShadow: level >= 3 ? '0 0 4px rgba(18,184,148,0.4)' : 'none',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="font-mono text-[10px] text-slate-600">Less</span>
            {levelColors.map((c, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: c }} />
            ))}
            <span className="font-mono text-[10px] text-slate-600">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}