import { useEffect } from 'react'

export function useTheme() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  // No toggle — always dark
  const isDark = true
  const toggle = () => {} // disabled

  return { isDark, toggle }
}