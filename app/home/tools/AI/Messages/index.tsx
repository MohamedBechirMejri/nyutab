import { useEffect, useRef, useState } from "react";
import ModePicker from "./ModePicker";

export type AIMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default function Messages({ messages }: { messages: AIMessage[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (ref.current) {
        ref.current.scrollTo({
          top: ref.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="size-full overflow-auto noscroll p-8 relative pt-16"
      ref={ref}
    >
      <span className="sticky -top-16 -m-8 w-[calc(100%+4rem)] bg-black h-4 block z-10 blur-xl" />

      {messages.length === 0 && <ModePicker />}

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
  );
}
