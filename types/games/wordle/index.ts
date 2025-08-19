export type $Letter = {
  id: string
  letter: string | null
  status: 'empty' | 'correct' | 'incorrect' | 'misplaced'
}
