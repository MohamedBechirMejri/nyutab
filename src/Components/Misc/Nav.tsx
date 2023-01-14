import { motion } from "framer-motion";

const Nav = ({
  tabs,
  theme,
  tab,
  setTab,
}: {
  tabs: string[];
  theme: { primary: string; text: string };
  tab: string;
  setTab: (tab: string) => void;
}) => {
  return (
    <div className="flex items-center gap-8">
      {tabs.map((t, i) => (
        <motion.button
          key={`${t}-${i}`}
          initial={{
            backgroundColor: "transparent",
            borderColor: theme.primary,
            color: theme.text,
            borderRadius: "2rem",
            scale: 0,
          }}
          animate={{
            backgroundColor: tab === t ? theme.primary : theme.primary + 33,
            borderColor: theme.primary,
            color: theme.text,
            scale: 1,
          }}
          whileHover={{ borderRadius: "1.5rem" }}
          whileTap={{ borderRadius: "2rem", scale: 0.95 }}
          className="w-full p-4 px-6 text-lg font-bold uppercase border"
          onClick={() => setTab(t)}
        >
          {t}
        </motion.button>
      ))}
    </div>
  );
};

export default Nav;
