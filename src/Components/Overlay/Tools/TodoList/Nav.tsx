import uniqid from "uniqid";
import type Project from "../../../../Types/Todos";

const Nav = ({
  projects,
  setCurrentProject,
  setProjects,
}: {
  projects: Project[];
  setCurrentProject: any;
  setProjects: any;
}) => {
  const addProject = () => {
    setProjects([
      {
        id: uniqid(),
        title: "",
        tasks: [],
      },
      ...projects,
    ]);
  };
  return (
    <div className="flex flex-col items-center gap-8 overflow-y-scroll noscroll">
      <h1 className="text-3xl font-bold">Todo List</h1>
      <button
        onClick={addProject}
        className="p-2 px-6 font-medium text-teal-500 transition-all bg-teal-500 bg-opacity-25 rounded backdrop-blur-3xl active:scale-95"
      >
        New Project
      </button>
      {projects.map((project, i: number) => (
        <button
          key={project.id}
          onClick={() => setCurrentProject(i)}
          className="p-2 px-6 font-medium transition-all rounded hover:bg-opacity-25 hover:bg-white backdrop-blur-3xl active:scale-95"
        >
          {project.title || "Untitled"}
        </button>
      ))}
    </div>
  );
};

export default Nav;
