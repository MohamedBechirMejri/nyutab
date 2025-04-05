import { useState } from "react";

import FavoriteSites from "./FavoriteSites";

import Header from "./header";
import Marquee from "./marquee";
import Feed from "./tools/Feed";
import Memes from "./tools/Memes";
import GameButton, { Game } from "./games/GameButton";
import ToolButton, { Tool } from "./tools/ToolButton";
import { useOverlayStore } from "lib/stores";
import SP from "./tools/SP";
import FitGirl from "./tools/FitGirl";
import { getRandomNumber } from "lib/mathUtils";

const miniApps = {
  memes: Memes,
  feed: Feed,
  fitgirl: FitGirl,
  anime: SP,
  settings: Feed, // a hack to make typescript happy
} as Record<Tool, React.FC>;

const tools = ["memes", "feed", "fitgirl", "anime"] as Tool[];

const games = [
  // "countries", FIXME: there's a bug and the ui is bad
  "minesweeper",
  "sudoku",
  "wordle",
  "wordsearch",
  "2048",
  "reflex challenge",
] as Game[];

const Home = () => {
  const [miniApp, setMiniApp] = useState<Tool>(
    tools[getRandomNumber(tools.length)]
  );

  const MiniApp = miniApps[miniApp];

  const { setOverlay } = useOverlayStore();

  return (
    <div className="w-full h-full grid grid-rows-[minmax(0,1fr),auto]">
      <div className="grid grid-cols-[15vw,minmax(0,1fr),15vw] gap-8 grid-rows-1">
        <div className="flex flex-col justify-between p-4 select-none">
          <div className="flex flex-wrap gap-x-4 gap-2">
            <span className="w-full pb-2">Tools:</span>
            {tools.map(app => (
              <ToolButton
                key={app}
                app={app}
                onClick={() => setMiniApp(app)}
                miniApp={miniApp}
              />
            ))}
            <ToolButton
              key={"settings"}
              app={"settings"}
              onClick={() => setOverlay("settings")}
              miniApp={miniApp}
            />
          </div>

          <div className="flex flex-wrap gap-x-4 gap-1">
            <span className="w-full pb-2">Games:</span>
            {games.map(app => (
              <GameButton
                key={app}
                app={app}
                onClick={() => setOverlay("games", app)}
                miniApp={miniApp}
              />
            ))}
          </div>
        </div>
        <div className="h-full grid grid-rows-[auto,minmax(0,1fr)] place-items-center py-4 gap-8">
          <Header />
          <div className="h-full w-full rounded-xl overflow-hidden flex items-center justify-center p-8">
            <MiniApp />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <FavoriteSites />
        </div>
      </div>
      <Marquee />
    </div>
  );
};

export default Home;
