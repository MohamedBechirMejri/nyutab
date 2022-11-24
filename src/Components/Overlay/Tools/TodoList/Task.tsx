import { motion } from "framer-motion";
import { MdOutlineCheckCircle } from "react-icons/md";
import { TiDeleteOutline, TiPlusOutline } from "react-icons/ti";
import Subtask from "./SubTask";

const Task = ({
  task,
  id,
  currentProject,
  setProjects,
}: {
  task: any;
  id: number;
  currentProject: number;
  setProjects: any;
}) => {
  const buttonAnimation = {
    initial: { opacity: 1, x: -54, scale: 0 },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    whileHover: { scale: 1.25 },
    whileTap: { scale: 1 },
  };
  return (
    <div key={"task-" + id}>
      <div className="flex items-center gap-4 pb-4 text-2xl">
        <h2> {task.title}</h2>
        <div className="flex gap-4">
          <motion.button
            {...buttonAnimation}
            // onClick={handleDelete}
          >
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
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {task.subtasks.map((subtask: any, subtaskIndex: any) => (
          <Subtask
            key={"Subtask-" + subtaskIndex}
            subtask={subtask}
            id={subtaskIndex}
            taskId={id}
            currentProject={currentProject}
            setProjects={setProjects}
          />
        ))}
      </ul>
    </div>
  );
};

export default Task;
