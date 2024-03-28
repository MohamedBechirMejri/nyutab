import { lazy, Suspense } from "react";

const Date = lazy(() => import("./Date"));
const Clock = lazy(() => import("./Clock/Clock"));
const FavoriteSites = lazy(() => import("./FavoriteSites"));
const Memes = lazy(() => import("./Memes"));
const FactsAndQuotes = lazy(() => import("./FactsAndQuotes"));

const Home = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <Suspense>
      {
        <div className="w-full h-full grid grid-rows-[minmax(0,1fr),auto]">
          <div className="grid grid-cols-[15vw,minmax(0,1fr),15vw] gap-8">
            <div className="bg-black"></div>
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
