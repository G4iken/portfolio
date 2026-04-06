import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me anything about Jeremy 👨‍💻" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "`Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: newMessages
      })
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      {
        role: "assistant",
        content: data.choices?.[0]?.message?.content || "No response"
      }
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-black/80 backdrop-blur-lg p-4 rounded-xl shadow-lg">
      <div className="h-64 overflow-y-auto text-sm mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span className="block">{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded bg-gray-800 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my projects..."
        />
        <button onClick={sendMessage} className="bg-pink-500 px-3 rounded">
          Send
        </button>
      </div>
    </div>
  );
}