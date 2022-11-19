import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineSmile } from "react-icons/ai";

const BreathingExercise = () => {
  const [breathing, setBreathing] = useState("out");
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setBreathing(breathing => (breathing === "in" ? "out" : "in"));
      },
      breathing === "in" ? 5000 : 6000
    );

    return () => clearInterval(interval);
  }, [breathing]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-8 pt-8">
      <motion.div
        animate={{
          rotate: 360,
          scale: breathing === "in" ? 1.5 : 0.5,
          opacity: showInfo ? 0 : 0.7,
        }}
        transition={{
          rotate: { ease: "linear", duration: 4, repeat: Infinity },
          scale: { ease: "easeInOut", duration: 4 },
        }}
        className="absolute rotate-45 opacity-50"
        style={{
          borderRadius: "63% 37% 67% 33% / 49% 41% 59% 51%",
          width: "15rem",
          height: "15rem",
          background: "#FF0099",
          backgroundImage: "linear-gradient(45deg,#3023AE 0%,#00FF99 100%)",
        }}
      />
      <motion.div
        animate={{
          rotate: 360,
          scale: breathing === "in" ? 1.5 : 0.5,
          opacity: showInfo ? 0 : 0.7,
        }}
        transition={{
          rotate: { ease: "linear", duration: 7, repeat: Infinity },
          scale: { ease: "easeInOut", duration: 4 },
        }}
        className="absolute opacity-50"
        style={{
          borderRadius: "63% 37% 67% 33% / 49% 41% 59% 51%",
          width: "15rem",
          height: "15rem",
          background: "#FF0099",
          backgroundImage: "linear-gradient(45deg,#3023AE 0%,#FF0099 100%)",
        }}
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: breathing === "in" ? 1.5 : 0.5,
          opacity: showInfo ? 0 : 0.7,
        }}
        transition={{
          rotate: { ease: "linear", duration: 5, repeat: Infinity },
          scale: { ease: "easeInOut", duration: 4 },
        }}
        className="absolute rotate-90 opacity-50"
        style={{
          borderRadius: "63% 37% 67% 33% / 49% 41% 59% 51%",
          width: "15rem",
          height: "15rem",
          background: "#FF0099",
          backgroundImage: "linear-gradient(45deg,#3023AE 0%,#0660FF 100%)",
        }}
      />

      <motion.h1
        className="z-10 "
        animate={{
          opacity: showInfo ? 0 : 1,
        }}
      >
        Breathe {breathing}
      </motion.h1>

      <motion.button
        whileTap={{
          scale: 0.9,
        }}
        className="absolute text-4xl bottom-8 right-8"
        onClick={() => setShowInfo(showInfo => !showInfo)}
      >
        <AiOutlineSmile />
      </motion.button>

      <motion.div
        initial={{
          // transform: "translate(-50%,-50%) scaleY(0)",
          x: "-50%",
          y: "-50%",
          scaleY: 0,
          scaleX: 0,
        }}
        animate={{
          // transform: `translate(-50%,-50%) scaleY(${
          //   showInfo ? 1 : 0.1
          // }) scaleX(${showInfo ? 1 : 0})`,
          x: "-50%",
          y: "-50%",
          scaleY: showInfo ? [0, 1, 1, 1] : [1, 0.005, 0],
          scaleX: showInfo ? 1 : [1, 1, 1, 0.5, 0.1, 0],
        }}
        className="absolute w-[min(800px,100vw)] h-[90vh] font-[GreatVibes] font-light text-4xl overflow-scroll noscroll bg-[#1da0f254] z-20 flex flex-col gap-4 text-white p-4 rounded shadow-xl top-1/2 left-1/2 backdrop-blur-2xl"
      >
        <p>
          • Anxiety is a normal, although unpleasant, part of life, and it can
          affect us in different ways and at different times of the day. Whereas
          stress is something that will come and go and it's all in how we
          handle those stressful moments.
        </p>
        <p>
          • This simple exercise can help ease anxiety and stop it becoming
          overwhelming, however it's worth practicing for several minutes.
        </p>
        <p>
          • Furthermore your breathing can contribute to your anxiety and panic,
          most people aren't really conscious of the way they're breathing, but
          generally, there are two types of breathing patterns:
        </p>
        <ul className="pl-4">
          <li>1 - Thoracic (chest) breathing</li>
          <li>2 - Diaphragmatic (abdominal) breathing</li>
        </ul>

        <p>
          • Chest breathing causes an upset in the oxygen and carbon dioxide
          levels in the body resulting in increased heart rate, dizziness,
          muscle tension, and other physical sensations. Whereas during
          abdominal or diaphragmatic breathing, you take even, deep breaths.
        </p>
        <p>
          • This is actually the way newborn babies naturally breathe and you're
          also probably using this kind of breathing when you're in deep sleep.
        </p>
      </motion.div>
    </div>
  );
};

export default BreathingExercise;
