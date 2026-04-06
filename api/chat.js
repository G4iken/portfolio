export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = JSON.parse(req.body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are an AI assistant for Jeremy Ebardo's portfolio.

Answer questions ONLY about Jeremy using this data:

- Computer Engineering student from Bulacan, Philippines
- Skills: C, C++, Java, Python, PHP, JavaScript, ESP32, IoT, Web Development
- Projects:
  • Fleur-c-Print (printing website)
  • Aegis Smart Lock (ESP32 IoT system)
  • Slot Machine Web App
  • Blog Website
  • ATM System in C
  • Java Numerical Methods
  • Ping Pong Game (Python)
  • Scribble Jump (Java)
  • Fire Alarm Circuit
  • SAP-1 Computer Architecture
  • Bioplastic Thesis

If question is unrelated, politely redirect.

Be clear, professional, and concise.

User: ${message}
`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error.message });
  }
}