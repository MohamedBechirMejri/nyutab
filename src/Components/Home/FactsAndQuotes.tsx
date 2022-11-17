import { useEffect, useState } from "react";
import FunFacts from "./FunFacts";
import Quotes from "./Quotes";

const FactsAndQuotes = () => {
  const [isQuote, setIsQuote] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsQuote((isQuote) => !isQuote);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return isQuote ? (
    <Quotes className="absolute transition-all -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 animate-fadeIn" />
  ) : (
    <FunFacts className="absolute transition-all -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 animate-fadeIn" />
  );
};

export default FactsAndQuotes;
