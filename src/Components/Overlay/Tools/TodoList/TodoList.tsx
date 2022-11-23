import { useState } from "react";

const TodoList = () => {
  const [projects, setProjects] = useState([
    {
      title: "Project",
      tasks: [
        {
          title: "Finish todo list",
          subtasks: [
            "Add functionality",
            "improve look",
            "move to bottom on complete and add line through",
            "add new Subtask button",
          ],
        },
        {
          title: "Task",
          subtasks: ["Subtask"],
        },
        {
          title: "Task",
          subtasks: ["Subtask"],
        },
      ],
    },
    {
      title: "Project2",
      tasks: [
        {
          title: "Task",
          subtasks: ["Subtask"],
        },
      ],
    },
    {
      title: "Project3",
      tasks: [
        {
          title: "Task",
          subtasks: ["Subtask"],
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
          <div key={"project-" + i}>{project.title}</div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-4">
        <h1 className="text-4xl">{projects[currentProject].title}</h1>
        <button>New Task</button>
        <div className="flex flex-col gap-4 pb-8 text-xl">
          {projects[currentProject].tasks.map((task, taskIndex) => (
            <div key={"task-" + taskIndex}>
              <h2 className="relative py-2 text-2xl">
                <span className="absolute -left-8">+</span> {task.title}
              </h2>
              <ul className="flex flex-col gap-4 pl-4">
                {task.subtasks.map((subtask, subtaskIndex) => (
                  <li key={"subtask-" + subtaskIndex}>{subtask}</li>
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
