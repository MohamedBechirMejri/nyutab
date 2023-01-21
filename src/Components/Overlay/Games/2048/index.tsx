import { motion } from "framer-motion";

const X2048 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 pt-24 bg-slate-900 bg-opacity-70">
      <motion.div
        className="flex flex-col items-center justify-center w-full h-full gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "anticipate", duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold">2048</h1>
        <div className="relative grid grid-cols-4 grid-rows-4 gap-1">
          {Array(16)
            .fill(1)
            .map((_, i) => (
              <div className="flex items-center justify-center w-24 h-24 text-4xl font-bold bg-opacity-25 bg-fuchsia-500 text-fuchsia-500 rounded-xl">
                {i}
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};
export default X2048;
