import { motion } from 'framer-motion'
import { Award, ExternalLink, Calendar } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, scaleIn, viewportOptions } from '../../utils/motion'

const CERTIFICATES = [
  {
    title: 'Academic Contest — 1st Place',
    issuer: "Dr. Yanga's Colleges Inc.",
    date: '2022',
    type: 'Academic',
    color: 'from-yellow-500 to-amber-600',
    icon: '🏆',
    link: null,
  },
  {
    title: 'Honor Student',
    issuer: "Dr. Yanga's Colleges Inc.",
    date: '2020–2022',
    type: 'Academic',
    color: 'from-blue-500 to-indigo-600',
    icon: '⭐',
    link: null,
  },
  {
    title: 'Computer Engineering Program',
    issuer: 'Bulacan State University',
    date: '2022–Present',
    type: 'Education',
    color: 'from-cyber-500 to-teal-600',
    icon: '🎓',
    link: null,
  },
  // Add your real certificates here
  {
    title: 'Computer Vision Onramp, NVIDIA Deep Learning Institute, Huawei ICT Academy, Overview of AI, AWS Cloud Practitioner, Cisco CCNA',
    issuer: 'Coursera, Cisco, AWS, Nvidia, Huawei',
    date: '2023-Present',
    type: 'Certification',
    color: 'from-violet-500 to-purple-600',
    icon: '📜',
    link: null,
  },
]

const TYPE_COLORS = {
  Academic: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  Education: 'text-cyber-400 bg-cyber-500/10 border-cyber-500/30',
  Certification: 'text-violet-400 bg-violet-500/10 border-violet-500/30',
}

export default function Certificates() {
  return (
    <section id="certificates" className="py-28 relative">
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: 'rgba(234,179,8,0.04)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="// recognition"
          title="Certificates & Achievements"
          subtitle="Academic honors and professional certifications."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              custom={i}
              whileHover={{ y: -6 }}
              className="relative group rounded-2xl overflow-hidden clip-corner"
              style={{
                background: 'rgba(9,13,24,0.7)',
                border: '1px solid rgba(18,184,148,0.1)',
                backdropFilter: 'blur(16px)',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${cert.color}`} />

              <div className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {cert.icon}
                </div>

                <span className={`inline-block px-2 py-0.5 rounded font-mono text-[10px] tracking-widest border mb-3 ${TYPE_COLORS[cert.type] || TYPE_COLORS.Certification}`}>
                  {cert.type}
                </span>

                <h3 className="font-display font-bold text-white text-sm leading-snug mb-2">
                  {cert.title}
                </h3>

                <p className="font-mono text-xs mb-3" style={{ color: '#2dd6ad' }}>
                  {cert.issuer}
                </p>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 font-mono text-xs text-slate-600">
                    <Calendar size={10} />
                    {cert.date}
                  </span>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer"
                      className="text-slate-600 hover:text-cyber-400 transition-colors">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}