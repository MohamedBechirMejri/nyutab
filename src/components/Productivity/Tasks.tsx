import React from "react";
import { TiDelete } from "react-icons/ti";
import { MdOutlineAdd } from "react-icons/md";

const Tasks = () => {
  const [tasks, setTasks] = React.useState([
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

  const [completed, setCompleted] = React.useState([]);

  const [inputText, setInputText] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText === "") return;
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        text: inputText,
        isCompleted: false,
      },
    ]);
    setInputText("");
  };

  const handleToggle = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleClear = () => {
    setTasks(tasks.filter(task => !task.isCompleted));
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-2 p-8 text-lg font-light transition-all rounded-lg dark:text-white [grid-area:2/1/4/3]">
      <h1 className="font-bold">Tasks</h1>
      <ul className="w-full h-full overflow-scroll max-h-96">
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex items-center justify-between w-full gap-2 p-1 my-2 transition-all select-none "
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleToggle(task.id)}
                className="p-[.4rem] transition-all bg-white rounded outline-none appearance-none hover:bg-gray-200 checked:bg-blue-500 "
              />
              <p
                style={{
                  textDecoration: task.isCompleted ? "line-through" : "none",
                  color: task.isCompleted ? "gray" : "inherit",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onClick={() => handleToggle(task.id)}
              >
                {task.text}
              </p>
            </div>
            <button onClick={() => handleDelete(task.id)}>
              {" "}
              <TiDelete className="transition-all hover:fill-red-600 active:fill-red-500" />{" "}
            </button>
          </li>
        ))}
      </ul>{" "}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center w-full gap-2"
      >
        <button
          className="mx-2 font-medium text-white transition-all rounded-full hover:text-zinc-200 active:scale-95"
          onClick={handleClear}
        >
          clear
        </button>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="w-full transition-all rounded outline-none bg-slate-800 hover:bg-slate-700 "
        />
        <button type="submit">
          {" "}
          <MdOutlineAdd className="mx-2 text-white transition-all bg-blue-500 rounded-full hover:scale-125 active:scale-95" />{" "}
        </button>
      </form>
    </div>
  );
};

export default Tasks;
