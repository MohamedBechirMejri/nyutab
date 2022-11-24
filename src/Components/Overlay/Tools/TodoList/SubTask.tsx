import { motion } from "framer-motion";
import { useState } from "react";
import { MdOutlineCheckCircle } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";

const Subtask = ({ subtask, id }: { subtask: any; id: number }) => {
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
  return (
    <li
      key={"subtask-" + id}
      className="flex gap-4 -ml-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex gap-4 text-2xl transition-all -left-16">
        <motion.button {...buttonAnimation}>
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
      />
    </li>
  );
};

export default Subtask;
