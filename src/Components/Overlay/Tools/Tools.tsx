import Button from "../../Misc/Button";
import PrayerButton from "./Prayers/PrayerButton";

const Tools = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="text-xl font-semibold">Tools</h1>
      <div className="grid w-full grid-cols-3 gap-4 p-4 overflow-scroll h-max auto-rows-max noscroll">
        <Button
          name="Breathing Exercise"
          className="text-[#1da1f2] hover:bg-[#1da1f227] bg-[#1da1f211]"
          handleClick={() => setOverlay("breathing exercise")}
        />
        <PrayerButton setOverlay={setOverlay} />
        <Button
          name="Calculator"
          className="text-[#f43f5e] hover:bg-[#f43f5e27] bg-[#f43f5e11]"
          handleClick={() => setOverlay("calculator")}
        />
        <Button
          name="Todo List"
          className="text-[#f97316] hover:bg-[#f9731627] bg-[#f9731611]"
          handleClick={() => setOverlay("tasks")}
        />
        <Button
          name="Awesome Lists"
          className="text-[#fc60a8] hover:bg-[#fc60a827] bg-[#fc60a811] col-span-2"
          handleClick={() => setOverlay("awesome")}
        />
      </div>
    </div>
  );
};

export default Tools;
