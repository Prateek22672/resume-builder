import React, { useState } from "react";
import axios from "axios";

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/chat", {
        message: input,
      });

      const aiMessage = { sender: "ai", text: res.data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = { sender: "ai", text: "❌ Failed to get response." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">💬 Gemini AI Chat</h2>

      <div className="mb-4 h-64 overflow-y-auto border p-2 rounded bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block px-3 py-2 rounded ${
                msg.sender === "user" ? "bg-blue-200" : "bg-green-200"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p className="text-gray-500">Thinking...</p>}
      </div>

      <div className="flex">
        <input
          type="text"
          className="flex-1 border rounded-l px-3 py-2 focus:outline-none"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;
