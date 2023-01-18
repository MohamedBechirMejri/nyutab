import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import Tools from "./Tools/Tools";

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
    <motion.div className="absolute z-50 w-full h-full origin-top">
      {overlay !== "setup" && (
        <motion.button
          initial={{ scale: 0.5, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="absolute z-40 p-2 px-8 text-2xl font-bold top-8 left-[3.25rem] bg-fuchsia-500 bg-opacity-40 text-fuchsia-500 rounded-2xl"
          onClick={() =>
            setOverlay((overlay: string) => {
              return /sudoku|countries/.test(overlay)
                ? "games"
                : /calculator|tasks|awesome|breathing/.test(overlay)
                ? "tools"
                : "";
            })
          }
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
          {overlay === "memes" && <Memes />}

          {overlay === "games" && <Games setOverlay={setOverlay} />}
          {overlay === "countries" && <Countries />}
          {overlay === "sudoku" && <Sudoku />}

          {overlay === "tools" && <Tools setOverlay={setOverlay} />}
          {overlay === "breathing exercise" && <BreathingExercise />}
          {/* {overlay === "calculator" && <Calculator />} */}
          {overlay === "tasks" && <TodoList />}
          {/* {overlay === "awesome" && <Awesome />} */}

          {overlay === "feed" && <Feed />}

          {overlay === "settings" && (
            <Settings setSettings={setSettings} setOverlay={setOverlay} />
          )}
        </Suspense>
      </motion.div>
    </motion.div>
  );
};

export default Overlay;
