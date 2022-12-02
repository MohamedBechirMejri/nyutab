import Picker from "./Picker";

const Field = ({
  i,
  initialPuzzle,
  field,
  setPuzzle,
}: {
  i: number;
  initialPuzzle: any;
  field: number;
  setPuzzle: any;
}) => {
  const showTopBorder = (i >= 54 && i <= 62) || (i >= 27 && i <= 35);
  const showBottomBorder = (i >= 45 && i <= 53) || (i >= 18 && i <= 26);
  const showRightBorder = !((i + 7) % 9) || !((i + 4) % 9);
  const showLeftBorder = !((i + 6) % 9) || !((i + 3) % 9);

  return (
    <div
      key={"field-" + i}
      className={`relative flex items-center justify-center transition-all border group from-white to-gray-200 ${
        initialPuzzle![i] !== null ? "bg-gray-300" : "bg-gradient-to-br"
      } `}
      style={{
        borderTopColor: showTopBorder ? "#999" : "#ccc",
        borderBottomColor: showBottomBorder ? "#999" : "#ccc",
        borderRightColor: showRightBorder ? "#999" : "#ccc",
        borderLeftColor: showLeftBorder ? "#999" : "#ccc",
        borderTopLeftRadius: i === 0 ? "1rem" : 0,
        borderTopRightRadius: i === 8 ? "1rem" : 0,
        borderBottomLeftRadius: i === 72 ? "1rem" : 0,
        borderBottomRightRadius: i === 80 ? "1rem" : 0,
      }}
    >
      <p>{field !== null && field + 1}</p>

      {initialPuzzle![i] === null ? (
        <Picker field={field} i={i} setPuzzle={setPuzzle} />
      ) : null}
    </div>
  );
};

export default Field;
