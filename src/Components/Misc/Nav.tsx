import { motion } from "framer-motion";
import { useScrollContainer } from "react-indiana-drag-scroll";

const Nav = ({
  tabs,
  theme,
  tab,
  setTab,
  isColumn = false,
}: {
  tabs: any[];
  theme: { primary: string; text: string };
  tab: any;
  setTab: (tab: any) => void;
  isColumn?: boolean;
}) => {
  const scrollContainer = useScrollContainer();

  return (
    <div
      className={
        "flex items-center gap-8 scroll select-none py-2 " +
        (isColumn ? "flex-col overflow-y-scroll" : "overflow-x-scroll")
      }
      ref={scrollContainer.ref}
    >
      {tabs.map((t, i) => {
        const name = typeof t === "string" ? t : t.name;

        return (
          <motion.button
            key={`${name}-${i}`}
            initial={{
              backgroundColor: "transparent",
              borderColor: theme.primary,
              color: theme.text,
              borderRadius: "2rem",
              scale: 0,
            }}
            animate={{
              backgroundColor:
                tab === (typeof t === "string" ? t : t.url)
                  ? theme.primary
                  : theme.primary + 55,
              borderColor: theme.primary,
              color: theme.text,
              scale: 1,
            }}
            whileHover={{ borderRadius: "1.5rem" }}
            whileTap={{ borderRadius: "2rem", scale: 0.95 }}
            className="w-full p-4 px-6 text-lg font-bold uppercase"
            onClick={() => setTab(t)}
          >
            {name}
          </motion.button>
        );
      })}
    </div>
  );
};

export default Nav;
