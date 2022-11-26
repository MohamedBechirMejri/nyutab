import AwesomeData from "../../../db/AwesomeData.json";
import { decompress } from "compress-json";
import { useEffect, useState } from "react";
import { getRandomNumber } from "../../../lib/mathUtils";

// TODO: Filter Broken links, Improve Look, Fix Slow Performance, Add random site button

const Awesome = () => {
  const [categories, setCategories] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    // @ts-ignore
    const data = decompress(AwesomeData);
    const categories = Object.entries(data);
    console.log(categories);
    setCategories(categories.sort());
    setCategory(categories[getRandomNumber(categories.length)]);
  }, []);

  return categories ? (
    <div className="grid w-full h-full grid-cols-6 grid-rows-1 p-8 rounded-lg bg-slate-800">
      <div className="flex flex-col h-full gap-4 p-4 overflow-scroll noscroll">
        {categories.map(([name]: [name: string], i: number) => {
          return (
            <button key={name} onClick={() => setCategory(categories[i])}>
              {name}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col w-full h-full col-span-5 gap-2 p-8 overflow-scroll rounded-lg noscroll">
        <h1 className="text-4xl font-semibold">{category[0]}</h1>
        <div>
          {category[1].map((list: any) => {
            return (
              <div>
                <h2 className="m-4 text-3xl">- {list.name}</h2>
                <div className="pl-8">
                  {list.repo.map((link: any) => (
                    <div className="flex w-full gap-2 my-2 text-xl">
                      <span>•</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 shrink-0"
                      >
                        {link.name}
                      </a>
                      {link.description && <p>- {link.description}</p>}.
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : null;
};

export default Awesome;
