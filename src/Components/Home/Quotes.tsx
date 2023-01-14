import React, { useEffect } from "react";
import quotes from "../../db/quotes.json";

const Quotes = ({ className }: { className?: string }) => {
  const [quote, setQuote] = React.useState({
    text: "",
    author: "",
  });
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [quotes]);

  return (
    <div
      className={`flex flex-col items-center justify-center w-full gap-2 p-3 font-serif text-xl transition-all rounded-lg ${className} max-w-lg font bold `}
    >
      <blockquote className="italic">"{quote.text}"</blockquote>
      <p className="w-full text-base text-right">- {quote.author}</p>
    </div>
  );
};

export default Quotes;
