import { useState } from "react";
import Nav from "./Nav";
import Project from "./Project";

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
      <Nav projects={projects} setCurrentProject={setCurrentProject} />

      <Project
        projects={projects}
        currentProject={currentProject}
        setProjects={setProjects}
      />
    </div>
  );
};

export default TodoList;
