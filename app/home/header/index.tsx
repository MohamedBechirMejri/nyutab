import Clock from './Clock'
import Date from './Date'
import NextPrayer from './NextPrayer'
import Weather from './Weather'

export default function Header() {
  return (
    <div className="relative flex flex-col items-center p-4 px-8 rounded-lg rounded-b-none shadow select-none w-max bg-black/30 backdrop-blur-3xl">
      <Clock />
      <Date />

      <div className="absolute top-0 flex items-center justify-between h-full ml-2 text-xl rounded-lg shadow left-full w-max bg-linear-to-tr from-sky-700 to-blue-900 ">
        <Weather />
      </div>

      <div className="absolute left-0 flex items-center justify-between w-full text-base font-semibold rounded-lg rounded-t-none shadow top-full h-1/3 bg-linear-to-r from-slate-700/20 via-cyan-900/20 to-teal-900/20 backdrop-blur-3xl text-cyan-400">
        <NextPrayer />
      </div>
    </div>
  )
}
