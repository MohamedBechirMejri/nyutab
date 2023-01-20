import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import _2048 from "./Games/2048";
import Minesweeper from "./Games/Minesweeper/Minesweeper";
import ReflexChallenge from "./Games/ReflexChallenge/ReflexChallenge";
import WordSearch from "./Games/WordSearch/WordSearch";
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
          initial={{ scale: 0.5, x: 50, opacity: 0, borderRadius: "1rem" }}
          animate={{ scale: 1, x: 0, opacity: 1, borderRadius: "1.5rem" }}
          whileTap={{ scale: 0.95, borderRadius: "1.5rem" }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="absolute z-40 p-2 px-8 text-3xl font-bold top-8 left-[1.5rem] bg-fuchsia-500 bg-opacity-25 text-fuchsia-500 "
          onClick={() =>
            setOverlay((overlay: string) => {
              return /sudoku|countries|minesweeper|wordsearch|reflexchallenge|2048|wordle/.test(
                overlay
              )
                ? "games"
                : /calculator|tasks|awesome|breathing/.test(overlay)
                ? "tools"
                : "";
            })
          }
        >
          <IoArrowBackCircle />
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
          {overlay === "wordsearch" && <WordSearch />}
          {overlay === "sudoku" && <Sudoku />}
          {overlay === "minesweeper" && <Minesweeper />}
          {overlay === "reflexchallenge" && <ReflexChallenge />}
          {overlay === "2048" && <_2048 />}

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
