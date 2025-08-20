import { getRandomNumber } from 'lib/mathUtils'
import { useOverlayStore } from 'lib/stores'
import { useState } from 'react'
import FavoriteSites from './FavoriteSites'
import GameButton, { type Game } from './games/GameButton'
import Header from './header'
import Marquee from './marquee'
// import CurrencyTracker from './tools/CurrencyTracker'
import Feed from './tools/Feed'
import FitGirl from './tools/FitGirl'
import Memes from './tools/Memes'
import SP from './tools/SP'
import ToolButton, { type Tool } from './tools/ToolButton'

const miniApps = {
  memes: Memes,
  feed: Feed,
  fitgirl: FitGirl,
  anime: SP,
  // currency: CurrencyTracker,
  settings: Feed, // a hack to make typescript happy
} as Record<Tool, React.FC>

const tools = [
  'memes',
  'feed',
  'fitgirl',
  'anime',
  //,'currency'
] as Tool[]

const games = [
  // "countries", FIXME: there's a bug and the ui is bad
  'minesweeper',
  'sudoku',
  'wordle',
  'wordsearch',
  '2048',
  'reflex challenge',
] as Game[]

const Home = () => {
  const [miniApp, setMiniApp] = useState<Tool>(tools[1])

  const MiniApp = miniApps[miniApp]

  const { setOverlay } = useOverlayStore()

  return (
    <div className="w-full h-full grid grid-rows-[minmax(0,1fr)_auto]">
      <div className="grid grid-cols-[15vw_minmax(0,1fr)_15vw] gap-8 grid-rows-1">
        <div className="flex flex-col justify-between p-4 select-none">
          <div className="flex flex-wrap gap-2 gap-x-4">
            <span className="w-full pb-2">Tools:</span>
            {tools.map(app => (
              <ToolButton key={app} app={app} onClick={() => setMiniApp(app)} miniApp={miniApp} />
            ))}
            <ToolButton
              key={'settings'}
              app={'settings'}
              onClick={() => setOverlay('settings')}
              miniApp={miniApp}
            />
          </div>

          <div className="flex flex-wrap gap-1 gap-x-4">
            <span className="w-full pb-2">Games:</span>
            {games.map(app => (
              <GameButton
                key={app}
                app={app}
                onClick={() => setOverlay('games', app)}
                miniApp={miniApp}
              />
            ))}
          </div>
        </div>
        <div className="h-full grid grid-rows-[auto_minmax(0,1fr)] place-items-center py-4 gap-8">
          <Header />
          <div className="flex items-center justify-center w-full h-full p-8 overflow-hidden rounded-xl">
            <MiniApp />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <FavoriteSites />
        </div>
      </div>
      <Marquee />
    </div>
  )
}

export default Home
