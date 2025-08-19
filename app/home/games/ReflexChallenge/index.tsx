import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getRandomNumber } from '../../../../lib/mathUtils'

// TODO: save score to firebase

const ReflexChallenge = () => {
  const [target, setTargetCoords] = useState({ x: 50, y: 50 })
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)

  const moveTarget = () => {
    setTargetCoords({
      x: getRandomNumber(70, 10),
      y: getRandomNumber(70, 10),
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      moveTarget()
    }, 700)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full pt-24 select-none">
      <m.button
        initial={{
          position: 'absolute',
          opacity: 0,
          left: target.x + '%',
          top: target.y + '%',
          x: -target.x + '%',
          y: -target.y + '%',
          backgroundColor: '#ef4444',
        }}
        animate={{
          opacity: 1,
          left: target.x + '%',
          top: target.y + '%',
          x: -target.x + '%',
          y: -target.y + '%',
        }}
        whileTap={{ scale: 0.9, backgroundColor: '#22c55e' }}
        transition={{ type: 'spring', damping: 10, stiffness: 100 }}
        className="absolute w-20 h-20 bg-red-500 rounded-full z-20"
        onClick={() => {
          setScore(score => score + 1)
        }}
      />
      <div
        className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full"
        onClick={() => {
          setLives(lives => lives - 1)
        }}
      >
        <div className="text-4xl font-bold text-white">{score}</div>
        <div className="text-2xl font-bold text-white">{lives}</div>
      </div>
      <AnimatePresence>
        {lives < 1 && (
          <m.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="absolute top-0 left-0 z-30 flex flex-col items-center justify-center w-full h-full"
          >
            <div className="bg-zinc-500 w-[min(25rem,80vw)] h-[min(25rem,50vh)] rounded-2xl flex flex-col items-center justify-center font-bold text-xl capitalize gap-8">
              <h1 className="text-zinc-900">Game Over!</h1>
              <p>
                Your score is {score}
                {score > 3 && ', Impressive!!'}
              </p>
              <div className="w-full max-w-60">
                <label htmlFor="name">Name@SocialWebsite</label>
                <input
                  type="text"
                  id="name"
                  placeholder="MohamedBechirMejri@Github"
                  className="w-full max-w-60"
                />
              </div>
              <button
                className="w-full max-w-60 bg-zinc-700 p-2 rounded-xl"
                onClick={() => {
                  setScore(0)
                  setLives(3)
                }}
              >
                Submit
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ReflexChallenge
