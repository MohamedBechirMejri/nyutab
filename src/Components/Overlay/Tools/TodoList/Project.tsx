import { useState } from "react";
import uniqid from "uniqid";
import type ProjectType from "../../../../Types/Todos";
import Task from "./Task";

const Project = ({
  project,
  setProjects,
}: {
  project: ProjectType;
  setProjects: any;
}) => {
  const [tasks, setTasks] = useState(project.tasks);

  const handleChange = (e: any) => {
    setProjects((projects: ProjectType[]) => {
      // @ts-ignore
      const { value } = e.target;

      return projects.map(p => {
        if (project.id !== p.id) return p;
        return {
          ...project,
          title: value,
        };
      });
    });
  };

  const addTask = () => {
    setTasks([
      {
        id: uniqid(),
        title: "",
        isCompleted: false,
        showSubtasks: false,
        subtasks: [],
      },
      ...tasks,
    ]);
  };

  return (
    <div className="flex flex-col items-start gap-4 pl-[5rem]">
      <input
        className="text-4xl bg-transparent outline-none w-max"
        placeholder="Untitled"
        value={project.title}
        maxLength={20}
        onChange={handleChange}
      />

      <button
        className="p-2 px-6 font-medium text-orange-500 transition-all bg-orange-500 bg-opacity-25 rounded backdrop-blur-3xl active:scale-95"
        onClick={addTask}
      >
        New Task
      </button>

      <div className="flex flex-col w-full gap-4 text-xl">
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            setProjects={setProjects}
            setTasks={setTasks}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;
