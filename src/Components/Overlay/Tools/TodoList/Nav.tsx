import type { Project } from "../../../../Types/Todos";

const Nav = ({
  projects,
  setCurrentProject,
}: {
  projects: Project[];
  setCurrentProject: any;
}) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1>Todo</h1>
      <button>New Project</button>
      {projects.map((project, i: number) => (
        <button key={"project-" + i} onClick={() => setCurrentProject(i)}>
          {project.title || "Untitled"}
        </button>
      ))}
    </div>
  );
};

export default Nav;
