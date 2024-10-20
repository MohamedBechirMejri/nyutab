export type AIState = {
  chats: Chat[];
  settings: Settings;
  memory: Memory;
};

export type Chat = {
  id: string;
  isActive: boolean;
  messages: Message[];
  mode: string;
  model: string;
  key: string;
  name: string | null;
};

export type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

export type Settings = {
  model: string;
  key: string;
  modes: Mode[];
};

export type Mode = {
  id: string;
  name: string;
  color: string;
  prompt: string;
  description: string;
  extra: Record<string, string | number>; // stuff like temperature, max tokens, etc
};

export type Memory = string[];
