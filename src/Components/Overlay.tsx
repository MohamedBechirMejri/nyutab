import { IoClose } from "react-icons/io5";
import BreathingExercise from "./Tools/BreathingExercise";
import { motion } from "framer-motion";
import Setup from "./Setup/Setup";

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
    <motion.div className="w-full h-full p-14 absolute z-50 origin-top">
      {overlay !== "setup" && (
        <motion.button
          initial={{
            scale: 0.5,
          }}
          animate={{
            scale: 1,
          }}
          whileHover={{
            rotate: 90,
            scale: 1.5,
          }}
          whileTap={{
            scale: 0.5,
          }}
          className="text-4xl absolute top-6 right-6"
          onClick={() => setOverlay("")}
        >
          <IoClose />
        </motion.button>
      )}

      <motion.div
        className="w-full h-full bg-inherit rounded-xl "
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
        {overlay === "setup" && (
          <Setup setSettings={setSettings} setOverlay={setOverlay} />
        )}
        {overlay === "breathing exercise" && <BreathingExercise />}
      </motion.div>
    </motion.div>
  );
};

export default Overlay;
