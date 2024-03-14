import { Suspense, useState } from "react";
import Marquee from "react-fast-marquee";
import { getRandomFact, getRandomQuote } from "../../lib/localDataUtils";
import { AnimatePresence, motion } from "framer-motion";

const FactsAndQuotes = () => {
  const [isQuote, setIsQuote] = useState(false);

  const toggleQuote = () => {
    setIsQuote(isQuote => !isQuote);
  };

  const text = isQuote ? (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {getRandomQuote().text}
    </motion.p>
  ) : (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {getRandomFact().text}
    </motion.p>
  );

  return (
    <Suspense fallback="...">
      <Marquee>
        <AnimatePresence>{text}</AnimatePresence>
      </Marquee>
    </Suspense>
  );
};

export default FactsAndQuotes;
