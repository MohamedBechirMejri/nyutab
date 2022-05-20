import React, { useEffect } from "react";

const Quotes = () => {
  const [facts, setFacts] = React.useState([
    {
      id: 1,
      text: '"If life were predictable it would cease to be life and be without flavor."',
      author: "-Eleanor Roosevelt",
    },
    {
      id: 2,
      text: `"In the end, it's not the years in your life that count. It's the life in your years."`,
      author: "-Abraham Lincoln",
    },
    {
      id: 3,
      text: '"Life is a succession of lessons which must be lived to be understood."',
      author: "-Ralph Waldo Emerson",
    },
  ]);
  const [fact, setFact] = React.useState({
    id: 1,
    text: "",
    author: "",
  });
  useEffect(() => {
    setFact(facts[Math.floor(Math.random() * facts.length)]);
  }, [facts]);

  return (
    <div className="rounded-lg w-full p-3 text-2xl font-medium bg-[#C4C4C4] flex flex-col items-center justify-center transition-all gap-2 dark:bg-slate-800 dark:bg-transparent dark:text-white font-serif">
      <p className="w-full text-sm text-left">{fact.text}</p>
      <p className="w-full text-xs text-right">{fact.author}</p>
    </div>
  );
};

export default Quotes;
