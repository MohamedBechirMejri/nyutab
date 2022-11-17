import React, { useEffect } from "react";
import factsData from "../../db/facts.json";

const FunFacts = ({ className }: { className?: string }) => {
  const [facts, setFacts] = React.useState(factsData);
  const [fact, setFact] = React.useState({
    id: 1,
    text: "You're Awesome",
  });
  useEffect(() => {
    if (facts.length)
      //? +20 so sometimes it returns undefined and shows you're awesome fact :)
      setFact(
        facts[Math.floor(Math.random() * (facts.length + 20))] || {
          id: 1920,
          text: "You're Awesome",
        }
      );
  }, [facts]);

  return (
    <p
      className={`w-full p-3 font-medium text-center transition-all rounded-lg justify-center gap-2 dark:text-white center ${className}`}
      key={fact.id}
    >
      <span className="text-slate-400">Did You Know? </span>
      {fact.text}
    </p>
  );
};

export default FunFacts;
