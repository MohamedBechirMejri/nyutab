import { useState } from "react";
import { useScrollContainer } from "react-indiana-drag-scroll";

import Mdx from "./Mdx";

const categories = [
  "test",
  "test2",
  "test3",
  "test4",
  "test5",
  "test6",
  "test7",
];

const Awesome = () => {
  const [category, setCategory] = useState<string>("");
  const scrollContainer = useScrollContainer();

  return (
    <div className="flex flex-col w-full h-full font-bold bg-orange-200 rounded-lg text-zinc-900">
      <h1 className="flex flex-col items-center justify-center h-[7rem] text-3xl">
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
      <nav
        className="h-[5rem] flex items-center justify-center gap-4 font-bold text-lg capitalize overflow-x-scroll noscroll"
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
      <div className="p-4 overflow-y-auto">
        <Mdx cat={category} />
      </div>
    </div>
  );
};

export default Awesome;
