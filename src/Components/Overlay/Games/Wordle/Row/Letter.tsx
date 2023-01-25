import { motion } from "framer-motion";

const Letter = ({
  letter,
  i,
  j,
}: {
  letter: string | null;
  i: number;
  j: number;
}) => {
  return (
    <div className="h-[5.5rem] border border-sky-200 bg-gradient-to-b from-sky-400">
      <p className="flex items-center justify-center w-full h-full text-xl font-bold">
        {letter ? (
          <motion.span
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
          >
            {letter}
          </motion.span>
        ) : (
          <span>•</span>
        )}
      </p>
    </div>
  );
};

export default Letter;
