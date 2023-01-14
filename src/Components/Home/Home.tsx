import FavoriteSites from "./FavoriteSites";
import Clock from "./Clock";
import Weather from "./Weather";
import Date from "./Date";
import Memes from "./Memes";
import Games from "../Overlay/Games/Games";
import Tools from "../Overlay/Tools/Tools";
import FactsAndQuotes from "./FactsAndQuotes";
import SettingsButton from "../Overlay/Settings/SettingsButton";
import Button from "../Misc/Button";
import Settings from "../../Types/Settings";
import Feed from "./Feed/Feed";

const Home = ({
  overlay,
  setOverlay,
  settings,
}: {
  overlay: string;
  setOverlay: any;
  settings: Settings | null;
}) => {
  // TODO: image bg option (and a slideshow)

  return (
    <div className="grid w-full h-full grid-rows-[repeat(10,minmax(0,1fr))] gap-2">
      <div className="grid grid-cols-3">
        <Date />
        <Clock />
        <Weather />
      </div>
      <FavoriteSites />
      <Memes setOverlay={setOverlay} />
      <div className="relative">
        <FactsAndQuotes />
      </div>
      <div className="grid grid-cols-4 row-span-2 gap-4 p-4">
        <Button name={"Games"} handleClick={() => setOverlay("games")} />
        <Button name={"Tools"} handleClick={() => setOverlay("tools")} />
        <Button name={"Feed"} handleClick={() => setOverlay("feed")} />
        <Button name={"Settings"} handleClick={() => setOverlay("settings")} />
      </div>
    </div>
  );
};

export default Home;
