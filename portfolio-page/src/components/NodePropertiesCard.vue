<script setup lang="ts">
import type { NodeProperty } from '@/types/types'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  label: string
  properties: NodeProperty[]
  x: number
  y: number
}>()
const emit = defineEmits<{
  close: []
}>()
</script>
<template>
  <foreignObject
    :x="x"
    :y="y"
    width="280"
    height="380"
    class="pointer-events-auto overflow-visible"
  >
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      class="node-card w-70 max-h-92.5 flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-xl shadow-slate-900/10 dark:shadow-black/30 text-sm overflow-hidden animate-[card-in_200ms_ease-out]"
      @wheel.stop
      @pointerdown.stop
    >
      <div
        class="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-slate-200 dark:border-slate-700 bg-blue-50/60 dark:bg-blue-900/20 shrink-0"
      >
        <h3
          class="font-semibold text-slate-800 dark:text-slate-100 truncate text-[13px]"
          :title="label"
        >
          {{ label }}
        </h3>
        <button
          class="shrink-0 p-0.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
          :aria-label="t('general.closePanel')"
          @click="emit('close')"
        >
          <XMarkIcon class="h-4 w-4" />
        </button>
      </div>
      <div class="flex-1 overflow-y-auto overscroll-contain px-3 py-2.5 space-y-2 scrollbar-thin">
        <template v-if="properties.length > 0">
          <div
            v-for="(prop, index) in properties"
            :key="index"
            class="pb-2 last:pb-0 border-b border-slate-100 dark:border-slate-700/50 last:border-b-0"
          >
            <dl>
              <dt
                class="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-0.5"
              >
                {{ prop.label }}
              </dt>
              <dd
                class="text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed wrap-break-word text-justify"
              >
                {{ prop.value }}
              </dd>
            </dl>
          </div>
        </template>

        <p v-else class="italic text-slate-400 dark:text-slate-500 py-2">
          {{ t('general.noDetails') }}
        </p>
      </div>
    </div>
  </foreignObject>
</template>
