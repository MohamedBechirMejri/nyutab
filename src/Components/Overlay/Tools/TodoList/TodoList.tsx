import { useState } from "react";
import uniqid from "uniqid";
import Nav from "./Nav";
import Project from "./Project";

const TodoList = () => {
  const [projects, setProjects] = useState([
    {
      id: uniqid(),
      title: "Project",
      tasks: [
        {
          id: uniqid(),
          title: "Finish todo list",
          isCompleted: false,
          showSubtasks: false,
          subtasks: [
            {
              id: uniqid(),
              text: "Add functionality",
              isCompleted: false,
            },
            {
              id: uniqid(),
              text: "improve look",
              isCompleted: false,
            },
            {
              id: uniqid(),
              text: "move to bottom on complete and add line through",
              isCompleted: false,
            },
            {
              id: uniqid(),
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
      <Nav projects={projects} setCurrentProject={setCurrentProject} />

      <Project project={projects[currentProject]} setProjects={setProjects} />
    </div>
  );
};

export default TodoList;
