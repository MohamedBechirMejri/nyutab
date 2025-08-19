import { m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaBomb } from 'react-icons/fa'

const addCoords = (
  arr: string[][] = [
    ['o', 'o', '1', 'x', '3', 'x', '2', 'x', '2'],
    ['1', '1', '1', '2', 'x', '2', '2', '2', 'x'],
    ['x', '1', 'o', '1', '1', '1', 'o', '1', '1'],
    ['1', '1', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', '1', '1', '1', 'o', 'o', 'o'],
    ['2', '2', '1', '1', 'x', '1', 'o', 'o', 'o'],
    ['x', 'x', '2', '2', '1', '1', 'o', '1', '1'],
    ['x', '4', 'x', '1', 'o', 'o', 'o', '1', 'x'],
    ['1', '2', '1', '1', 'o', 'o', 'o', '1', '1'],
  ]
) => arr.flatMap((row, y) => row.map((col, x) => ({ x, y, value: col, clicked: false })))

const Minesweeper = () => {
  const [board, setBoard] = useState(addCoords())
  const [width, setWidth] = useState(9)
  const [height, setHeight] = useState(9)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [time, setTime] = useState(0)
  const [mines, setMines] = useState(10)

  const getNeighbors = (x: number, y: number) => {
    const w = width - 1
    const h = height - 1
    const neighbors = []
    if (x > 0) neighbors.push({ x: x - 1, y })
    if (x < w) neighbors.push({ x: x + 1, y })
    if (y > 0) neighbors.push({ x, y: y - 1 })
    if (y < h) neighbors.push({ x, y: y + 1 })
    if (x > 0 && y > 0) neighbors.push({ x: x - 1, y: y - 1 })
    if (x < w && y < h) neighbors.push({ x: x + 1, y: y + 1 })
    if (x > 0 && y < h) neighbors.push({ x: x - 1, y: y + 1 })
    if (x < w && y > 0) neighbors.push({ x: x + 1, y: y - 1 })
    return neighbors
  }

  const handleClick = (x: number, y: number) => {
    if (gameOver) return
    const newBoard = [...board]
    const clicked = newBoard.find(item => item.x === x && item.y === y)
    if (clicked && clicked.value === 'x') {
      setGameOver(true)
      return
    }
    if (clicked) {
      clicked.clicked = true

      if (clicked.value === 'o') {
        const neighbors = getNeighbors(x, y)
        neighbors.forEach(neighbor => {
          const neighborItem = newBoard.find(item => item.x === neighbor.x && item.y === neighbor.y)
          if (neighborItem && !neighborItem.clicked) {
            handleClick(neighbor.x, neighbor.y)
          }
        })
      }

      setBoard(newBoard)
      checkWin()
    }
  }

  const checkWin = () => {
    const clicked = board.filter(item => item.clicked)
    if (clicked.length === width * height - mines) {
      setGameWon(true)
    }
  }

  const handleNewGame = () => {
    fetch('https://shadify.dev/api/minesweeper/generator?start=1-2')
      .then(res => res.json())
      .then(res => {
        const { data } = res
        setBoard(addCoords(data.board))
        setWidth(data.width)
        setHeight(data.height)
        setGameOver(false)
        setGameWon(false)
        setTime(0)
        setMines(data.mines)
      })
      .catch(err => console.log(err))
  }

  useEffect(handleNewGame, [])

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-y-scroll text-3xl font-bold bg-[#00000011] select-none noscroll p-8 pt-24">
      <m.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 10, stiffness: 100 }}
        style={{ width: `min(calc(4rem * ${width}), 98vw)` }}
        className="w-full h-24 p-2 text-white flex justify-between items-center"
        onClick={handleNewGame}
      >
        <h1>Minesweeper</h1>
        <h2>{gameWon ? 'Congrats! 🎉' : gameOver ? 'Game Over! 😭' : ''}</h2>
        <button>New Game</button>
      </m.div>
      <div
        style={{
          width: 'fit-content',
          height: 'fit-content',
          gridTemplateColumns: `repeat(${width}, 1fr)`,
          gridTemplateRows: `repeat(${height}, 1fr)`,
          display: 'grid',
        }}
      >
        {board.map((item, i) => (
          <m.div
            key={`tile#-${i}`}
            initial={{
              opacity: 0,
              scale: 0,
              backgroundColor: '#334155',
              color: '#fff',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              backgroundColor: item.clicked ? '#0f172a' : '#334155',
              color: item.value === '1' ? '#00ffff' : item.value === '2' ? '#ffdc00' : '#ff0000',
            }}
            whileHover={{ backgroundColor: '#0f172a' }}
            transition={{
              // @ts-expect-error
              type: 'spring',
              // @ts-expect-error
              damping: 10,
              // @ts-expect-error
              stiffness: 100,
              // @ts-expect-error
              mass: 0.5,
              scale: { delay: item.x * 0.05 + item.y * 0.05 },
              opacity: { delay: item.x * 0.05 + item.y * 0.05 },
            }}
            className={'flex items-center justify-center h-16 border border-black font-bold'}
            style={{
              width: `min(calc(98vw / ${width}),4rem )`,
              height: `min(calc(98vw / ${width}),4rem )`,
            }}
            onClick={() => handleClick(item.x, item.y)}
          >
            {item.clicked && item.value !== 'o' ? (
              item.value
            ) : gameOver && item.value === 'x' ? (
              <FaBomb />
            ) : (
              ''
            )}
          </m.div>
        ))}
      </div>
    </div>
  )
}

export default Minesweeper
