import { motion } from "framer-motion";
import { useState } from "react";
import { MdOutlineCheckCircle } from "react-icons/md";
import { TiDeleteOutline, TiPlusOutline } from "react-icons/ti";
import Subtask from "./SubTask";

const Task = ({
  task,
  setProjects,
  setTasks,
}: {
  task: any;
  setProjects: any;
  setTasks: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [subtasks, setSubtasks] = useState(task.subtasks);

  const buttonAnimation = {
    initial: { opacity: 0, x: -15, scale: 0 },
    animate: {
      opacity: isHovered ? 1 : 0,
      x: isHovered ? 0 : -15,
      scale: isHovered ? 1.1 : 0,
    },
    whileHover: { scale: 1.25 },
    whileTap: { scale: 1 },
  };

  const handleAdd = () => {
    //   setSubtasks([{ isCompleted: false, text: "" }, ...subtasks]);
    //   setProjects((projects: Project[]) => {
    //     const newProjects = projects;
    //     newProjects[currentProject].tasks[id].subtasks = subtasks;
    //     return [...newProjects];
    //   });
  };

  const handleChange = (e: any) => {
    setTasks((tasks: any) => {
      // @ts-ignore
      const { value } = e.target;

      return tasks.map((t: any) => {
        if (task.id !== t.id) return t;
        return {
          ...task,
          title: value,
        };
      });
    });
  };

  return (
    <div key={task.id}>
      <div
        className="flex items-center gap-4 pb-4 -ml-32 text-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-4">
          <motion.button {...buttonAnimation} onClick={handleAdd}>
            <TiPlusOutline className="text-green-500" />
          </motion.button>
          <motion.button
            {...buttonAnimation}
            // onClick={handleDelete}
          >
            <TiDeleteOutline className="text-red-500" />
          </motion.button>
          <motion.button
            {...buttonAnimation}
            // onClick={handleToggle}
          >
            <MdOutlineCheckCircle className="text-blue-500" />
          </motion.button>
        </div>{" "}
        <input
          type="text"
          value={task.title}
          placeholder="What should I do next?"
          onChange={handleChange}
          className={`w-full bg-transparent border-none outline-none focus:ring-0 ${
            task.isCompleted ? `line-through text-gray-500` : ""
          }`}
        />
      </div>
      <ul className="flex flex-col gap-4">
        {task.subtasks.map((subtask: any, subtaskIndex: any) => (
          <Subtask
            key={"Subtask-" + subtaskIndex}
            subtask={subtask}
            setProjects={setProjects}
          />
        ))}
      </ul>
    </div>
  );
};

export default Task;
