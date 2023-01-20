import Button from "../Misc/Button";

const buttons = [
  {
    name: "Breathing Exercise",
    className: "row-span-2",
    color: "#14b8a6",
    overlay: "breathing exercise",
  },
  {
    name: "Calculator",
    soon: true,
    color: "#f97316",
    overlay: "calculator",
  },
  {
    name: "Todo List",
    soon: true,
    color: "#ef4444",
    overlay: "tasks",
  },
  {
    name: "Awesome Lists",
    soon: true,
    color: "#3b82f6",
    overlay: "awesome",
  },
];

const Tools = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <div className="flex flex-col items-center h-full overflow-y-scroll text-3xl font-bold bg-[#00000011] select-none noscroll p-8 pt-24">
      <div className="grid w-full h-full max-w-5xl gap-4 p-4 sm:grid-cols-3">
        {buttons.map((button, i) => (
          <Button button={button} i={i} setOverlay={setOverlay} />
        ))}
      </div>
    </div>
  );
};

export default Tools;
