const chatsStub = [
  {
    id: "chat-1",
    isActive: true,
    messages: [],
    mode: "default",
    model: "gpt-4",
    key: "sk-1234567890",
    name: null,
  },
  {
    id: "chat-2",
    isActive: true,
    messages: [],
    mode: "default",
    model: "gpt-4",
    key: "sk-1234567890",
    name: null,
  },
  {
    id: "chat-3",
    isActive: true,
    messages: [],
    mode: "default",
    model: "gpt-4",
    key: "sk-1234567890",
    name: null,
  },
  {
    id: "chat-4",
    isActive: true,
    messages: [],
    mode: "default",
    model: "gpt-4",
    key: "sk-1234567890",
    name: null,
  },
  {
    id: "chat-5",
    isActive: true,
    messages: [],
    mode: "default",
    model: "gpt-4",
    key: "sk-1234567890",
    name: null,
  },
  {
    id: "chat-6",
    isActive: true,
    messages: [],
    mode: "default",
    model: "gpt-4",
    key: "sk-1234567890",
    name: null,
  },
  {
    id: "chat-7",
    isActive: true,
    messages: [],
    mode: "default",
    model: "gpt-4",
    key: "sk-1234567890",
    name: null,
  },
  {
    id: "chat-8",
    isActive: true,
    messages: [],
    mode: "default",
    model: "gpt-4",
    key: "sk-1234567890",
    name: null,
  },
  {
    id: "chat-9",
    isActive: true,
    messages: [],
    mode: "default",
    model: "gpt-4",
    key: "sk-1234567890",
    name: null,
  },
  {
    id: "chat-10",
    isActive: true,
    messages: [],
    mode: "default",
    model: "gpt-4",
    key: "sk-1234567890",
    name: null,
  },
  {
    id: "chat-11",
    isActive: true,
    messages: [],
    mode: "default",
    model: "gpt-4",
    key: "sk-1234567890",
    name: null,
  },
  {
    id: "chat-12",
    isActive: true,
    messages: [],
    mode: "default",
    model: "gpt-4",
    key: "sk-1234567890",
    name: null,
  },
];

export default function Chats() {
  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-900 row-span-2 size-full p-4 flex flex-col gap-4 justify-between">
      <h1 className="text-xl font-bold">Chats</h1>
      <div className="h-full w-full flex flex-col gap-2 overflow-y-scroll">
        {chatsStub.map(chat => (
          <button
            key={chat.id}
            className="w-full text-zinc-100 bg-zinc-800/20 p-2 rounded-2xl"
          >
            {chat.name ?? `Chat with ${chat.model}`}
          </button>
        ))}
      </div>
      <button className="text-xl font-bold w-full p-2 rounded-2xl text-zinc-200 bg-black/10">
        New chat
      </button>
    </div>
  );
}

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
