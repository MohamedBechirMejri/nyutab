import { useAIStore } from "../state";
import uniqid from "uniqid";
import type { Chat } from "../types";
import { useState } from "react";

export default function Chats() {
  const { chats, addChat } = useAIStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const newChat = () => {
    const newChat = {
      id: uniqid(),
      isActive: true,
      messages: [],
      mode: "default",
      mood: "default",
      model: "gpt-4o",
      key: "",
      name: null,
    } as Chat;

    addChat(newChat);
  };

  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-900 row-span-2 size-full p-4 flex flex-col gap-4 justify-between">
      <h1 className="text-xl font-bold">Chats</h1>
      <div className="h-full w-full flex flex-col gap-2 overflow-y-scroll">
        {chats.map(chat => (
          <button
            key={chat.id}
            className="w-full text-zinc-100 bg-zinc-800/20 p-2 rounded-2xl"
          >
            {chat.name ?? `Chat with ${chat.model}`}
          </button>
        ))}
      </div>
      <button
        className="text-xl font-bold w-full p-2 rounded-2xl text-zinc-200 bg-black/10"
        onClick={newChat}
      >
        New chat
      </button>

      <div>
        <button
          className="text-xl font-bold w-full p-2 rounded-2xl text-zinc-200 bg-black/10"
          onClick={() => setIsSettingsOpen(prv => !prv)}
        >
          Settings
        </button>
      </div>

      {isSettingsOpen && <Settings setIsSettingsOpen={setIsSettingsOpen} />}
    </div>
  );
}

const Settings = ({
  setIsSettingsOpen,
}: {
  setIsSettingsOpen: (arg0: boolean) => void;
}) => {
  const { setSettings, settings } = useAIStore();
  const [key, setKey] = useState(settings.key);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-zinc-500/90 backdrop-blur-3xl grid grid-cols-[auto,minmax(0,1fr)] p-8 h-3/4 w-3/4 rounded-2xl overflow-hidden grid-rows-1">
      <h1>Settings</h1>

      <div className="h-full w-full grid grid-rows-[minmax(0,1fr),auto]">
        <div className="relative flex items-center justify-center w-full row-span-5 p-4 overflow-scroll">
          <input
            type="text"
            placeholder="Enter your OpenAI API key"
            value={key}
            onChange={e => setKey(e.target.value)}
            className="p-4 bg-transparent outline-none w-full"
          />
        </div>

        <div className="flex items-center justify-end w-full gap-4">
          <button
            className="p-1 px-8 font-bold bg-white/50 rounded-2xl transition-all duration-300 hover:bg-white/75"
            onClick={() => setIsSettingsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="p-1 px-8 font-bold bg-zinc-500 rounded-2xl transition-all duration-300 hover:bg-zinc-400"
            onClick={() => {
              // save settings
              setSettings({
                ...settings,
                key,
              });
              setIsSettingsOpen(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * AI features
 *
 * 1. Chats
 *   - chats global state that's constantly synced with localStorage
 *   - should have id, isActive, messages, mode, model, key and any extra per chat configs like color...
 *   - name should initially be null with a placeholder in the jsx code. after the first AI reply we ask the ai for a proper name. maybe also do it every 10 messages
 *   - modes or moods are pretty important here and chats should be distinguishable by mode either have all chats get listed in the same place and have different colors for each mood and a different icon for each mode or maybe have categories
 *   - modes and moods cannot be changed after the chat is created
 *   - chats list shows the 5 latest chats. rest are auto archived
 *   - lp: add token counter based on model
 *   - model can't be changed
 *   - moods and modes can be configured in settings
 *   - chats can be deleted
 *
 * 2. Messages
 *   - should support markdown perfectly
 *   - should support code blocks
 *   - should support images
 *   - buttons to save messages to memory
 *   - buttons to copy messages to clipboard
 *   - buttons for code blocks
 *   - can edit messages
 *   - can delete messages
 *   - button to summarize messages
 *   - streaming support
 *
 * 3. Memory
 *   - memorize stuff about the user (manual)
 *   - memory is always shared with each chat
 *
 * 4. Input
 *   - textarea with rows = 1 increases based of number of lines with a max of 4 rows
 *   - should support code blocks
 *   - file input
 *
 * 5. Modes and moods
 *   - Modes are UI enhancements like adding code sections in dev mode, different system prompts...
 *   - Moods are how the AI responds, can be professional, strict, sassy or even andrew tate. it also affects the accuracy of the AI so if you want it to create a fun bedtime story you should use a more relaxed mood
 *
 * 6. Settings
 *   - configure modes and moods
 *   - configure model and key
 *
 * Future enhancements from backend
 * - search the web
 * - automate tasks
 * - parse files
 *
 */
