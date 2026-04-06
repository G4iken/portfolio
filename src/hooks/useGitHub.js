import { useState, useEffect } from 'react'
import { GITHUB_USERNAME } from '../data'

export function useGitHub() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchRepos() {
      try {
        setLoading(true)
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12&type=public`,
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        const data = await res.json()
        setRepos(data.filter(r => !r.fork))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
    return () => controller.abort()
  }, [])

  return { repos, loading, error }
}
