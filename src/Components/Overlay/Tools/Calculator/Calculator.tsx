import { useState } from "react";
import Keypad from "./Keypad";

const Calculator = () => {
  const [expression, setExpression] = useState("");

  return (
    <div className="flex items-center justify-center w-full h-full font-[FiraCode]">
      <div className="grid grid-rows-[1fr,3fr] overflow-hidden shadow-3xl rounded-xl w-[min(30rem,95vw)] h-[min(50rem,95vh)] border border-[#2b424677] bg-[#171b1c]">
        <div className="bg-[#253438] bg-opacity-60 backdrop-blur-3xl p-4 shadow-xl rounded-lg overflow-x-scroll selection:bg-[#34717c] w-full scroll">
          <p className="w-max"> {expression}</p>
        </div>
        <Keypad setExpression={setExpression} />
      </div>
    </div>
  );
};

export default Calculator;
