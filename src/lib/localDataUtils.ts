import facts from "../db/facts.json";
import quotes from "../db/quotes.json";

export const getRandomFact = () => {
  return (
    //? +20 so sometimes it returns undefined and shows you're awesome fact :)
    facts[Math.floor(Math.random() * (facts.length + 20))] || {
      id: 1920,
      text: "You're Awesome",
    }
  );
};

export const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};
