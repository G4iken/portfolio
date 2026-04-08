import { useState, useEffect } from 'react'

export default function TypewriterText({ words, className = '' }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    const current = words[wordIndex]
    let timeout

    if (!deleting && charIndex <= current.length) {
      setDisplayed(current.slice(0, charIndex))
      timeout = setTimeout(() => setCharIndex(c => c + 1), 80)
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && charIndex >= 0) {
      setDisplayed(current.slice(0, charIndex))
      timeout = setTimeout(() => setCharIndex(c => c - 1), 40)
    } else if (deleting && charIndex < 0) {
      setDeleting(false)
      setWordIndex(i => (i + 1) % words.length)
      setCharIndex(0)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words])

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse" style={{ color: '#2dd6ad' }}>|</span>
    </span>
  )
}