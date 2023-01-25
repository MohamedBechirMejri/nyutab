import { motion } from "framer-motion";

const Letter = ({ letter }: { letter: string | null }) => {
  return (
    <motion.div
      initial={{}}
      animate={{
        backgroundColor: "rgb(56,189,248)",
        backgroundImage:
          "linear-gradient(0deg, rgba(56,189,248,0) 0%, rgba(56,189,248,1) 100%)",
      }}
      className="h-[5.5rem] border border-sky-200"
    >
      <p className="flex items-center justify-center w-full h-full text-xl font-bold">
        {letter ?? "•"}
      </p>
    </motion.div>
  );
};

export default Letter;
