import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import uniqid from "uniqid";
import type ProjectType from "../../../../Types/Todos";
import Task from "./Task";

const buttonAnimation = (isHovered: boolean) => ({
  initial: { opacity: 0, x: -15, scale: 0 },
  animate: {
    opacity: isHovered ? 1 : 0,
    x: isHovered ? 0 : -15,
    scale: isHovered ? 1.1 : 0,
  },
  whileHover: { scale: 1.25 },
  whileTap: { scale: 1 },
});

const Project = ({
  project,
  setProjects,
}: {
  project: ProjectType;
  setProjects: any;
}) => {
  const [tasks, setTasks] = useState(project.tasks);
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    setProjects((projects: ProjectType[]) => {
      return projects.filter(p => project.id !== p.id);
    });
  };

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
        isFolded: false,
        subtasks: [],
      },
      ...tasks,
    ]);
  };

  useEffect(() => {
    setProjects((projects: any) => {
      return projects.map((p: any) => {
        if (p.id !== project.id) return p;
        return {
          ...p,
          tasks,
        };
      });
    });
  }, [tasks]);

  useEffect(() => {
    setTasks(project.tasks);
  }, [project.id]);

  return (
    <div className="flex flex-col items-start gap-4 pl-[5rem]">
      <div
        className="flex items-center gap-4 pb-4 -ml-10 text-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.button {...buttonAnimation(isHovered)} onClick={handleDelete}>
          <TiDeleteOutline className="text-red-500" />
        </motion.button>
        <input
          className="text-4xl bg-transparent outline-none w-max"
          placeholder="Untitled"
          value={project.title}
          maxLength={20}
          onChange={handleChange}
        />
      </div>

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
