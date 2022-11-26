import AwesomeData from "../../../db/AwesomeData.json";
import { decompress } from "compress-json";
import { useEffect, useState } from "react";

// TODO: Test Memoization

const Awesome = () => {
  const [categories, setCategories] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    // @ts-ignore
    const data = decompress(AwesomeData);
    const categories = Object.entries(data);
    console.log(categories);
    setCategories(categories.sort());
    setCategory(categories[0]);
  }, []);

  return categories ? (
    <div className="grid w-full h-full grid-cols-6 grid-rows-1">
      <div className="flex flex-col h-full gap-2 overflow-scroll noscroll">
        {categories.map(([name, lists]: [name: string, lists: any]) => {
          return (
            <button onClick={() => setCategory([name, lists])}>{name}</button>
          );
        })}
      </div>
      <div>
        <h1>{category[0]}</h1>
      </div>
    </div>
  ) : null;
};

export default Awesome;
