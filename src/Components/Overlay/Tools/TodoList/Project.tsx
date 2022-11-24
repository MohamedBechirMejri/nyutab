import { useState } from "react";
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

  return (
    <div className="flex flex-col items-start gap-4">
      <input
        className="text-4xl bg-transparent outline-none w-max"
        placeholder="Untitled"
        value={project.title}
        maxLength={20}
        onChange={handleChange}
      />

      <button>New Task</button>

      {/* <div className="flex flex-col w-full gap-4 text-xl">
        {tasks.map((task, taskIndex) => (
          <Task
            key={"Task-" + taskIndex}
            task={task}
            id={taskIndex}
            setProjects={setProjects}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Project;
