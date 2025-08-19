import Clock from './Clock'
import Date from './Date'
import NextPrayer from './NextPrayer'
import Weather from './Weather'

export default function Header() {
  return (
    <div className="p-4 px-8 flex flex-col items-center w-max bg-black bg-opacity-30 backdrop-blur-3xl rounded-lg shadow relative rounded-b-none select-none">
      <Clock />
      <Date />

      <div className="absolute left-full top-0 h-full flex justify-between items-center w-max text-xl ml-2 bg-gradient-to-tr from-sky-700 to-blue-900 rounded-lg shadow ">
        <Weather />
      </div>

      <div className="absolute left-0 top-full flex justify-between items-center w-full h-1/3 rounded-t-none text-base bg-gradient-to-r from-slate-700 via-cyan-900 to-teal-900 bg-opacity-20 backdrop-blur-3xl rounded-lg shadow text-cyan-400 font-semibold">
        <NextPrayer />
      </div>
    </div>
  )
}
