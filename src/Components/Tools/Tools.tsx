import Button from "../Button";

const Tools = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <div className="flex flex-col items-center w-full h-full p-2">
      <h1 className="text-xl font-semibold">Tools</h1>
      <div className="grid w-full h-max grid-cols-2 gap-4 p-4 grid-rows-[repeat(25,minmax(0,1fr))]">
        <Button
          name="Breathing Exercice"
          soon={true}
          className="text-teal-500 hover:bg-[#14b8a527]"
          handleClick={() => setOverlay("breathing exercice")}
        />
      </div>
    </div>
  );
};

export default Tools;