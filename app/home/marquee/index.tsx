import M from "react-fast-marquee";
import { useMemo } from "react";
import { getFactsAndQuotes } from "lib/localDataUtils";

const Marquee = () => {
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
    <M pauseOnHover className="bg-black p-0 bg-opacity-25 backdrop-blur h-max">
      <p className="flex gap-[5rem] cursor-default h-full bg-black p-2">
        {FAQ}
      </p>
    </M>
  );
};

export default Marquee;
