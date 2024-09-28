import { useState } from "react";

export default function AI() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant" | "system"; content: string }[]
  >([]);
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-full bg-black/25 backdrop-blur-3xl w-full rounded-2xl overflow-hidden p-8 pt-4 relative select-none">
      <div>
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 ${
              message.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <p className="text-zinc-400">{message.role}</p>
            <p className="text-white">{message.content}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="bg-zinc-700/50 px-4 rounded-2xl py-2 w-[28rem] max-w-full outline-none text-center shadow-xl focus:ring-2 ring-zinc-700 transition-all "
        placeholder="Type your message..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <button
        className="absolute top-6 right-4 p-2 px-4 rounded-2xl shadow-xl bg-zinc-500/50 pointer-events-auto"
        onClick={() =>
          setMessages([...messages, { role: "user", content: input }])
        }
      >
        Send
        <span className="text-xl font-bold">→</span>
      </button>
    </div>
  );
}
