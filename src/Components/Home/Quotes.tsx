import React, { useEffect } from "react";
import quotesData from "../../db/quotes.json";

const Quotes = ({ className }: { className?: string }) => {
  const [quotes, setQuotes] = React.useState(quotesData);
  const [quote, setQuote] = React.useState({
    text: "",
    author: "",
  });
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [quotes]);

  return (
    <div
      className={`flex flex-col items-center justify-center w-full gap-4 p-3 font-serif text-2xl font-medium transition-all rounded-lg dark:text-white ${className} max-w-lg `}
    >
      <p className="w-full text-sm text-left">{quote.text}</p>
      <p className="w-full text-xs text-right">{quote.author}</p>
    </div>
  );
};

export default Quotes;
