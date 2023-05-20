import { motion } from "framer-motion";

const Greeting = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 text-3xl font-bold tracking-wide text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Hello, Thank you for using this extension, I hope you'll love it.</h1>
      <p>But first, let's set up a few things..</p>
    </motion.div>
  );
};

export default Greeting;
