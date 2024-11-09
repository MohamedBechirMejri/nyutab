import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AIState, Chat, Message, Settings, Mode, type Memory } from "./types";

type AIStateStore = AIState & {
  addChat: (chat: Chat) => void;
  updateChat: (chat: Chat) => void;
  deleteChat: (chat: Chat) => void;
  clearChats: () => void;
  addMemory: (memory: string) => void;
  removeMemory: (memory: string) => void;
  clearMemory: () => void;
  updateMemory: (memory: Memory) => void;
  setSettings: (settings: Settings) => void;
};

export const useAIStore = create(
  persist<AIStateStore>(
    (set, get) => ({
      chats: [],
      settings: {
        key: "",
        model: "gpt-4o",
        modes: [],
        moods: [],
      },
      memory: [],

      addChat: (chat: Chat) => {
        set(state => ({
          chats: [...state.chats, chat],
        }));
      },

      updateChat: (chat: Chat) => {
        set(state => {
          const index = state.chats.findIndex(c => c.id === chat.id);
          if (index !== -1) {
            state.chats[index] = chat;
          }
          return state;
        });
      },

      deleteChat: (chat: Chat) => {
        set(state => {
          const index = state.chats.findIndex(c => c.id === chat.id);
          if (index !== -1) {
            state.chats.splice(index, 1);
          }
          return state;
        });
      },

      clearChats: () => {
        set({ chats: [] });
      },

      addMemory: (memory: string) => {
        set(state => ({
          memory: [...state.memory, memory],
        }));
      },

      removeMemory: (memory: string) => {
        set(state => {
          const index = state.memory.findIndex(m => m === memory);
          if (index !== -1) {
            state.memory.splice(index, 1);
          }
          return state;
        });
      },

      clearMemory: () => {
        set({ memory: [] });
      },

      updateMemory: (memory: Memory) => {
        set({ memory });
      },

      setSettings: (settings: Settings) => {
        set({ settings });
      },
    }),
    { name: "ai-state" }
  )
);
