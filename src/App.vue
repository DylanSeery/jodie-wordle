<template>
  <div class="flex flex-col">

    <main class="flex-1 flex flex-col p-4">
      <GameBoard
        :attempts="state.attempts"
        :current-attempt="state.currentAttempt"
        :target-word="state.targetWord"
        :game-over="state.gameStatus !== 'playing'"
      />
      
      <div class="flex-1"></div>
      
      <Keyboard
        :used-letters="state.usedLetters"
        :disabled="state.gameStatus !== 'playing'"
        @key-press="handleKeyInput"
      />
    </main>

    <GameOver
      v-if="state.gameStatus !== 'playing'"
      :game-status="state.gameStatus"
      :target-word="state.targetWord"
      @play-again="initGame"
    />
  </div>
  <Toaster />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import GameBoard from './components/GameBoard.vue'
import Keyboard from './components/Keyboard.vue'
import GameOver from './components/GameOver.vue'
import { useGame } from './composables/useGame'
import Toaster from '@/components/ui/toast/Toaster.vue'


const { state, initGame, handleKeyInput } = useGame()

// Handle physical keyboard input
const handleKeyDown = (e: KeyboardEvent): void => {
  const key = e.key.toUpperCase()
  if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
    handleKeyInput(key === 'BACKSPACE' ? '←' : key)
  }
}

onMounted(() => {
  initGame()
  window.addEventListener('keydown', handleKeyDown)
})
</script>

<style>
@keyframes flip {
  0% { transform: scaleY(1) }
  50% { transform: scaleY(0) }
  100% { transform: scaleY(1) }
}

.animate-flip {
  animation: flip 0.6s ease-in-out;
}

* {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
</style>