// hardcoded for now

import type { Mode, Mood } from "../types";

// modes specify what the UI should look like. for now we only show standard and dev modes
const modes = [
  {
    id: "standard",
    name: "Standard",
    color: "#71717a", // zinc-500
    prompt: "You are a helpful assistant.",
    description: "This is the standard mode.",
    extra: {},
  },
  {
    id: "dev",
    name: "Dev",
    color: "#6366f1", // indigo-500
    prompt: "You are a developer assistant.",
    description: "This is the dev mode.",
    extra: {},
  },
] as Mode[];

const moods = [
  {
    id: "relaxed",
    name: "Relaxed",
    color: "#78716c", // stone-500
    prompt: "You are a helpful assistant.",
    description: "This is the standard mode.",
    extra: {},
  },
  {
    id: "strict",
    name: "Strict",
    color: "#e11d48", // rose-600
    prompt: "You are a strict assistant.",
    description: "This is the strict mode.",
    extra: {},
  },
  {
    id: "sassy",
    name: "Sassy",
    color: "#facc15", // yellow-400
    prompt: "You are a sassy assistant.",
    description: "This is the sassy mode.",
    extra: {},
  },
] as Mood[];

export default function ModePicker() {
  return (
    <div className="absolute inset-0 flex items-center justify-center flex-col gap-8">
      <h1>Chatting with a</h1>
      <div className="flex gap-8">
        {moods.map(mood => (
          <button
            key={mood.id}
            className="w-full text-zinc-100 bg-zinc-800/20 p-2 rounded-2xl"
            style={{ backgroundColor: mood.color }}
          >
            {mood.name}
          </button>
        ))}
      </div>
      <div className="flex gap-8">
        {modes.map(mode => (
          <button
            key={mode.id}
            className="w-full text-zinc-100 bg-zinc-800/20 p-2 rounded-2xl"
            style={{ backgroundColor: mode.color }}
          >
            {mode.name}
          </button>
        ))}
      </div>

      <h1>Assistant</h1>
    </div>
  );
}
