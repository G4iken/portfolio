import { useTheme } from './hooks/useTheme'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Education from './components/sections/Education'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import ChatBot from "./ChatBot";

function App() {
  return (
    <>
      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-bold">Jeremy Elmo D. Ebardo</h1>
        <p className="text-lg mt-2">
          Computer Engineering Student | Web & IoT Developer
        </p>
      </section>

      {/* ABOUT */}
      <section className="p-10">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p>
          I am a Computer Engineering student specializing in software and hardware
          systems, with experience in web development, embedded systems, and IoT solutions.
        </p>
      </section>

      {/* PROJECTS */}
      <section className="p-10">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <ul>
          <li>Fleur-c-Print (Printing Shop Website)</li>
          <li>Aegis Smart Lock (ESP32 IoT System)</li>
          <li>Slot Machine Web App</li>
          <li>Blog Posting Website</li>
        </ul>
      </section>

      {/* CONTACT */}
      <section className="p-10">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p>Email: ebardojeremyelmo@gmail.com</p>
      </section>

      {/* AI CHATBOT */}
      <ChatBot />
    </>
  );
}

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
    </div>
  )
}