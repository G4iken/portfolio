import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, scaleIn, viewportOptions } from '../../utils/motion'

const POSTS = [
  {
    title: 'Building the Aegis Smart Lock: From Circuit to Cloud',
    excerpt: 'How I designed a full-stack IoT smart lock system using ESP32, REST APIs, and a real-time web dashboard — from hardware schematics to deployed software.',
    date: 'Dec 2024',
    readTime: '8 min read',
    tags: ['IoT', 'ESP32', 'Node.js'],
    color: 'from-cyan-500 to-teal-600',
    icon: '🔐',
    draft: false,
  },
  {
    title: 'Why Computer Engineers Should Learn Web Development',
    excerpt: 'Breaking down why understanding the full stack — from registers to React — makes you a dramatically more effective engineer in the modern tech landscape.',
    date: 'Nov 2024',
    readTime: '5 min read',
    tags: ['Career', 'Web Dev', 'Engineering'],
    color: 'from-violet-500 to-purple-600',
    icon: '💡',
    draft: false,
  },
  {
    title: 'ESP32 vs Arduino: Which Should You Choose for IoT Projects?',
    excerpt: 'A practical comparison of the two most popular embedded platforms, with real benchmarks, power consumption data, and project recommendations for beginners.',
    date: 'Oct 2024',
    readTime: '6 min read',
    tags: ['IoT', 'Hardware', 'Tutorial'],
    color: 'from-orange-500 to-amber-600',
    icon: '⚙️',
    draft: false,
  },
  {
    title: 'Getting Your First Tech Internship in the Philippines',
    excerpt: 'Practical advice for CS/CE students in the Philippines on building a portfolio, applying to local and multinational companies, and acing technical interviews.',
    date: 'Coming Soon',
    readTime: '10 min read',
    tags: ['Career', 'Philippines', 'Internship'],
    color: 'from-green-500 to-emerald-600',
    icon: '🇵🇭',
    draft: true,
  },
]

export default function Blog() {
  return (
    <section id="blog" className="py-28 relative">
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: 'rgba(139,92,246,0.04)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="// thoughts & writings"
          title="Tech Blog"
          subtitle="Sharing what I learn about web development, IoT, and navigating a tech career."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POSTS.map((post, i) => (
            <motion.article
              key={i}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              custom={i}
              whileHover={{ y: -6 }}
              className="relative group rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: 'rgba(9,13,24,0.7)',
                border: '1px solid rgba(18,184,148,0.1)',
                backdropFilter: 'blur(16px)',
                opacity: post.draft ? 0.7 : 1,
              }}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${post.color}`} />

              {post.draft && (
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded font-mono text-[10px] text-slate-500"
                  style={{ background: 'rgba(20,27,45,1)', border: '1px solid rgba(40,50,70,1)' }}>
                  DRAFT
                </div>
              )}

              <div className="p-5">
                <div className="text-3xl mb-4">{post.icon}</div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full font-mono text-[10px] text-slate-500"
                      style={{ background: 'rgba(20,27,45,1)', border: '1px solid rgba(40,50,70,1)' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-display font-bold text-white text-base leading-snug mb-3 group-hover:text-cyber-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3"
                  style={{ borderTop: '1px solid rgba(20,27,45,1)' }}>
                  <div className="flex items-center gap-3 font-mono text-[10px] text-slate-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />{post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />{post.readTime}
                    </span>
                  </div>
                  {!post.draft && (
                    <ArrowRight size={13} className="text-slate-600 group-hover:text-cyber-400 group-hover:translate-x-1 transition-all" />
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm text-slate-500"
            style={{ border: '1px dashed rgba(40,50,70,1)', background: 'rgba(9,13,24,0.5)' }}>
            <BookOpen size={14} />
            More articles coming soon — follow on GitHub for updates
          </div>
        </motion.div>
      </div>
    </section>
  )
}