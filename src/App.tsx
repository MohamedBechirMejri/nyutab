function App() {
  return (
    <div className="h-screen max-h-screen p-2 overflow-hidden App dark:bg-slate-900 dark:text-white">
      <div className="grid items-center justify-center w-full h-full grid-cols-12 gap-2 grid-rows-[repeat(12,minmax(0,1fr))] justify-items-center ">
        <div className="w-full h-full col-span-9 bg-black"></div>
        <div className="w-full h-full col-span-3 bg-red-500"></div>
        <div className="w-full h-full col-span-4 row-span-5 bg-green-500"></div>
        <div className="w-full h-full col-span-4 row-span-3 bg-blue-500"></div>
        <div className="w-full h-full col-span-4 row-span-4 bg-yellow-500"></div>
        <div className="w-full h-full col-span-4 row-span-5 bg-gray-500"></div>
        <div className="w-full h-full col-span-4 row-span-3 bg-purple-500"></div>
        <div className="w-full h-full col-span-4 row-span-6 bg-pink-500"></div>
        <div className="w-full h-full col-span-4 row-span-4 bg-slate-500"></div>
        <div className="w-full h-full col-span-4 row-span-3 bg-cyan-500"></div>
      </div>
    </div>
  )
}

export default App
