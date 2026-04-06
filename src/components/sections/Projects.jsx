import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Star, GitFork, ExternalLink, Loader2 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ProjectModal from '../ui/ProjectModal'
import { fadeUp, scaleIn, viewportOptions } from '../../utils/motion'
import { projects, FILTER_TAGS, GITHUB_USERNAME } from '../../data'
import { useGitHub } from '../../hooks/useGitHub'

function ProjectCard({ project, onClick, index }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      custom={index}
      whileHover={{ y: -6 }}
      onClick={() => onClick(project)}
      className="relative group cursor-pointer glass rounded-xl overflow-hidden glow-border-hover transition-all duration-300"
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.color}`} />

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 px-2 py-0.5 rounded font-mono text-[10px] text-cyber-400 border border-cyber-500/40 bg-cyber-500/10">
          FEATURED
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {project.icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-bold text-white text-lg leading-tight mb-1 truncate">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-slate-500 tracking-widest">
              {project.category_tag}
            </span>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map(t => (
            <span
              key={t}
              className="px-2 py-0.5 rounded font-mono text-[10px] text-slate-500 bg-void-700/80 border border-void-600"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 rounded font-mono text-[10px] text-slate-600">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-void-600/60">
          <span className="font-mono text-xs text-slate-600 group-hover:text-cyber-400 transition-colors duration-200">
            View Details →
          </span>
          <ExternalLink size={13} className="text-slate-600 group-hover:text-cyber-400 transition-colors duration-200" />
        </div>
      </div>
    </motion.div>
  )
}

function GitHubRepoCard({ repo, index }) {
  const langColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    C: '#555555',
    'C++': '#f34b7d',
    PHP: '#4F5D95',
    HTML: '#e34c26',
    CSS: '#563d7c',
  }

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      custom={index}
      whileHover={{ y: -4 }}
      className="group block glass rounded-xl p-5 glow-border-hover transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Github size={15} className="text-slate-500 group-hover:text-cyber-400 transition-colors" />
          <h4 className="font-mono text-sm font-medium text-slate-300 group-hover:text-cyber-400 transition-colors truncate max-w-[180px]">
            {repo.name}
          </h4>
        </div>
        <ExternalLink size={13} className="text-slate-600 group-hover:text-cyber-400 transition-colors flex-shrink-0" />
      </div>

      <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
        {repo.description || 'No description provided.'}
      </p>

      <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: langColors[repo.language] || '#8b949e' }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star size={11} />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={11} />
          {repo.forks_count}
        </span>
      </div>
    </motion.a>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const { repos, loading, error } = useGitHub()

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.category_tag === filter)

  return (
    <section id="projects" className="py-28 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="// what i've built"
          title="Projects"
          subtitle="A collection of real-world systems spanning web, IoT, embedded systems, and games."
        />

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {FILTER_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-1.5 rounded-lg font-mono text-xs tracking-wide transition-all duration-200 border ${
                filter === tag
                  ? 'bg-cyber-500/20 border-cyber-500/60 text-cyber-400'
                  : 'border-void-600 text-slate-500 hover:border-slate-500 hover:text-slate-300 bg-transparent'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Project cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelected}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub repos */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="flex items-center gap-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <Github size={20} className="text-cyber-400" />
              <h3 className="font-display text-2xl font-bold text-white">GitHub Repositories</h3>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-void-600 to-transparent" />
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-cyber-400 hover:text-cyber-300 flex items-center gap-1 transition-colors"
            >
              View All <ExternalLink size={11} />
            </a>
          </motion.div>

          {loading && (
            <div className="flex items-center justify-center py-16 gap-3 text-slate-500">
              <Loader2 size={20} className="animate-spin text-cyber-400" />
              <span className="font-mono text-sm">Fetching repositories...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="font-mono text-sm text-slate-500">
                Could not load GitHub repos.{' '}
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyber-400 underline"
                >
                  View profile directly →
                </a>
              </p>
            </div>
          )}

          {!loading && !error && repos.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo, i) => (
                <GitHubRepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          )}

          {!loading && !error && repos.length === 0 && (
            <div className="text-center py-12">
              <p className="font-mono text-sm text-slate-500">No public repositories found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Project modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
