import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Feed from "../Overlay/Feed";

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
        <div className="w-full h-full grid grid-rows-[minmax(0,1fr),auto]">
          {/*

          <div className="h-full grid grid-cols-3 place-items-center">


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
          </div>*/}
          <div className="grid grid-cols-3 gap-8">
            <Feed />
            <div className="h-1/2 m-auto">
              <Memes setOverlay={setOverlay} />
            </div>
            <div className="flex flex-col items-end">
              <div className="flex">
                <div className="p-4 flex flex-col items-center w-max bg -black backdrop-blur">
                  <Clock />
                  <Date />
                </div>
              </div>
              <FavoriteSites />
            </div>
          </div>

          <FactsAndQuotes />
        </div>
      }
    </Suspense>
  );
};

export default Home;
