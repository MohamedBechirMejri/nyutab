import React from "react";
import { TiDelete } from "react-icons/ti";
import { MdOutlineAdd } from "react-icons/md";

const TodoList = () => {
  const [todos, setTodos] = React.useState([
    {
      id: 1,
      text: "Learn React",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Learn TypeScript",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Learn Angular",
      isCompleted: false,
    },
  ]);

  const [inputText, setInputText] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText === "") return;
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        text: inputText,
        isCompleted: false,
      },
    ]);
    setInputText("");
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="rounded-lg w-max p-3 text-2xl font-medium bg-[#C4C4C4] flex flex-col items-center justify-center transition-all gap-2">
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between w-full gap-2 my-2 transition-all select-none"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleToggle(todo.id)}
                className="w-4 h-4 transition-all bg-white rounded outline-none appearance-none hover:bg-gray-200 checked:bg-blue-500"
              />
              <span
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  color: todo.isCompleted ? "gray" : "black",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onClick={() => handleToggle(todo.id)}
              >
                {todo.text}
              </span>
            </div>
            <button onClick={() => handleDelete(todo.id)}>
              {" "}
              <TiDelete className="transition-all hover:fill-red-600 active:fill-red-500" />{" "}
            </button>
          </li>
        ))}
      </ul>{" "}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="transition-all rounded outline-none"
        />
        <button type="submit">
          {" "}
          <MdOutlineAdd className="mx-2 text-white transition-all bg-blue-500 rounded-full hover:scale-125 active:scale-95" />{" "}
        </button>
      </form>
    </div>
  );
};

export default TodoList;
