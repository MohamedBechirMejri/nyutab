import { useEffect, useRef, useState } from "react";
import { compile } from "mathjs";
import Keypad from "./Keypad";

// TODO: Add more expression options () sin sqrt...
// TODO: Add syntax checker

const Calculator = () => {
  const resultRef = useRef(null);

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(0);

  useEffect(() => {
    const lastChar = expression.charAt(expression.length - 1);
    if (!/%|\/|\*|^-|\+/.test(lastChar))
      setResult(compile(expression).evaluate());

    // @ts-ignore
    resultRef.current.scrollLeft = resultRef.current.scrollWidth;
  }, [expression]);

  return (
    <div className="flex items-center justify-center w-full h-full font-[FiraCode]">
      <div className="grid grid-rows-[1fr,3fr] overflow-hidden shadow-3xl rounded-xl w-[min(30rem,95vw)] h-[min(50rem,95vh)] border border-[#2b424677] bg-[#171b1c]">
        <div
          ref={resultRef}
          className="bg-[#253438] bg-opacity-60 backdrop-blur-3xl p-4 shadow-xl rounded-lg overflow-x-scroll selection:bg-[#34717c] w-full scroll grid grid-rows-2 text-right text-3xl items-end relative"
        >
          <h1 className="absolute opacity-50 top-2 left-4">
            Work In Progress!
          </h1>
          <p className="min-w-full w-max text-[#cbe7ee] text-5xl"> {result}</p>
          <p className="min-w-full w-max">
            {expression
              .replaceAll("*", " × ")
              .replaceAll("/", " / ")
              .replaceAll("+", " + ")
              .replaceAll("-", " - ")}
          </p>
        </div>
        <Keypad setExpression={setExpression} />
      </div>
    </div>
  );
};

export default Calculator;
