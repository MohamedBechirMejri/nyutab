import { m } from "framer-motion";

type GameButtonProps = {
  app: string;
  onClick: () => void;
  miniApp: string;
};

const styles = {
  2048: {
    className:
      "sm:col-span-2 bg-[url(/images/2048/icon.gif)] bg-center bg-no-repeat bg-cover [color:transparent!important]",
    color: "#eab308",
  },
  countries: { color: "#f97316" },
  minesweeper: { color: "#f43f5e" },
  "reflex challenge": { color: "#ef4444" },
  sudoku: { color: "#64748b" },
  wordle: { color: "#3b82f6" },
  wordsearch: {
    color: "#14b8a6",
  },
} as any;

export default function GameButton({ app, onClick, miniApp }: GameButtonProps) {
  const appStyle = styles[app] as any;
  return (
    <m.button
      initial={{
        borderRadius: "1.5rem",
        backgroundColor: appStyle.color + 55,
        color: appStyle.color,
        scale: 1,
        y: 50,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
        backgroundColor: miniApp === app ? appStyle.color + "88" : "#66666633",
        color: miniApp === app ? "#ffffff" : appStyle.color,
      }}
      whileHover={{
        borderRadius: "2rem",
        backgroundColor: appStyle.color + (miniApp === app ? "66" : "aa"),
        color: "#ffffff",
        opacity: 1,
      }}
      whileTap={{ borderRadius: "3rem", scale: 0.99 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
        y: { delay: 0.25 },
        opacity: { delay: 0.25 },
      }}
      onClick={onClick}
      className={appStyle.className + " p-2 px-4 backdrop-blur"}
    >
      {app}
    </m.button>
  );
}
