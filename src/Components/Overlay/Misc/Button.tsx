import { motion } from "framer-motion";

const Button = ({
  button,
  i,
  setOverlay,
}: {
  button: {
    name: string;
    soon?: boolean;
    className?: string;
    color: string;
    overlay: string;
  };
  i: number;
  setOverlay: any;
}) => {
  return (
    <motion.button
      style={{ paddingBlock: "0.5rem", paddingInline: "1rem" }}
      initial={{
        borderRadius: "1.5rem",
        backgroundColor: button.color + 55,
        color: button.color,
        scale: 1,
        y: 50,
        opacity: 0,
      }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{
        borderRadius: "2rem",
        backgroundColor: button.color,
        color: "#ffffff",
      }}
      whileTap={{ borderRadius: "3rem", scale: 0.99 }}
      transition={{
        // @ts-ignore
        type: "spring",
        // @ts-ignore
        damping: 10,
        // @ts-ignore
        stiffness: 100,
        y: { delay: 0.25 + i * 0.03 },
        opacity: { delay: 0.25 + i * 0.03 },
      }}
      className={button.className}
      onClick={() => setOverlay(button.overlay)}
    >
      {button.name}
      {button.soon && (
        <span className="px-2 py-1 ml-2 text-xs text-white bg-red-500 rounded-full">
          Soon
        </span>
      )}
    </motion.button>
  );
};

export default Button;
