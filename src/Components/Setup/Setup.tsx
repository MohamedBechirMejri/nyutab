import { motion } from "framer-motion";
import { useState } from "react";
import { FAVORITES, THEMES } from "./defaults";
import Theme from "./Theme";
import Nav from "./Nav";

const Setup = () => {
  const [favorites, setFavorites] = useState(FAVORITES);
  const [theme, SetTheme] = useState(THEMES[0]);

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
      <Nav />
    </motion.div>
  );
};

export default Setup;
