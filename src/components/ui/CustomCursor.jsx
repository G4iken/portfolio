import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const down = () => setClicking(true)
    const up = () => setClicking(false)
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    const checkHover = (e) => {
      const el = e.target
      const isInteractive = el.closest('a, button, [role="button"], input, textarea, select, label')
      setHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', checkHover)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', checkHover)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [])

  // Smooth trail
  useEffect(() => {
    let frame
    const animate = () => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }))
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [pos])

  if (!visible) return null

  return (
    <>
      {/* Dot — follows mouse exactly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: clicking ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 2000, damping: 80 }}
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#2dd6ad',
        }}
      />

      {/* Ring — smooth trail */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          transform: `translate(${trail.x - (hovering ? 20 : 16)}px, ${trail.y - (hovering ? 20 : 16)}px)`,
          width: hovering ? 40 : 32,
          height: hovering ? 40 : 32,
          borderRadius: '50%',
          border: `1px solid rgba(45, 214, 173, ${hovering ? 0.8 : 0.4})`,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
          boxShadow: hovering ? '0 0 12px rgba(18,184,148,0.3)' : 'none',
        }}
      />
    </>
  )
}