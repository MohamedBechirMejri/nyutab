import { FiArrowUp } from "react-icons/fi";
import { useState } from "react";

export default function Input({ submit }: { submit: (msg: string) => void }) {
  const [input, setInput] = useState("");

  const rows = Math.min(5, input.split("\n").length); // update rows based on number of lines

  return (
    <div className="h-max w-full p-4">
      <div className="bg-zinc-700/50 flex gap-2 items-center rounded-2xl py-4 px-1">
        <textarea
          className="px-4 bg-transparent py-2 w-full outline-none transition-all resize-none"
          placeholder="Ask me anything..."
          rows={rows}
          value={input}
          onChange={e => setInput(e.target.value)}
        />

        <button
          className={
            "rounded-full shadow-xl bg-zinc-200 pointer-events-auto text-zinc-950 p-1 mr-2 border border-zinc-500 transition-all duration-300 disabled:opacity-50 " +
            (rows > 1 ? "self-end" : "")
          }
          onClick={() => submit(input)}
          disabled={input.trim() === ""}
        >
          <FiArrowUp size={24} />
        </button>
      </div>
    </div>
  );
}
