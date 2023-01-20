import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getRandomNumber } from "../../../../lib/mathUtils";

const ReflexChallenge = () => {
  const [target, setTargetCoords] = useState({ x: 50, y: 50 });

  const moveTarget = () => {
    setTargetCoords({
      x: getRandomNumber(70, 10),
      y: getRandomNumber(70, 10),
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveTarget();
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full pt-24 select-none">
      <motion.button
        initial={{
          position: "absolute",
          opacity: 0,
          left: target.x + "%",
          top: target.y + "%",
          x: -target.x + "%",
          y: -target.y + "%",
          backgroundColor: "#ef4444",
        }}
        animate={{
          opacity: 1,
          left: target.x + "%",
          top: target.y + "%",
          x: -target.x + "%",
          y: -target.y + "%",
        }}
        whileTap={{ scale: 0.9, backgroundColor: "#22c55e" }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="absolute w-[5rem] h-[5rem] bg-red-500 rounded-full"
      />
    </div>
  );
};

export default ReflexChallenge;
