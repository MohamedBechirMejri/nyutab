import FavoriteSites from "./Components/Home/FavoriteSites"
import Clock from "./Components/Home/Clock"
import Reddit from "./Components/Dev/Reddit/Reddit"
import HackerNews from "./Components/Dev/HackerNews/HackerNews"
import F1 from "./Components/Sports/F1"
import Tasks from "./Components/Productivity/Tasks"
import Memes from './Components/Entertainment/Memes';
function App() {
  return (
    <div className="h-screen max-h-screen p-2 overflow-hidden App dark:bg-slate-900 dark:text-white">
      <div className="grid items-center justify-center w-full h-full grid-cols-12 gap-2 grid-rows-[repeat(12,minmax(0,1fr))] justify-items-center ">
        {/* add x0 to keep the color hints in case i need them */}

        <div className="w-full h-full col-span-9 bg-blackx0">
          <FavoriteSites />
        </div>
        <div className="w-full h-full col-span-3 bg-red-500x0">
          <Clock />
        </div>
        <div className="w-full h-full col-span-4 row-span-5 bg-green-500x0">
          <Reddit />
        </div>
        <div className="w-full h-full col-span-4 row-span-3 bg-blue-500x0">
          <F1 />
        </div>
        <div className="w-full h-full col-span-4 row-span-4 bg-yellow-500x0">
          <Tasks />
        </div>
        <div className="w-full h-full col-span-4 row-span-6 bg-gray-500x0">
          <Memes />
        </div>
        <div className="w-full h-full col-span-4 row-span-3 bg-purple-500"></div>
        <div className="w-full h-full col-span-4 row-span-6 bg-pink-500x0">
          <HackerNews />
        </div>
        <div className="w-full h-full col-span-4 row-span-4 bg-slate-500"></div>
        <div className="w-full h-full col-span-4 row-span-2 bg-cyan-500"></div>
      </div>
    </div>
  )
}

export default App
