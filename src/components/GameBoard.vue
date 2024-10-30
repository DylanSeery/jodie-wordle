<script setup lang="ts">
import type { PropType } from 'vue'
import type { Attempts } from '@/types/game'

const props = defineProps({
  attempts: {
    type: Array as PropType<Attempts>,
    required: true
  },
  currentAttempt: {
    type: Number,
    required: true
  },
  targetWord: {
    type: String,
    required: true
  },
  gameOver: {
    type: Boolean,
    required: true
  }
})

const getCellStyle = (row: number, col: number): string => {
  const attempt = props.attempts[row]
  if (!attempt[col]) return 'border-gray-300'

  if (row < props.currentAttempt || props.gameOver) {
    if (attempt[col] === props.targetWord[col]) {
      return 'bg-green-500 border-green-500 text-white animate-flip'
    }
    if (props.targetWord.includes(attempt[col])) {
      return 'bg-yellow-500 border-yellow-500 text-white animate-flip'
    }
    return 'bg-gray-500 border-gray-500 text-white animate-flip'
  }

  return 'border-gray-300'
}
</script>

<template>
  <div class="grid gap-1 mb-4 w-full max-w-sm mx-auto">
    <div v-for="(attempt, rowIndex) in attempts" :key="rowIndex" 
         class="grid grid-cols-5 gap-1">
      <div v-for="(letter, colIndex) in 5" :key="colIndex"
           class="aspect-square border-2 flex items-center justify-center text-xl sm:text-2xl font-bold uppercase"
           :class="getCellStyle(rowIndex, colIndex)">
        {{ attempt[colIndex] || '' }}
      </div>
    </div>
  </div>
</template>