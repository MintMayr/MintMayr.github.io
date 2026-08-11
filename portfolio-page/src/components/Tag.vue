<script setup lang="ts">
import { computed } from 'vue'
import type { TagData } from '@/types/types.ts'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps<{
  tag: TagData
}>()
const colorVariants: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
  teal: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
  green: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
  gray: 'bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-200',
  violet: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
  brown: 'bg-stone-200 text-stone-800 dark:bg-stone-900/40 dark:text-stone-200',
  indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
  pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200',
  orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
  cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200',
  emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  rose: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
  amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
}

const activeColorClass = computed(() => {
  return colorVariants[props.tag.color || 'gray']
})
</script>

<template>
  <span
    :class="[
      'px-2 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-xs font-medium rounded-full leading-tight',
      activeColorClass,
    ]"
  >
    {{ t(tag.text) }}
  </span>
</template>
