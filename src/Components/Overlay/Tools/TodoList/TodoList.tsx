import { useEffect, useState } from "react";
import { getLocalData, saveLocalData } from "../../../../lib/storageUtils";
import Nav from "./Nav";
import Project from "./Project";

const TodoList = () => {
  const [projects, setProjects] = useState(null);
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
    <div className="grid grid-cols-[1fr,6fr] h-full">
      <Nav
        projects={projects}
        setCurrentProject={setCurrentProject}
        setProjects={setProjects}
      />
      <Project project={projects[currentProject]} setProjects={setProjects} />
    </div>
  );
};

export default TodoList;
