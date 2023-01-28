import { motion } from "framer-motion";
import { useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { useScrollContainer } from "react-indiana-drag-scroll";

import Mdx from "./Mdx";

const initialCategories = [
  {
    name: "Dev",
    isOpen: true,
    subcategories: ["Tools", "Libraries"],
  },
  {
    name: "Dev2",
    isOpen: true,
    subcategories: ["Tools2", "Libraries2"],
  },
  {
    name: "Dev3",
    isOpen: true,
    subcategories: ["Tools3", "Libraries3"],
  },
];

const Awesome = () => {
  const [categories, setCategories] = useState<any>(initialCategories);
  const [category, setCategory] = useState<any>("");
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true);
  const scrollContainer = useScrollContainer();

  return (
    <div className="h-full font-bold bg-orange-200 rounded-lg text-zinc-900">
      <h1 className="flex flex-col items-center justify-center h-[8rem] text-3xl">
        Awesome nyutab
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
          className="absolute flex flex-col items-start justify-start h-full gap-4 overflow-scroll text-lg font-bold text-orange-200 capitalize noscroll bg-zinc-900 w-[12rem] py-8 left-0 top-0 text-left p-6 rounded-r-xl select-none"
          ref={scrollContainer.ref}
        >
          {categories.map(
            (
              cat: {
                name: string;
                isOpen: boolean;
                subcategories: string[];
              },
              i: number
            ) => (
              <div
                key={cat.name + i}
                className="cursor-pointer"
                onClick={() => {
                  setCategories(
                    categories.map((c: { name: string; isOpen: boolean }) => {
                      if (c.name === cat.name) c.isOpen = !c.isOpen;
                      else c.isOpen = false;
                      return c;
                    })
                  );
                }}
              >
                <span>{cat.name}</span>
                {cat.isOpen && (
                  <div className="flex flex-col items-start justify-start gap-2 pt-2 pl-4">
                    {cat.subcategories.map((subcat: string) => (
                      <div
                        key={subcat + i}
                        className="cursor-pointer"
                        onClick={() => setCategory(subcat)}
                      >
                        <span>{subcat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
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
