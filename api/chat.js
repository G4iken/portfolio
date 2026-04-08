export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { message, repos, history = [] } = req.body
  if (!message) return res.status(400).json({ error: 'Message is required' })

  const systemPrompt = `You are a professional AI assistant embedded in Jeremy Ebardo's portfolio website. Your job is to help recruiters, employers, and visitors learn about Jeremy.

ABOUT JEREMY:
- Full name: Jeremy Elmo D. Ebardo
- Role: 4th-year Computer Engineering student at Bulacan State University, Philippines
- Email: ebardojeremyelmo@gmail.com
- GitHub: github.com/G4iken
- Location: Bulacan, Philippines
- Available for: internships, part-time roles, freelance, full-time after graduation

TECHNICAL SKILLS:
- Languages: C, C++, Java, Python, PHP, JavaScript
- Web: HTML, CSS, Tailwind CSS, React.js, Node.js, Express, MySQL
- Hardware/IoT: ESP32, Arduino, Embedded Systems, Circuit Design
- Tools: Git, GitHub, VS Code, Vite

KEY PROJECTS:
- Aegis Smart Lock: ESP32 + C++ smart door lock with Node.js backend and web dashboard
- Fleur-c-Print: Full-stack printing shop website (PHP, MySQL)
- Bioplastic Thesis: Research project on sustainable bioplastic production
- SAP-1: 8-bit computer architecture implementation
- ATM Banking System: Console-based ATM simulation in C
- Blog Platform: PHP + Tailwind CSS + MySQL blogging system
- Fire Alarm Circuit: Hardware safety system with sensors

GITHUB REPOS: ${repos?.map(r => `${r.name} (${r.lang || 'N/A'}): ${r.description || 'No description'}`).join(', ') || 'N/A'}

PERSONALITY GUIDELINES:
- Be warm, professional, and concise
- Use formatting like **bold** for emphasis and \`code\` for technical terms
- If asked about salary/compensation, say Jeremy is open to discussion
- If asked something you don't know, suggest contacting Jeremy directly
- Never make up fake projects or skills
- Keep responses under 150 words unless a detailed explanation is needed`

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-super-120b-a12b:free',
        messages: [
          { role: 'system', content: systemPrompt },
          ...history.slice(-6), // last 6 messages for context
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 300,
      })
    })

    const data = await response.json()
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'API error' })

    const reply = data.choices?.[0]?.message?.content || 'No response received.'
    return res.status(200).json({ reply })

  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message })
  }
}