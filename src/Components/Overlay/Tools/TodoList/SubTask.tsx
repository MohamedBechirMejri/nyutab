import { motion } from "framer-motion";
import { useState } from "react";
import { MdOutlineCheckCircle } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import Project from "../../../../Types/Todos";

const Subtask = ({
  taskId,
  subtask,
  id,
  currentProject,
  setProjects,
}: {
  taskId: number;
  subtask: any;
  id: number;
  currentProject: number;
  setProjects: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonAnimation = {
    initial: { opacity: 0, x: -4, scale: 0 },
    animate: {
      opacity: isHovered ? 1 : 0,
      y: isHovered ? 0 : -25,
      scale: isHovered ? 1.1 : 0,
    },
    whileHover: { scale: 1.25 },
    whileTap: { scale: 1 },
  };

  const removeSubtask = () => {
    setProjects((projects: Project[]) => {
      const newProjects = projects;
      const { subtasks } = newProjects[currentProject].tasks[taskId];
      newProjects[currentProject].tasks[taskId].subtasks = subtasks.filter(
        (s, i) => i !== id
      );

      return [...newProjects];
    });
  };
  return (
    <li
      key={"subtask-" + id}
      className="flex gap-4 -ml-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex gap-4 text-2xl transition-all -left-16">
        <motion.button {...buttonAnimation} onClick={removeSubtask}>
          <TiDeleteOutline className="text-red-500" />
        </motion.button>
        <motion.button {...buttonAnimation}>
          <MdOutlineCheckCircle className="text-blue-500" />
        </motion.button>
      </motion.div>
      <input
        type="text"
        value={subtask.text}
        className="w-full bg-transparent border-none outline-none focus:ring-0"
        onChange={e =>
          setProjects((projects: Project[]) => {
            const newProjects = projects;
            newProjects[currentProject].tasks[taskId].subtasks[id].text =
              e.target.value;
            return [...newProjects];
          })
        }
      />
    </li>
  );
};

export default Subtask;
