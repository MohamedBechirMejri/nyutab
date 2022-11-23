import { useState } from "react";

const TodoList = () => {
  const [projects, setProjects] = useState([
    {
      title: "Project",
      tasks: [
        {
          title: "Finish todo list",
          isCompleted: false,
          showSubtasks: false,
          subtasks: [
            {
              text: "Add functionality",
              isCompleted: false,
            },
            {
              text: "improve look",
              isCompleted: false,
            },
            {
              text: "move to bottom on complete and add line through",
              isCompleted: false,
            },
            {
              text: "add new Subtask button",
              isCompleted: false,
            },
          ],
        },
        {
          title: "Finish todo list",
          isCompleted: false,
          showSubtasks: false,
          subtasks: [
            {
              text: "Add functionality",
              isCompleted: false,
            },
            {
              text: "improve look",
              isCompleted: false,
            },
            {
              text: "move to bottom on complete and add line through",
              isCompleted: false,
            },
            {
              text: "add new Subtask button",
              isCompleted: false,
            },
          ],
        },
        {
          title: "Finish todo list",
          isCompleted: false,
          showSubtasks: false,
          subtasks: [
            {
              text: "Add functionality",
              isCompleted: false,
            },
            {
              text: "improve look",
              isCompleted: false,
            },
            {
              text: "move to bottom on complete and add line through",
              isCompleted: false,
            },
            {
              text: "add new Subtask button",
              isCompleted: false,
            },
          ],
        },
      ],
    },
  ]);
  const [currentProject, setCurrentProject] = useState(0);

  return (
    <div className="grid grid-cols-[1fr,6fr] h-full">
      <div className="flex flex-col items-center gap-8">
        <h1>Todo</h1>
        <button>New Project</button>
        {projects.map((project, i) => (
          <button key={"project-" + i} onClick={() => setCurrentProject(i)}>
            {project.title || "Untitled"}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-start gap-4">
        <input
          className="text-4xl bg-transparent outline-none w-max"
          placeholder="Untitled"
          value={projects[currentProject].title}
          maxLength={20}
          onInput={e => {
            setProjects(projects => {
              const newProjects = projects;
              // @ts-ignore
              newProjects[currentProject].title = e.target.value;
              return [...newProjects];
            });
          }}
        />

        <button>New Task</button>
        <div className="flex flex-col gap-4 text-xl">
          {projects[currentProject].tasks.map((task, taskIndex) => (
            <div key={"task-" + taskIndex}>
              <div className="flex gap-4 pb-4 text-2xl">
                <h2> {task.title}</h2>{" "}
                <div className="flex gap-4">
                  <button>+</button>
                  <button>-</button>
                  <button>x</button>
                </div>
              </div>
              <ul className="flex flex-col gap-4 pl-4">
                {task.subtasks.map((subtask, subtaskIndex) => (
                  <li key={"subtask-" + subtaskIndex} className="relative">
                    <div className="absolute flex gap-4 -left-16">
                      <button>-</button>
                      <button>x</button>
                    </div>
                    <p> {subtask.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
