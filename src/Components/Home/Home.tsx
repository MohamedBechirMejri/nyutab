import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const Date = lazy(() => import("./Date"));
const Clock = lazy(() => import("./Clock/Clock"));
const FavoriteSites = lazy(() => import("./FavoriteSites"));
const Memes = lazy(() => import("./Memes"));
const FactsAndQuotes = lazy(() => import("./FactsAndQuotes"));
const Button = lazy(() => import("../Misc/Button"));

const Home = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <Suspense>
      {
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid w-full h-full"
        >
          <div className="p-4 flex gap-4 justify-between">
            <Clock />
            <FavoriteSites />
            <Date />
          </div>
          <div className="h-[60svh]">
            <Memes setOverlay={setOverlay} />
          </div>
          <div className="relative">
            <FactsAndQuotes />
          </div>
          <div className="grid grid-cols-4 row-span-2 gap-4 p-4">
            <Button
              name={"Games"}
              handleClick={() => setOverlay("games")}
              className="text-red-500 bg-red-500 bg-opacity-10 hover:bg-opacity-20"
            />
            <Button
              name={"Tools"}
              handleClick={() => setOverlay("tools")}
              className="text-yellow-500 bg-yellow-500 bg-opacity-10 hover:bg-opacity-20"
            />
            <Button
              name={"Feed"}
              handleClick={() => setOverlay("feed")}
              className="text-blue-500 bg-blue-500 bg-opacity-10 hover:bg-opacity-20"
            />
            <Button
              name={"Settings"}
              handleClick={() => setOverlay("settings")}
              className="text-pink-500 bg-pink-500 bg-opacity-10 hover:bg-opacity-20"
            />
          </div>
        </motion.div>
      }
    </Suspense>
  );
};

export default Home;
