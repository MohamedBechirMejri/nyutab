import { motion } from "framer-motion";
import { useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { useScrollContainer } from "react-indiana-drag-scroll";

import Mdx from "./Mdx";

const categories = [
  "Dev",
  "test2",
  "test3",
  "test4",
  "test5",
  "test6",
  "test7",
];

const subcategories = [
  "Tools",
  "Movies",
  "test3",
  "test4",
  "test5",
  "test6",
  "test7",
];

const Awesome = () => {
  const [category, setCategory] = useState<string>("");
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true);
  const scrollContainer = useScrollContainer();

  return (
    <div className="h-full font-bold bg-orange-200 rounded-lg text-zinc-900">
      <h1 className="flex flex-col items-center justify-center h-[8rem] text-3xl">
        Awesome Nyutab
        <a
          href="https://github.com/MohamedBechirMejri/nyutab/issues"
          target="_blank"
          rel="noreferrer"
          className="text-sm hover:underline"
        >
          Add your own Links
        </a>
      </h1>

      <div className="relative h-full">
        <nav
          className="absolute flex flex-col items-center justify-start h-full gap-4 overflow-x-scroll text-lg font-bold text-orange-200 capitalize noscroll bg-zinc-900 w-[12rem] py-8 left-0 top-0"
          ref={scrollContainer.ref}
        >
          {categories.map(cat => (
            <span
              key={cat}
              className="cursor-pointer hover:text-zinc-900"
              onClick={() => setCategory(cat)}
            >
              {cat}
            </span>
          ))}
        </nav>

        <motion.div
          initial={{ x: 0 }}
          animate={{
            x: isNavOpen ? "12rem" : 0,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative z-10 h-full p-4 overflow-y-scroll bg-orange-200"
        >
          <Mdx cat={category} />
        </motion.div>
      </div>

      <button
        className="absolute z-40 p-2 px-8 text-3xl font-bold top-8 right-[1.5rem] bg-zinc-900 bg-opacity-0 text-zinc-900 "
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        {isNavOpen ? <MdClose /> : <HiOutlineMenuAlt4 />}
      </button>
    </div>
  );
};

export default Awesome;
