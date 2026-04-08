export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, repos } = req.body

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

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
          {
            role: 'system',
            content: `You are an AI assistant for Jeremy Ebardo's portfolio.
Jeremy is a 4th-year Computer Engineering student at Bulacan State University, Philippines.
Skills: C, C++, Java, Python, PHP, JavaScript, ESP32, IoT, Embedded Systems, Web Development.
GitHub: github.com/G4iken. Email: ebardojeremyelmo@gmail.com.
Projects: Aegis Smart Lock, Fleur-c-Print, Bioplastic Thesis, SAP-1, ATM Banking System, Blog Website, Fire Alarm Circuit.
Only answer questions about Jeremy. Be friendly and concise.`
          },
          { role: 'user', content: message }
        ]
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' })
    }

    const reply = data.choices?.[0]?.message?.content || 'No response received.'
    return res.status(200).json({ reply })

  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message })
  }
}