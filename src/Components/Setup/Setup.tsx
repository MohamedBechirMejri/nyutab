import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { FAVORITES, THEMES } from "./defaults";
import Theme from "./Theme";

const Setup = () => {
  const [favorites, setFavorites] = useState(FAVORITES);

  const [theme, SetTheme] = useState(THEMES[0]);

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
    <motion.div
      initial={{
        scaleY: 0,
      }}
      animate={{
        scaleY: 1,
      }}
      transition={{
        delay: 0.5,
      }}
      className="w-full flex justify-center items-center h-full flex-col gap-32 pt-8 bg-slate-600 rounded-xl shadow-2xl relative"
    >
      {/* <h1 className="absolute top-8 left-8 text-xl">
        Hello, Let's setup your Homepage..
      </h1> */}
      <Theme theme={theme} setTheme={SetTheme} />
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
    </motion.div>
  );
};

export default Setup;
