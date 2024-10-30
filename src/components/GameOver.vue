<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div class="bg-white p-6 rounded-lg max-w-sm w-full">
        <h2 class="text-2xl font-bold text-center mb-4">
          {{ gameStatus === 'won' ? 'Congratulations! 🎉' : 'Game Over' }}
        </h2>
        <p class="text-center mb-4">
          The word was: <strong>{{ targetWord }}</strong>
        </p>
        <div class="flex justify-center gap-4">
          <button @click="$emit('playAgain')"
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Play Again
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { GameStatus } from '@/types/game'
  
  defineProps<{
    gameStatus: GameStatus
    targetWord: string
  }>()
  
  defineEmits<{
    (e: 'playAgain'): void
  }>()
  </script>