import { motion } from "framer-motion";
import { GetColorName } from "hex-color-to-color-name";
import { THEMES } from "./defaults";

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
    <div className="flex items-center justify-center flex-col gap-16">
      <h1 className="text-xl font-semibold ">Select a Theme</h1>
      <div className="flex gap-6">
        {THEMES.map(t => {
          const isSelected = JSON.stringify(theme) === JSON.stringify(t);

          return (
            <motion.div
              key={JSON.stringify(t)}
              initial={{
                padding: ".5rem",
              }}
              whileHover={{
                y: -10,
              }}
              whileTap={{
                padding: ".75rem",
              }}
              className="cursor-pointer w-24 h-24 rounded-full flex items-center justify-center select-none relative"
              style={{
                backgroundColor: t.primary,
              }}
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
                className="w-full h-full rounded-full flex items-center justify-center text-xs shadow-xl"
                style={{
                  backgroundColor: t.secondary,
                  color: t.text,
                }}
              >
                {GetColorName(t.primary.replace("#", ""))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Theme;
