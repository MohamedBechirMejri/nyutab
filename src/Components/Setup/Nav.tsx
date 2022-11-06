import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Nav = ({
  section,
  setSection,
  maxSection,
}: {
  section: number;
  setSection: any;
  maxSection: number;
}) => {
  const buttonAnimation = {
    initial: { scale: 1 },
    whileHover: { x: [0, -5, 0, -5, 0] },
    whileTap: { scale: 0.65 },
  };

  return (
    <div className="flex items-center gap-24 text-4xl">
      <motion.button
        {...buttonAnimation}
        animate={{ scale: section > 1 ? 1 : 0 }}
        onClick={() => {
          if (section > 1) setSection(section - 1);
        }}
      >
        <IoIosArrowBack />
      </motion.button>

      <motion.button
        {...buttonAnimation}
        whileHover={{ x: [0, 5, 0, 5, 0] }}
        onClick={() => {
          if (section < maxSection) setSection(section + 1);
          else console.log("save settings in ctx and ls and close overlay");
        }}
      >
        <IoIosArrowForward />
        {/* <IoCheckmark /> */}
      </motion.button>
    </div>
  );
};

export default Nav;
