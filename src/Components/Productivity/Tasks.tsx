import React from "react"
import { TiDelete } from "react-icons/ti"
import { MdOutlineAdd } from "react-icons/md"

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
  ])
  const [inputText, setInputText] = React.useState("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputText === "") return
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        text: inputText,
        isCompleted: false,
      },
    ])
    setInputText("")
  }

  const handleToggle = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    )
  }
  const handleDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-2 p-2 text-lg font-light transition-all rounded-lg dark:text-white">
      <h1 className="font-bold">Tasks</h1>
      <ul className="w-full h-full overflow-scroll max-h-96">
        {tasks.map(
          task =>
            !task.isCompleted && (
              <li
                key={task.id}
                className="flex items-center justify-between w-full gap-2 p-1 my-2 transition-all rounded cursor-pointer select-none dark:hover:bg-slate-700 hover:bg-slate-300"
                onClick={() => handleToggle(task.id)}
              >
                <div className="flex items-center gap-2 group">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggle(task.id)}
                    className="p-[.4rem] transition-all bg-transparent group-hover:bg-slate-500 rounded-full outline-none appearance-none ring-1 ring-white  "
                  />
                  <p
                    style={{
                      color: "inherit",
                      transition: "all 0.2s",
                    }}
                  >
                    {task.text}
                  </p>
                </div>
                {/* <button onClick={() => handleDelete(task.id)}>
                  {" "}
                  <TiDelete className="transition-all hover:fill-red-600 active:fill-red-500" />{" "}
                </button> */}
              </li>
            )
        )}
        <h2>Completed</h2>
        {tasks.map(
          task =>
            task.isCompleted && (
              <li
                key={task.id}
                className="flex items-center justify-between w-full gap-2 p-1 my-2 transition-all rounded cursor-pointer select-none dark:hover:bg-slate-700 hover:bg-slate-300 "
                onClick={() => handleToggle(task.id)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggle(task.id)}
                    className="p-[.4rem] transition-all bg-white opacity-40 rounded-full outline-none appearance-none hover:opacity-100 ring-1 ring-white "
                  />
                  <p
                    style={{
                      textDecoration: "line-through",
                      color: "gray",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {task.text}
                  </p>
                </div>
                {/* <button onClick={() => handleDelete(task.id)}>
                  {" "}
                  <TiDelete className="transition-all hover:fill-red-600 active:fill-red-500" />{" "}
                </button> */}
              </li>
            )
        )}
      </ul>{" "}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center w-full gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="w-full transition-all rounded outline-none dark:bg-slate-800 dark:hover:bg-slate-700 bg-slate-100 hover:bg-slate-300"
        />
        <button type="submit">
          {" "}
          <MdOutlineAdd className="mx-2 text-white transition-all bg-blue-500 rounded-full hover:scale-125 active:scale-95" />{" "}
        </button>
      </form>
    </div>
  )
}

export default Tasks
