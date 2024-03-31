import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdOutlineCheckCircle } from "react-icons/md";
import { TiDeleteOutline, TiPlusOutline } from "react-icons/ti";
import uniqid from "uniqid";
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
    setSubtasks([{ id: uniqid(), isCompleted: false, text: "" }, ...subtasks]);
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
  const handleToggle = () => {
    setTasks((tasks: any) => {
      return tasks.map((t: any) => {
        if (task.id !== t.id) return t;
        return {
          ...task,
          isCompleted: !task.isCompleted,
          isFolded: !task.isCompleted,
        };
      });
    });
  };

  const handleDelete = () => {
    setTasks((tasks: any) => {
      return tasks.filter((t: any) => task.id !== t.id);
    });
  };

  useEffect(() => {
    setTasks((tasks: any) => {
      return tasks.map((t: any) => {
        if (t.id !== task.id) return t;
        return {
          ...t,
          subtasks,
        };
      });
    });
  }, [subtasks]);

  useEffect(() => {
    setSubtasks(task.subtasks);
  }, [task.id]);

  return (
    <div key={task.id}>
      <div
        className="flex items-center gap-4 pb-4 -ml-32 text-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-4">
          <m.button {...buttonAnimation} onClick={handleDelete}>
            <TiDeleteOutline className="text-red-500" />
          </m.button>

          <m.button {...buttonAnimation} onClick={handleToggle}>
            <MdOutlineCheckCircle className="text-blue-500" />
          </m.button>

          <m.button {...buttonAnimation} onClick={handleAdd}>
            <TiPlusOutline className="text-green-500" />
          </m.button>
        </div>
        <input
          type="text"
          value={task.title}
          placeholder="What should I do next?"
          onChange={handleChange}
          className={`w-full bg-transparent border-none outline-none text-2xl focus:ring-0 ${
            task.isCompleted ? `line-through text-gray-500` : ""
          }`}
        />
      </div>
      <AnimatePresence>
        {!task.isFolded && (
          <m.ul
            className="flex flex-col gap-4"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0, height: 0 }}
          >
            {subtasks.map((subtask: any) => (
              <Subtask
                key={subtask.id}
                subtask={subtask}
                setProjects={setProjects}
                setSubtasks={setSubtasks}
              />
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Task;
