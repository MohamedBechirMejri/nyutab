import Clock from "./Clock/Clock";
import FactsAndQuotes from "./FactsAndQuotes";
import FavoriteSites from "./FavoriteSites";
import Memes from "./Memes";



const Home = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <div className="w-full h-full grid grid-rows-[minmax(0,1fr),auto]">
      <div className="grid grid-cols-[15vw,minmax(0,1fr),15vw] gap-8">
        <div className="bg-black"></div>
        <div className="h-full flex flex-col justify-center items-center">
          <div className="flex">
            <div className="p-4 flex flex-col items-center w-max bg -black backdrop-blur">
              <Clock />
              <Date />
            </div>
          </div>
          <Memes setOverlay={setOverlay} />
        </div>
        <div className="flex flex-col items-end">
          <FavoriteSites />
        </div>
      </div>

      <FactsAndQuotes />
    </div>
  );
};

export default Home;
