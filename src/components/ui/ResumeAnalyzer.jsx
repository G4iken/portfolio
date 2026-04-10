import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileSearch, X, Sparkles, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function ResumeAnalyzer() {
  const [open, setOpen] = useState(false)
  const [jobDesc, setJobDesc] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    if (!jobDesc.trim() || loading) return
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Analyze this job description and tell me how well Jeremy Ebardo matches it. 

JOB DESCRIPTION:
${jobDesc}

Respond in this EXACT JSON format only, no other text:
{
  "score": <number 0-100>,
  "verdict": "<one of: Strong Match, Good Match, Partial Match, Weak Match>",
  "matched": ["<skill or requirement Jeremy has>", ...],
  "missing": ["<skill or requirement Jeremy lacks>", ...],
  "tips": ["<specific actionable tip to improve chances>", ...],
  "summary": "<2 sentence overall assessment>"
}`,
          repos: [],
          history: []
        })
      })

      const data = await res.json()
      const text = data.reply || ''

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        setResult(parsed)
      } else {
        setResult({ error: 'Could not parse response. Try again.' })
      }
    } catch {
      setResult({ error: 'Analysis failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const scoreColor = (score) => {
    if (score >= 75) return '#2dd6ad'
    if (score >= 50) return '#fbbf24'
    return '#f87171'
  }

  return (
    <>
      {/* Trigger button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3 }}
        onClick={() => setOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1 px-2 py-4 rounded-l-xl font-mono text-[10px] transition-all hover:px-3"
        style={{
          background: 'rgba(9,13,24,0.95)',
          border: '1px solid rgba(18,184,148,0.2)',
          borderRight: 'none',
          color: '#2dd6ad',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
      >
        <FileSearch size={14} />
        <span>Job Match Analyzer</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(5,8,16,0.85)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
              style={{
                background: 'rgba(9,13,24,0.99)',
                border: '1px solid rgba(18,184,148,0.2)',
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-6 py-4 sticky top-0 z-10"
                style={{ borderBottom: '1px solid rgba(18,184,148,0.1)', background: 'rgba(9,13,24,0.99)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(18,184,148,0.15)', border: '1px solid rgba(18,184,148,0.3)' }}>
                  <Sparkles size={16} style={{ color: '#2dd6ad' }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-white text-lg">Job Match Analyzer</h3>
                  <p className="font-mono text-xs text-slate-500">
                    Paste a job description — AI analyzes Jeremy's fit
                  </p>
                </div>
                <button onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Input */}
                <div>
                  <label className="block font-mono text-xs text-slate-500 tracking-widest uppercase mb-2">
                    Job Description
                  </label>
                  <textarea
                    value={jobDesc}
                    onChange={e => setJobDesc(e.target.value)}
                    rows={7}
                    placeholder="Paste the full job description here... (requirements, responsibilities, qualifications)"
                    className="w-full px-4 py-3 rounded-xl text-sm resize-none focus:outline-none transition-all"
                    style={{
                      background: 'rgba(14,20,34,0.8)',
                      border: '1px solid rgba(30,40,60,0.8)',
                      color: '#e2e8f0',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(18,184,148,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(30,40,60,0.8)'}
                  />
                </div>

                <button
                  onClick={analyze}
                  disabled={!jobDesc.trim() || loading}
                  className="w-full py-3 rounded-xl font-mono text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, #12b894, #2dd6ad)', color: '#050810' }}
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Analyzing...</>
                  ) : (
                    <><Sparkles size={16} /> Analyze Match</>
                  )}
                </button>

                {/* Results */}
                {result && !result.error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Score */}
                    <div className="p-5 rounded-xl text-center"
                      style={{ background: 'rgba(14,20,34,0.8)', border: '1px solid rgba(30,40,60,0.8)' }}>
                      <div className="relative w-28 h-28 mx-auto mb-3">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(20,27,45,1)" strokeWidth="8" />
                          <circle cx="50" cy="50" r="40" fill="none"
                            stroke={scoreColor(result.score)} strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${result.score * 2.51} 251`}
                            style={{ transition: 'stroke-dasharray 1s ease' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-display text-3xl font-bold"
                            style={{ color: scoreColor(result.score) }}>
                            {result.score}%
                          </span>
                        </div>
                      </div>
                      <p className="font-display text-xl font-bold text-white">{result.verdict}</p>
                      <p className="font-mono text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                        {result.summary}
                      </p>
                    </div>

                    {/* Matched / Missing */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl"
                        style={{ background: 'rgba(14,20,34,0.8)', border: '1px solid rgba(18,184,148,0.15)' }}>
                        <p className="font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-1.5"
                          style={{ color: '#2dd6ad' }}>
                          <CheckCircle size={12} /> Matched
                        </p>
                        <ul className="space-y-1.5">
                          {result.matched?.map((m, i) => (
                            <li key={i} className="font-mono text-xs text-slate-400 flex items-start gap-1.5">
                              <span style={{ color: '#2dd6ad' }}>✓</span> {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl"
                        style={{ background: 'rgba(14,20,34,0.8)', border: '1px solid rgba(248,113,113,0.15)' }}>
                        <p className="font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-1.5 text-red-400">
                          <XCircle size={12} /> To Improve
                        </p>
                        <ul className="space-y-1.5">
                          {result.missing?.map((m, i) => (
                            <li key={i} className="font-mono text-xs text-slate-400 flex items-start gap-1.5">
                              <span className="text-red-400">✗</span> {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="p-4 rounded-xl"
                      style={{ background: 'rgba(14,20,34,0.8)', border: '1px solid rgba(251,191,36,0.15)' }}>
                      <p className="font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-1.5 text-yellow-400">
                        <AlertCircle size={12} /> Action Tips
                      </p>
                      <ul className="space-y-2">
                        {result.tips?.map((t, i) => (
                          <li key={i} className="font-mono text-xs text-slate-400 flex items-start gap-2">
                            <span className="text-yellow-400 flex-shrink-0">{i + 1}.</span> {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {result?.error && (
                  <p className="text-center font-mono text-sm text-red-400 py-4">{result.error}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}