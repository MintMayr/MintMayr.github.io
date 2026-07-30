<script setup lang="ts">
import type { NodeProperty } from '@/types/types'

defineProps<{
  label: string
  properties: NodeProperty[]
  x: number
  y: number
}>()
</script>
<template>
  <foreignObject
    :x="x"
    :y="y"
    width="220"
    height="320"
    class="pointer-events-auto overflow-visible"
  >
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      class="w-[220px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 shadow-lg p-3 text-sm"
    >
      <p class="font-semibold text-slate-800 dark:text-slate-100 mb-1">{{ label }}</p>
      <dl v-if="properties.length > 0" class="space-y-0.5">
        <div v-for="(prop, index) in properties" :key="index" class="flex gap-1">
          <dt class="font-medium text-slate-500 dark:text-slate-400 shrink-0">{{ prop.label }}:</dt>
          <dd class="text-slate-700 dark:text-slate-200 break-words">{{ prop.value }}</dd>
        </div>
      </dl>
    </div>
  </foreignObject>
</template>
