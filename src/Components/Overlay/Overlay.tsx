import { IoClose } from "react-icons/io5";
import BreathingExercise from "./Tools/BreathingExercise";
import { motion } from "framer-motion";
import Setup from "./Settings/Setup/Setup";
import Settings from "./Settings/Settings";
import Calculator from "./Tools/Calculator/Calculator";
import TodoList from "./Tools/TodoList/TodoList";
import Memes from "./Memes";
// import Awesome from "./Tools/Awesome";

import Sudoku from "./Games/Sudoku/Sudoku";
import Countries from "./Games/Countries/Countries";
import Feed from "./Feed/Feed";

const Overlay = ({
  overlay,
  setOverlay,
  setSettings,
}: {
  overlay: any;
  setOverlay: any;
  setSettings: any;
}) => {
  return (
    <motion.div className="absolute z-50 w-full h-full origin-top p-14">
      {overlay !== "setup" && (
        <motion.button
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          whileHover={{ rotate: 90, scale: 1.5 }}
          whileTap={{ scale: 0.5 }}
          className="absolute text-4xl top-6 right-6"
          onClick={() => setOverlay("")}
        >
          <IoClose />
        </motion.button>
      )}

      <motion.div
        className="w-full h-full bg-inherit rounded-xl "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "anticipate", duration: 0.3 }}
      >
        {overlay === "setup" && (
          <Setup setSettings={setSettings} setOverlay={setOverlay} />
        )}
        {overlay === "settings" && (
          <Settings setSettings={setSettings} setOverlay={setOverlay} />
        )}
        {overlay === "memes" && <Memes />}

        {overlay === "feed" && <Feed />}

        {overlay === "breathing exercise" && <BreathingExercise />}
        {overlay === "calculator" && <Calculator />}
        {overlay === "tasks" && <TodoList />}
        {/* {overlay === "awesome" && <Awesome />} */}

        {overlay === "sudoku" && <Sudoku />}
        {overlay === "countries" && <Countries />}
      </motion.div>
    </motion.div>
  );
};

export default Overlay;
