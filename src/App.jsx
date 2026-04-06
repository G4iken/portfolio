import { useTheme } from './hooks/useTheme'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Education from './components/sections/Education'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import ChatBot from './components/sections/ChatBot'

export default function App() {
  const { isDark, toggle } = useTheme()

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10" style={{ backgroundColor: '#050810' }} />

      <Navbar isDark={isDark} toggleTheme={toggle} />

      <main>
        <Hero />
        <About />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
      <ChatBot />
    </div>
  )
}