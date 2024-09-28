import { useState } from "react";
import Messages, { type AIMessage } from "./Messages";
import Input from "./Input";
import Chats from "./Chats";

export default function AI() {
  const [messages, setMessages] = useState<AIMessage[]>([]);

  const onSubmit = async (msg: string) => {
    const newMessages = [
      ...messages,
      { role: "user", content: msg },
      { role: "assistant", content: "pong" },
    ] as AIMessage[];

    setMessages(newMessages);

    // TODO: send message to api
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: newMessages,
      }),
    }).then(res => res.json());

    console.log(response);
  };

  return (
    <div className="grid grid-rows-[minmax(0,1fr),auto] grid-cols-[1fr,4fr] size-full bg-black/25 backdrop-blur-3xl rounded-2xl overflow-hidden relative select-none">
      <Chats />
      <Messages messages={messages} />
      <Input submit={onSubmit} />
    </div>
  );
}
