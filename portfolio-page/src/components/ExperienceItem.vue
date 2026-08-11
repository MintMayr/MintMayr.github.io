<script setup lang="ts">
import Tag from '@/components/Tag.vue'
import type { Experience } from '@/types/types.ts'
import { formatDate } from '@/utils/utils.ts'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const TRUNCATE_LENGTH = 100
const isExpanded = ref(false)
const props = defineProps<{
  experience: Experience
}>()

const fullSummary = computed(() => t(props.experience.summary))
const isTruncatable = computed(() => fullSummary.value.length > TRUNCATE_LENGTH)

const truncatedSummary = computed(() => {
  if (!isTruncatable.value) return fullSummary.value
  return fullSummary.value.slice(0, TRUNCATE_LENGTH).trimEnd() + '...'
})
</script>

<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden flex w-full transition-colors p-6 gap-6"
  >
    <div class="w-16 h-16 sm:w-24 sm:h-24 shrink-0 rounded-lg p-2 flex items-center justify-center">
      <img
        :src="experience.imageUrl"
        :alt="t(experience.name) + ' Logo'"
        class="max-w-full max-h-full object-contain"
      />
    </div>
    <div class="flex-1 flex flex-col gap-4">
      <div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100">
          {{ t(experience.description) }}
        </h3>
        <div
          class="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-sm text-slate-600 dark:text-slate-400"
        >
          <span class="font-semibold text-blue-600 dark:text-blue-400">{{
            t(experience.name)
          }}</span>
          <span class="hidden sm:inline">&bull;</span>
          <span
            v-if="experience.grade_of_employment"
            class="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs"
            >{{ t(experience.grade_of_employment) }}</span
          >
          <span class="hidden sm:inline">&bull;</span>
          <span
            >{{ formatDate(experience.start_date, locale) }} -
            {{ formatDate(experience.end_date, locale) }}</span
          >
        </div>
      </div>
      <div class="text-slate-700 dark:text-slate-300 text-base leading-relaxed whitespace-pre-line text-justify">
        <div class="sm:hidden">
          <p>
            {{ isExpanded ? fullSummary : truncatedSummary }}
          </p>
          <button
            v-if="isTruncatable"
            @click="isExpanded = !isExpanded"
            class="text-blue-600 dark:text-blue-400 text-sm font-medium mt-1 hover:underline focus:outline-none"
          >
            {{ isExpanded ? t('general.readLess') : t('general.readMore') }}
          </button>
        </div>
        <p class="hidden sm:block">
          {{ fullSummary }}
        </p>
      </div>

      <div class="flex flex-wrap gap-2 mt-auto pt-2">
        <Tag v-for="tag in experience.tags" :key="tag.text" :tag="tag" />
      </div>
    </div>
  </div>
</template>
