import { motion } from "framer-motion";
import { GetColorName } from "hex-color-to-color-name";
import { THEMES } from "../../../lib/defaultsSettings";

const Theme = ({
  theme,
  setTheme,
}: {
  theme: {
    primary: string;
    secondary: string;
    text: string;
  };
  setTheme: any;
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-2xl font-bold ">Select a Theme</h1>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {THEMES.map(t => {
          const isSelected = JSON.stringify(theme) === JSON.stringify(t);
          return (
            <motion.div
              key={JSON.stringify(t)}
              initial={{ padding: ".5rem" }}
              whileHover={{ y: -10 }}
              whileTap={{ padding: ".75rem" }}
              className="relative flex items-center justify-center w-24 h-24 rounded-full cursor-pointer select-none"
              style={{ backgroundColor: t.primary }}
              onClick={() => setTheme(t)}
            >
              {isSelected && (
                <motion.span
                  initial={{ opacity: 0, y: 15, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute w-2 h-2 bg-current rounded-full -bottom-8"
                />
              )}
              <div
                className="flex items-center justify-center w-full h-full text-xs rounded-full shadow-xl"
                style={{ backgroundColor: t.secondary, color: t.text }}
              >
                {GetColorName(t.primary.replace("#", ""))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Theme;
