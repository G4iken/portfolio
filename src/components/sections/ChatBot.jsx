import { useState, useEffect, useRef } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Ask me anything about Jeremy 👨‍💻" }
  ]);
  const [input, setInput] = useState("");
  const [repos, setRepos] = useState([]);
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GITHUB_USERNAME = "G4iken";

  // 🔗 Fetch GitHub repos
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.slice(0, 5).map(repo => ({
          name: repo.name,
          description: repo.description
        }));
        setRepos(formatted);
      });
  }, []);

  // 🔽 Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🎤 Voice Input
  const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript;
      setInput(speech);
    };
  };

  // 🔊 Speak response
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
  };

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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `
                      You are an AI assistant for Jeremy Ebardo's portfolio.

                      Use the following GitHub projects as reference:
                      ${repos.map(r => `- ${r.name}: ${r.description}`).join("\n")}

                      Jeremy's skills include:
                      C, Java, Python, PHP, JavaScript, ESP32, Web Development, IoT Systems

                      Be professional, concise, and helpful.

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
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      setMessages([...updatedMessages, { role: "bot", text: reply }]);
      speak(reply); // 🔊 voice output
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: "bot", text: "Error fetching response." }
      ]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-96 h-[500px] bg-[#0d0d0d] border border-gray-700 rounded-2xl shadow-2xl flex flex-col">

      {/* Header */}
      <div className="p-3 border-b border-gray-700 font-semibold text-white">
        Jeremy AI Assistant
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-xl max-w-[75%] ${
                msg.role === "user"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700 flex gap-2">
        <input
          className="flex-1 p-2 rounded bg-gray-900 text-white outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my projects..."
        />
        <button
          onClick={startVoice}
          className="bg-gray-700 px-3 rounded"
        >
          🎤
        </button>
        <button
          onClick={sendMessage}
          className="bg-pink-500 hover:bg-pink-600 px-3 rounded text-white"
        >
          ➤
        </button>
      </div>
    </div>
  );
}