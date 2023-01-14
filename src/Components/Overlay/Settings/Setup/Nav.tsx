import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";

const buttonAnimation = {
  initial: { scale: 1 },
  whileTap: { scale: 0.65 },
};

const Nav = ({
  section,
  setSection,
  maxSection,
  submitSettings,
}: {
  section: number;
  setSection: any;
  maxSection: number;
  submitSettings: any;
}) => {
  return (
    <div className="absolute flex items-center gap-24 text-4xl bottom-8">
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
        onClick={() => {
          if (section < maxSection) setSection(section + 1);
          else submitSettings();
        }}
      >
        {section !== maxSection ? <IoIosArrowForward /> : <IoCheckmark />}
      </motion.button>
    </div>
  );
};

export default Nav;
