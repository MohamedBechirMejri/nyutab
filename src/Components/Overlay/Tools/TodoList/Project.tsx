import type ProjectType from "../../../../Types/Todos";
import Task from "./Task";

const Project = ({
  projects,
  currentProject,
  setProjects,
}: {
  projects: ProjectType[];
  currentProject: number;
  setProjects: any;
}) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <input
        className="text-4xl bg-transparent outline-none w-max"
        placeholder="Untitled"
        value={projects[currentProject].title}
        maxLength={20}
        onInput={e => {
          setProjects((projects: ProjectType[]) => {
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
          <Task task={task} id={taskIndex} />
        ))}
      </div>
    </div>
  );
};

export default Project;
