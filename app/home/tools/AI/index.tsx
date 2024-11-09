import { useState } from "react";
import Messages, { type AIMessage } from "./Messages";
import Input from "./Input";
import Chats from "./Chats";
import { useAIStore } from "./state";

export default function AI() {
  const [messages, setMessages] = useState<AIMessage[]>([]);

  const { settings } = useAIStore();

  const onSubmit = async (msg: string) => {
    const newMessages = [
      ...messages,
      { role: "user", content: msg },
    ] as AIMessage[];

    setMessages(newMessages);

    // TODO: send message to api
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: newMessages,
      }),
    }).then(res => res.json());

    const response = res.choices[0].message.content;

    newMessages.push({ role: "assistant", content: response });

    setMessages([...newMessages]);
  };

  return (
    <div className="grid grid-rows-[minmax(0,1fr),auto] grid-cols-[1fr,4fr] size-full bg-black/25 backdrop-blur-3xl rounded-2xl overflow-hidden relative select-none">
      <Chats />
      <Messages messages={messages} />
      <Input submit={onSubmit} />
    </div>
  );
}
