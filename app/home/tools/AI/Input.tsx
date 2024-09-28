import { useState } from "react";

export default function Input({ submit }: { submit: (msg: string) => void }) {
  const [input, setInput] = useState("");

  return (
    <div className="flex gap-2 items-center h-max w-full p-4">
      <textarea
        className="bg-zinc-700/50 px-4 rounded-2xl py-2 w-full outline-none shadow-xl focus:ring-2 ring-zinc-700 transition-all resize-none"
        placeholder="Type your message..."
        rows={4}
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <button
        className="p-2 px-4 rounded-2xl shadow-xl bg-zinc-500/50 pointer-events-auto"
        onClick={() => submit(input)}
      >
        Send
        <span className="text-xl font-bold">→</span>
      </button>
    </div>
  );
}
