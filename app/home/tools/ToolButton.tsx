import { m } from "framer-motion";

type GameButtonProps = {
  app: Tool;
  onClick: () => void;
  miniApp: string;
};

export type Tool =
  | "memes"
  | "feed"
  | "fitgirl"
  | "anime"
  | "settings"
  | "currency";

const styles = {
  memes: { color: "#7e22ce" },
  feed: { color: "#3b82f6" },
  settings: { color: "#666666" },
  fitgirl: { color: "#f59e0b" },
  anime: { color: "#f87171" },
  currency: { color: "#10b981" },
} as Record<Tool, { color: string; className?: string }>;

export default function ToolButton({ app, onClick, miniApp }: GameButtonProps) {
  const appStyle = styles[app];
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
      className={appStyle.className + " p-2 px-4 backdrop-blur capitalize"}
    >
      {app}
    </m.button>
  );
}
