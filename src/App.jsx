import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import GitHubHeatmap from './components/sections/GitHubHeatmap'
import CodingStats from './components/sections/CodingStats'
import Certificates from './components/sections/Certificates'
import Blog from './components/sections/Blog'
import Education from './components/sections/Education'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import ChatBot from './components/ui/ChatBot'
import LoadingScreen from './components/ui/LoadingScreen'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import ParticleBackground from './components/ui/ParticleBackground'
import StatusBadge from './components/ui/StatusBadge'
import CommandPalette from './components/ui/CommandPalette'
import OpenToWork from './components/ui/OpenToWork'
import InteractiveTerminal from './components/ui/InteractiveTerminal'
import ResumeAnalyzer from './components/ui/ResumeAnalyzer'
import OutreachGenerator from './components/ui/OutreachGenerator'

export default function App() {
  const { isDark, toggle } = useTheme()
  const [loading, setLoading] = useState(true)

  return (
    <>
      <CustomCursor />
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <div className="relative">
          <ScrollProgress />
          <ParticleBackground />
          <StatusBadge />
          <CommandPalette />
          <OpenToWork />
          <InteractiveTerminal />
          <ResumeAnalyzer />
          <OutreachGenerator />

          <div className="fixed inset-0 -z-10" style={{ backgroundColor: '#050810' }} />

          <Navbar isDark={isDark} toggleTheme={toggle} />

          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <GitHubHeatmap />
            <CodingStats />
            <Certificates />
            <Blog />
            <Education />
            <Contact />
          </main>

          <Footer />
          <ChatBot />
        </div>
      )}
    </>
  )
}