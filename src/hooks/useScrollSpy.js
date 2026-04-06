import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds, offset = 80) {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + offset

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollY) {
          setActive(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [sectionIds, offset])

  return active
}
