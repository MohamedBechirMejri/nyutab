import { getRandomFact } from "lib/localDataUtils";
import { useEffect, useState } from "react";
import facts from "db/facts.json";

const FunFacts = ({ className }: { className?: string }) => {
  const [fact, setFact] = useState({
    id: 1,
    text: "You're Awesome",
  });
  useEffect(() => {
    if (facts.length) setFact(getRandomFact());
  }, [facts]);

  return (
    <p
      className={`w-full p-3 font-medium text-center transition-all rounded-lg justify-center gap-2 center ${className}`}
      key={fact.id}
    >
      <span className="text-slate-400">Did You Know? </span>
      {fact.text}
    </p>
  );
};

export default FunFacts;
