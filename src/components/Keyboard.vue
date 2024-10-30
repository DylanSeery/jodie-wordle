<template>
    <div class="grid gap-1 w-full max-w-sm mx-auto px-1">
      <div v-for="(row, index) in keyboard" :key="index" 
           class="flex justify-center gap-1">
        <button v-for="key in row" :key="key"
                @click="$emit('keyPress', key)"
                :disabled="disabled"
                class="flex-1 py-4 rounded-md text-sm font-bold touch-manipulation active:bg-gray-400 transition-colors"
                :class="getKeyStyle(key)">
          <span v-if="key === '←'" class="material-icons">backspace</span>
          <span v-else>{{ key }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import type { PropType } from 'vue'
  import type { UsedLetters } from '@/types/game'
  
  const props = defineProps({
    usedLetters: {
      type: Object as PropType<UsedLetters>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
  
  defineEmits<{
    (e: 'keyPress', key: string): void
  }>()
  
  const keyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '←']
  ]
  
  const getKeyStyle = (key: string): string => {
    if (key === 'Enter' || key === '←') {
      return 'bg-gray-200 hover:bg-gray-300 px-2'
    }
    
    const status = props.usedLetters[key]
    if (status === 'correct') return 'bg-green-500 text-white'
    if (status === 'present') return 'bg-yellow-500 text-white'
    if (status === 'absent') return 'bg-gray-500 text-white'
    
    return 'bg-gray-200 hover:bg-gray-300'
  }
  </script>