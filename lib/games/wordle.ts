import { dictionaryWords } from 'enwords'
import type { $Letter } from '../../types/games/wordle'

import { getRandomNumber } from '../mathUtils'

export const words = dictionaryWords.filter((word: string) => word.length > 3 && word.length < 7)

export const getRandomWord = () => {
  return words[getRandomNumber(words.length)]
}

export const generateBoard = (word: string): $Letter[][] =>
  Array(6)
    .fill(null)
    .map((_, i) =>
      Array(word.length)
        .fill(null)
        .map((_, j) => ({
          id: i + '-' + j,
          letter: '',
          status: 'empty',
        }))
    )
