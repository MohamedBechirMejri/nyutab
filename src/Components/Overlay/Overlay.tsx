import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

const Setup = lazy(() => import("./Settings/Setup/Setup"));
const Settings = lazy(() => import("./Settings/Settings"));
const Memes = lazy(() => import("./Memes"));
const Feed = lazy(() => import("./Feed/Feed"));
const Games = lazy(() => import("./Games/Games"));

// import Awesome from "./Tools/Awesome";
const BreathingExercise = lazy(() => import("./Tools/BreathingExercise"));
// const Calculator = lazy(() => import("./Tools/Calculator/Calculator"));
const TodoList = lazy(() => import("./Tools/TodoList/TodoList"));

const Sudoku = lazy(() => import("./Games/Sudoku/Sudoku"));
const Countries = lazy(() => import("./Games/Countries/Countries"));

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
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.5 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="absolute p-2 px-4 text-xl font-bold top-6 left-20 bg-gradient-to-br from-slate-100 to-slate-200 text-fuchsia-600 rounded-2xl"
          onClick={() => setOverlay("")}
        >
          back
        </motion.button>
      )}

      <motion.div
        className="w-full h-full bg-inherit rounded-xl "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "anticipate", duration: 0.3 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          {overlay === "setup" && (
            <Setup setSettings={setSettings} setOverlay={setOverlay} />
          )}
          {overlay === "settings" && (
            <Settings setSettings={setSettings} setOverlay={setOverlay} />
          )}
          {overlay === "memes" && <Memes />}

          {overlay === "feed" && <Feed />}

          {overlay === "breathing exercise" && <BreathingExercise />}
          {/* {overlay === "calculator" && <Calculator />} */}
          {overlay === "tasks" && <TodoList />}
          {/* {overlay === "awesome" && <Awesome />} */}

          {overlay === "sudoku" && <Sudoku />}
          {overlay === "countries" && <Countries />}

          {overlay === "games" && <Games setOverlay={setOverlay} />}
        </Suspense>
      </motion.div>
    </motion.div>
  );
};

export default Overlay;
