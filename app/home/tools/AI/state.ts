import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AIState, Chat, Message, Settings, Mode, type Memory } from "./types";

export const useAIStore = create(
  persist<AIState>(
    (set, get) => ({
      chats: [],
      settings: {
        key: "",
        model: "gpt-4o",
        modes: [],
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
