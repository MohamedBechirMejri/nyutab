import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BreathingExercise = () => {
  const [breathing, setBreathing] = useState("out");

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
    <div className="w-full flex justify-center items-center h-full flex-col gap-8 pt-8">
      {/* <head>
        <link
          href="https://fonts.googleapis.com/css?family=Caveat:400,700&display=swap"
          rel="stylesheet"
        />
      </head> */}

      <motion.div
        animate={{
          rotate: 360,
          scale: breathing === "in" ? 1.5 : 0.5,
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

      <h1 className="z-10">Breathe {breathing}</h1>

      {/* <div className="description">
        <p>
          Anxiety is a normal, although unpleasant, part of life, and it can
          affect us in different ways and at different times of the day. Whereas
          stress is something that will come and go and it's all in how we
          handle those stressful moments.
        </p>
        <p>
          This simple exercise can help ease anxiety and stop it becoming
          overwhelming, however it's worth practicing for several minutes.
        </p>
        <p>
          Furthermore your breathing can contribute to your anxiety and panic,
          most people aren't really conscious of the way they're breathing, but
          generally, there are two types of breathing patterns:
        </p>
        <ul>
          <li>Thoracic (chest) breathing</li>
          <li>Diaphragmatic (abdominal) breathing</li>
        </ul>

        <p>
          Chest breathing causes an upset in the oxygen and carbon dioxide
          levels in the body resulting in increased heart rate, dizziness,
          muscle tension, and other physical sensations. Whereas during
          abdominal or diaphragmatic breathing, you take even, deep breaths.
        </p>
        <p>
          This is actually the way newborn babies naturally breathe and you're
          also probably using this kind of breathing when you're in deep sleep.
        </p>
      </div> */}
    </div>
  );
};

export default BreathingExercise;
