import { ref} from 'vue'
import type { GameState } from '../types/game'
import { WORDS, isValidWord } from '../lib/words'
import { useToast } from '@/components/ui/toast/use-toast'

export function useGame() {
  const { toast } = useToast()

  const state = ref<GameState>({
    targetWord: '',
    currentAttempt: 0,
    attempts: Array(6).fill(''),
    gameStatus: 'playing',
    usedLetters: {}
  })

  const initGame = (): void => {
    state.value = {
      targetWord: WORDS[Math.floor(Math.random() * WORDS.length)],
      currentAttempt: 0,
      attempts: Array(6).fill(''),
      gameStatus: 'playing',
      usedLetters: {}
    }
  }

  const handleKeyInput = (key: string): void => {
    if (state.value.gameStatus !== 'playing') return

    const currentWord = state.value.attempts[state.value.currentAttempt]
    if (key === 'Enter') {
      if (currentWord.length === 5) {
        if (!isValidWord(currentWord)) {
          alert(`${currentWord} is not in wordlist ❌`);
          return;
        }
        checkWord()
      }
    } else if (key === '←') {
      state.value.attempts[state.value.currentAttempt] = currentWord.slice(0, -1)
    } else if (currentWord.length < 5) {
      state.value.attempts[state.value.currentAttempt] = currentWord + key
    }
  }

  const checkWord = (): void => {
    const currentWord = state.value.attempts[state.value.currentAttempt]
    
    // Update used letters
    for (let i = 0; i < currentWord.length; i++) {
      const letter = currentWord[i]

      if (letter === state.value.targetWord[i]) {
        state.value.usedLetters[letter] = 'correct'
      } else if (state.value.targetWord.includes(letter)) {
        if (state.value.usedLetters[letter] !== 'correct') {
          state.value.usedLetters[letter] = 'present'
        }
      } else {
        if (!state.value.usedLetters[letter]) {
          state.value.usedLetters[letter] = 'absent'
        }
      }
    }
    
    if (currentWord === state.value.targetWord) {
      state.value.gameStatus = 'won'
      return
    }

    if (state.value.currentAttempt === 5) {
      state.value.gameStatus = 'lost'
      return
    }

    state.value.currentAttempt++
  }

  return {
    state,
    initGame,
    handleKeyInput,
  }
}