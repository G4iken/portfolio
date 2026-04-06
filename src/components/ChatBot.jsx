import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Ask me about Jeremy's projects 👨‍💻" }
  ]);
  const [input, setInput] = useState("");
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const sendMessage = async () => {
    if (!input) return;

    const updatedMessages = [...messages, { role: "user", text: input }];
    setMessages(updatedMessages);
    setInput("");

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `
You are an AI assistant for Jeremy Elmo D. Ebardo's professional portfolio website.

Your job is to answer questions from recruiters, employers, and visitors about Jeremy. 
Always respond clearly, professionally, and confidently. Do not make up information that is not listed here.

------------------------
PERSONAL INFORMATION
------------------------
Name: Jeremy Elmo D. Ebardo
Location: Bulacan, Philippines
Role: Computer Engineering Student / Aspiring Software & IoT Developer

------------------------
SUMMARY
------------------------
Jeremy is experienced in designing and implementing both software and hardware systems. 
He has strong problem-solving skills, teamwork experience, and the ability to develop efficient and optimized solutions. 
He focuses on real-world engineering applications combining web development and embedded systems.

------------------------
EDUCATION
------------------------
- Bachelor of Science in Computer Engineering
  Bulacan State University (2022 - Present)

- STEM Strand
  Dr. Yanga’s Colleges Inc. (2020 - 2022)
  - Honor Student
  - Academic Contest 1st Place

------------------------
TECHNICAL SKILLS
------------------------
Programming Languages:
- C, C++, Java, Python, PHP, JavaScript

Web Development:
- HTML, Tailwind CSS, MySQL

Hardware / IoT:
- ESP32, Embedded Systems, Circuit Design

Soft Skills:
- Problem-solving
- Team collaboration
- Critical thinking
- Adaptability

------------------------
PROJECTS
------------------------

1. Fleur-c-Print
- A printing shop web application
- Built using PHP, MySQL, Tailwind CSS, and JavaScript
- Features order management and user interaction

2. Aegis Smart Lock
- IoT-based smart lock system using ESP32
- Developed using C++
- Focused on security and embedded systems integration

3. Slot Machine Web App
- Web-based game with animations and bonus system
- Uses PHP, JavaScript, MySQL
- Includes betting system, auto-spin, and UI effects

4. Blog Posting Website
- Full-stack blog system
- Built with PHP, Tailwind CSS, JavaScript, MySQL

5. ATM Banking System
- Developed in C language
- Simulates banking operations

6. Java Numerical Methods Project
- Implements mathematical computation algorithms

7. Ping Pong Game
- Developed using Python

8. Scribble Jump Game
- Java-based platform game inspired by Doodle Jump

9. Fire Alarm Circuit System
- Hardware-based safety system

10. SAP-1
- Basic computer architecture project

11. Bioplastic Production (Thesis)
- Research-focused engineering project

------------------------
INSTRUCTIONS
------------------------
- Answer questions only using the information above
- If asked about experience, highlight both software and hardware strengths
- If asked about projects, explain clearly and professionally
- If asked why hire Jeremy, emphasize versatility (web + IoT)
- Keep answers concise but informative
- Be confident and professional

User question: ${input}
`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await res.json();

      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response";

      setMessages([...updatedMessages, { role: "bot", text: reply }]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: "bot", text: "Error fetching response." }
      ]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-black/70 backdrop-blur-xl border border-pink-500/30 p-4 rounded-2xl shadow-xl">
      <div className="h-64 overflow-y-auto text-sm mb-2 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "user" ? "text-right" : "text-left"}
          >
            <span className="inline-block px-3 py-2 rounded-lg bg-gray-800">
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded bg-gray-900 text-white outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="bg-pink-500 hover:bg-pink-600 px-3 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}