import { motion } from "framer-motion";
import { GetColorName } from "hex-color-to-color-name";

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
  const themes = [
    {
      primary: "#35363a",
      secondary: "#303034",
      text: "#f5f5f5",
    },
    {
      primary: "#0f172a",
      secondary: "#1e293b",
      text: "#f5f5f5",
    },
    {
      primary: "#171717",
      secondary: "#262626",
      text: "#f5f5f5",
    },
    {
      primary: "#7c2d12",
      secondary: "#9a3412",
      text: "#f5f5f5",
    },
    {
      primary: "#134e4a",
      secondary: "#115e59",
      text: "#f5f5f5",
    },
    {
      primary: "#831843",
      secondary: "#9d174d",
      text: "#f5f5f5",
    },
    {
      primary: "#f5f5f5",
      secondary: "#a3a3a3",
      text: "#171717",
    },
  ];
  return (
    <div className="flex items-center justify-center flex-col gap-16">
      <h1 className="text-xl font-semibold ">Select Theme</h1>
      <div className="flex gap-6">
        {themes.map(t => (
          <motion.div
            initial={{
              padding: "0",
            }}
            animate={{
              padding: ".75rem",
              scale: 1,
            }}
            whileHover={{
              padding: ".5rem",
            }}
            whileTap={{
              scale: 0.9,
            }}
            className="cursor-pointer w-24 h-24 rounded-full flex items-center justify-center select-none"
            style={{
              backgroundColor: t.primary,
            }}
          >
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
        ))}
      </div>
    </div>
  );
};

export default Theme;
