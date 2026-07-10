<script setup lang="ts">
import type { Education } from '@/types/types.ts'
import { useI18n } from 'vue-i18n'
import { formatDate } from '@/utils/utils.ts'
const { t } = useI18n()

defineProps<{
  education: Education
}>()
</script>

<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 sm:p-6 w-full flex flex-col lg:flex-row text-center lg:text-left items-center gap-4 sm:gap-6 transition-colors"
  >
    <div
      class="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 shrink-0 rounded-lg p-1 sm:p-2 flex items-center justify-center"
    >
      <img
        :src="education.imageUrl"
        :alt="t(education.institute) + ' Logo'"
        class="w-full h-full object-contain"
      />
    </div>
    <div class="flex-1 min-w-0 flex flex-col justify-center gap-1 sm:gap-2">
      <h3
        class="font-bold text-base sm:text-lg md:text-xl text-slate-800 dark:text-slate-100 wrap-break-word"
      >
        {{ t(education.institute) }}
      </h3>
      <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-snug wrap-break-word">
        {{ t(education.grade_of_education) }}
      </p>
      <p class="text-xs text-slate-400 dark:text-slate-500 font-semibold tracking-wider mt-1">
        {{ education.end_date ? t('general.graduation') + ":" : '' }}
        {{ education.end_date ? formatDate(education.end_date) : t('general.present') }}
      </p>
    </div>
  </div>
</template>
