import { motion } from "framer-motion";

const Greeting = () => {
  return (
    <motion.div
      className="flex items-center justify-center flex-col text-5xl font-[GreatVibes] tracking-wide font-light gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className=" ">
        Hello, Thank you for using this extension, I hope you'll love it.
      </h1>
      <p>But first, let's set up a few things..</p>
    </motion.div>
  );
};

export default Greeting;
