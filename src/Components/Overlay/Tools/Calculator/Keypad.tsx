const Keypad = () => {
  const keys = [
    "AC",
    "()",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "<-",
    "=",
  ];
  return (
    <div className="grid grid-cols-4 grid-rows-5 bg-[#181c1d] font-[FiraCode]">
      {keys.map(key => (
        <div className="p-2 py-6">
          <button
            className="w-full h-full text-3xl rounded-[50px] active:rounded-3xl transition-all shadow-xl backdrop-blur-3xl"
            style={{
              backgroundColor:
                (key === "AC"
                  ? "#3c4466"
                  : key === "="
                  ? "#004f5d"
                  : /\(\)|%|÷|×|^-|\+/.test(key)
                  ? "#304b50"
                  : "#1d2527") + "cc",
              color:
                key === "AC" ? "#dbe2ff" : key === "=" ? "#a2effe" : "#cbe7ee",
            }}
          >
            {key}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Keypad;
