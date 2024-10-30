export type GameStatus = 'playing' | 'won' | 'lost'
export type LetterStatus = 'correct' | 'present' | 'absent' | undefined
export type UsedLetters = Record<string, LetterStatus>
export type Attempts = string[]

export interface GameState {
  targetWord: string
  currentAttempt: number
  attempts: Attempts
  gameStatus: GameStatus
  usedLetters: UsedLetters
}