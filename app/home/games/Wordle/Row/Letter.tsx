import { m } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import type { $Letter } from 'types/games/wordle'

const Letter = ({ letter }: { letter: $Letter }) => {
  return (
    <div className="h-[min(5.5rem,100%)] border border-sky-200 bg-linear-to-b from-sky-400">
      <p
        className="flex items-center justify-center w-full h-full text-xl font-bold uppercase"
        style={{
          padding: letter.status === 'misplaced' ? '0.25rem' : '0',
        }}
      >
        {letter.letter ? (
          <m.span
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.5,
              backgroundColor: 'ffffff00',
              borderRadius: '0',
              color: 'white',
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              backgroundColor:
                letter.status === 'correct'
                  ? '#f00'
                  : letter.status === 'misplaced'
                    ? '#ff0'
                    : '#ffffff00',
              borderRadius: letter.status === 'misplaced' ? '99999rem' : '0rem',
              color: letter.status === 'misplaced' ? 'orange' : 'white',
            }}
            transition={{
              backgroundColor: { delay: 0.33 * +letter.id.split('-')[1] },
              color: { delay: 0.33 * +letter.id.split('-')[1] },
            }}
            className="relative flex items-center justify-center w-full h-full"
          >
            {letter.letter}
            {letter.status === 'incorrect' && (
              <m.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.33 * +letter.id.split('-')[1] }}
                className="absolute text-red-500 top-2 right-2"
              >
                <IoClose className="" />
              </m.span>
            )}
          </m.span>
        ) : (
          <span>•</span>
        )}
      </p>
    </div>
  )
}

export default Letter
