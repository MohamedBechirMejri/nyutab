import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Nav = () => {
  const buttonAnimation = {
    initial: {
      scale: 1,
    },
    whileHover: {
      x: [0, -5, 0, -5, 0],
    },
    whileTap: {
      scale: 0.65,
    },
  };

  return (
    <div className="flex items-center gap-24 text-4xl">
      <motion.button {...buttonAnimation}>
        <IoIosArrowBack />
      </motion.button>
      <motion.button
        {...buttonAnimation}
        whileHover={{
          x: [0, 5, 0, 5, 0],
        }}
      >
        <IoIosArrowForward />
        {/* <IoCheckmark /> */}
      </motion.button>
    </div>
  );
};

export default Nav;
