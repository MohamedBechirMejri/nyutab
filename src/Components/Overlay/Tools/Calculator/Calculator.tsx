import { useEffect, useState } from "react";
import { compile } from "mathjs";
import Keypad from "./Keypad";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(0);

  useEffect(() => {
    const lastChar = expression.charAt(expression.length - 1);
    if (!/%|\/|\*|^-|\+/.test(lastChar))
      setResult(compile(expression).evaluate());
  }, [expression]);

  return (
    <div className="flex items-center justify-center w-full h-full font-[FiraCode]">
      <div className="grid grid-rows-[1fr,3fr] overflow-hidden shadow-3xl rounded-xl w-[min(30rem,95vw)] h-[min(50rem,95vh)] border border-[#2b424677] bg-[#171b1c]">
        <div className="bg-[#253438] bg-opacity-60 backdrop-blur-3xl p-4 shadow-xl rounded-lg overflow-x-scroll selection:bg-[#34717c] w-full scroll">
          <p className="w-max">
            {" "}
            {expression
              .replaceAll("*", " × ")
              .replaceAll("/", " / ")
              .replaceAll("+", " + ")
              .replaceAll("-", " - ")}
          </p>
          <p className="w-max"> {result}</p>
        </div>
        <Keypad setExpression={setExpression} />
      </div>
    </div>
  );
};

export default Calculator;
