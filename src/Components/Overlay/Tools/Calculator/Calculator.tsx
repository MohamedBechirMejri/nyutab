import Keypad from "./Keypad";

const Calculator = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="grid grid-rows-[1fr,3fr] max-h-screen overflow-hidden border-4 border-[#2b424677] shadow-xl rounded-xl w-[min(30rem,95vw)] h-[min(50rem,95vh)]">
        <div className="bg-[#253438] bg-opacity-60 backdrop-blur-3xl"></div>
        <Keypad />
      </div>
    </div>
  );
};

export default Calculator;
