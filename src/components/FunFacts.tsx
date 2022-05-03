import React, { useEffect } from "react";

const FunFacts = () => {
  const [facts, setFacts] = React.useState([
    {
      id: 1,
      text: "I am a full stack developer",
    },
    {
      id: 2,
      text: "hellllooo",
    },
    {
      id: 3,
      text: "hhihihihihihi",
    },
  ]);
  const [fact, setFact] = React.useState({
    id: 1,
    text: "",
  });
  useEffect(() => {
    setFact(facts[Math.floor(Math.random() * facts.length)]);
  }, [facts]);

  return (
    <div className="rounded-lg w-max p-3 text-2xl font-medium bg-[#C4C4C4] flex flex-col items-center justify-center transition-all gap-2">
      <h1>Fun Fact</h1>
      <p key={fact.id}>{fact.text}</p>
    </div>
  );
};

export default FunFacts;
