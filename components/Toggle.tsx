import { m } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";

type Props = {
  enabled: boolean;
  toggle: () => void;
  title: string;
  className?: string;
};

export default function Toggle({ enabled, toggle, title, className }: Props) {
  return (
    <div
      onClick={() => toggle()}
      className={
        "flex items-center justify-between w-full gap-16 p-2 px-8 text-xl text-center transition-all rounded cursor-pointer select-none " +
          className ?? "col-span-2"
      }
    >
      {title}
      <div
        className={
          "transition-all w-12 rounded-full relative h-4 bg-opacity-50 " +
          (enabled ? "bg-green-500" : "bg-red-500")
        }
      >
        <m.span
          initial={{
            top: -4,
            left: enabled ? "80%" : "0",
            padding: 0,
          }}
          animate={{
            left: enabled ? 24 : 0,
            padding: 3,
          }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className={`rounded-full ${
            enabled ? "bg-green-500 text-green-800" : "bg-red-500 text-red-800"
          } absolute`}
        >
          {enabled ? <FiCheck /> : <FiX />}
        </m.span>
      </div>
    </div>
  );
}
