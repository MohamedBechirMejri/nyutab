import { IoClose } from "react-icons/io5";
import BreathingExercise from "./Tools/BreathingExercise";
import { motion } from "framer-motion";

const Overlay = ({
  overlay,
  setOverlay,
}: {
  overlay: any;
  setOverlay: any;
}) => {
  return (
    <motion.div className="w-full h-full p-14 absolute z-50 origin-top">
      <button
        className="text-4xl absolute top-6 right-6 hover:rotate-180 transition-all duration-300 active:scale-90"
        onClick={() => setOverlay("")}
      >
        <IoClose />
      </button>
      <motion.div
        className="w-full h-full bg-slate-900 rounded-xl "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          ease: "anticipate",
          duration: 0.3,
        }}
      >
        {overlay === "breathing exercise" && <BreathingExercise />}
      </motion.div>
    </motion.div>
  );
};

export default Overlay;
