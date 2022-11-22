const Keypad = ({ setExpression }: { setExpression: any }) => {
  const keys = [
    "AC",
    "()",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
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
  const clear = () => {
    setExpression("");
  };
  const deleteLastChar = () => {
    setExpression((expression: string) =>
      expression.substring(0, expression.length - 1)
    );
  };
  const addKey = (key: string) => {
    setExpression((expression: string) => {
      const length = expression.length;
      const lastChar = expression.charAt(length - 1);

      const newExp =
        (/%|\/|\*|^-|\+/.test(key) && /%|\/|\*|^-|\+/.test(lastChar)
          ? expression.substring(0, length - 1)
          : expression) + key;

      return /%|\/|\*|\+/.test(newExp.charAt(0)) ? 0 + newExp : newExp;
    });
  };

  const handleClick = (key: string) => {
    if (key === "AC") return clear();
    if (key === "()") return;
    if (key === "%") return;
    if (key === "=") return; // TODO: save expression and result to history
    if (key === "<-") return deleteLastChar();
    addKey(key);
  };
  return (
    <div className="grid grid-cols-4 grid-rows-5 bg-[#181c1d] p-4 select-none">
      {keys.map(key => (
        <div className="p-2 py-6" key={key}>
          <button
            className="w-full h-full text-3xl rounded-[50px] active:rounded-3xl transition-all shadow-xl backdrop-blur-3xl"
            style={{
              backgroundColor:
                (key === "AC"
                  ? "#3c4466"
                  : key === "="
                  ? "#004f5d"
                  : /\(\)|%|\/|\*|^-|\+/.test(key)
                  ? "#304b50"
                  : "#1d2527") + "cc",
              color:
                key === "AC" ? "#dbe2ff" : key === "=" ? "#a2effe" : "#cbe7ee",
            }}
            onClick={() => {
              handleClick(key);
            }}
          >
            {key === "*" ? "×" : key === "/" ? "÷" : key}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Keypad;
