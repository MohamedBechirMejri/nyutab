import { IoClose } from "react-icons/io5";
import BreathingExercise from "./Tools/BreathingExercise";

const Overlay = ({
  overlay,
  setOverlay,
}: {
  overlay: any;
  setOverlay: any;
}) => {
  return (
    <div className="w-full h-full p-14">
      <button
        className="text-4xl absolute top-6 right-6 hover:rotate-180 transition-all duration-300 active:scale-90"
        onClick={() => setOverlay("")}
      >
        <IoClose />
      </button>
      <div className="w-full h-full bg-slate-900 rounded-xl shadow-2xl ">
        {overlay === "breathing exercise" && <BreathingExercise />}
      </div>
    </div>
  );
};

export default Overlay;
