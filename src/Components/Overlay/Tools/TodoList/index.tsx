import { useEffect, useState } from "react";
import { getLocalData, saveLocalData } from "../../../../lib/storageUtils";
import Nav from "./Nav";
import Project from "./Project";

const TodoList = () => {
  const [projects, setProjects] = useState<[] | null>(null);
  const [currentProject, setCurrentProject] = useState(0);

  useEffect(() => {
    (async () => {
      const localData = await getLocalData("tasks");
      if (localData) setProjects(localData);
    })();
  }, []);

  useEffect(() => {
    if (projects) saveLocalData("tasks", projects);
  }, [projects]);

  return !projects ? (
    <div> "loading" </div>
  ) : (
    <div className="h-full overflow-y-scroll bg-slate-900">
      <h1 className="flex items-center justify-center h-[7rem] text-3xl font-bold">
        Todo List
      </h1>

      <Nav
        projects={projects}
        setCurrentProject={setCurrentProject}
        setProjects={setProjects}
      />
      {projects && projects.length ? (
        <Project project={projects[currentProject]} setProjects={setProjects} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TodoList;
