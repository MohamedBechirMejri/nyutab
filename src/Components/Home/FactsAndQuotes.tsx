import Marquee from "react-fast-marquee";
import { getFactsAndQuotes } from "../../lib/localDataUtils";
import { useMemo } from "react";

const FactsAndQuotes = () => {
  const FAQ = useMemo(
    () =>
      getFactsAndQuotes().map(fq => (
        <span
          key={fq.uniqueIdentifier}
          className={`${fq.author ? "font-serif italic" : ""}`}
        >
          {fq.text} {fq.author ? `- ${fq.author}` : ""}
        </span>
      )),
    []
  );

  return (
    <Marquee
      pauseOnHover
      className="bg-black p-0 bg-opacity-25 backdrop-blur h-max"
    >
      <p className="flex gap-[5rem] cursor-default h-full bg-black p-2">
        {FAQ}
      </p>
    </Marquee>
  );
};

export default FactsAndQuotes;
