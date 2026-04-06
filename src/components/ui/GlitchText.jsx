import { useState, useEffect } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#_ABCDEFabcdef0123456789'

export default function GlitchText({ text, className = '', duration = 800 }) {
  const [displayed, setDisplayed] = useState(text)
  const [glitching, setGlitching] = useState(false)

  const scramble = () => {
    if (glitching) return
    setGlitching(true)
    let iteration = 0
    const original = text
    const interval = setInterval(() => {
      setDisplayed(
        original
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration) return original[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      if (iteration >= original.length) {
        clearInterval(interval)
        setDisplayed(original)
        setGlitching(false)
      }
      iteration += 1.5
    }, duration / original.length)
  }

  useEffect(() => {
    const t = setTimeout(scramble, 600)
    return () => clearTimeout(t)
  }, [text])

  return (
    <span
      className={`font-mono cursor-default select-none ${className}`}
      onMouseEnter={scramble}
    >
      {displayed}
    </span>
  )
}
