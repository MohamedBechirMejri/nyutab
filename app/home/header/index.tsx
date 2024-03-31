import Clock from "./Clock";
import Date from "./Date";
import NextPrayer from "./NextPrayer";
import Weather from "./Weather";

export default function Header() {
  return (
    <div className="p-4 px-8 flex flex-col items-center w-max bg-black bg-opacity-30 backdrop-blur-3xl rounded-lg shadow">
      <Clock />
      <Date />

      <div>
        <Weather />
        <NextPrayer />
      </div>
    </div>
  );
}
