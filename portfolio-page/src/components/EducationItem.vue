<script setup lang="ts">
import Tag from '@/components/Tag.vue'
import type { Education } from '@/types/types.ts'
import { useI18n } from 'vue-i18n'
import { formatDate } from '@/utils/utils.ts'
import { ref } from 'vue'
const { t, locale } = useI18n()

defineProps<{
  education: Education
}>()
const showSkills = ref(false)
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
        {{ education.end_date ? t('general.graduation') + ':' : '' }}
        {{ education.end_date ? formatDate(education.end_date, locale) : t('general.present') }}
      </p>
      <div class="hidden sm:flex flex-wrap gap-1.5 mt-auto pt-2">
        <Tag v-for="skill in education.skills" :key="skill.text" :tag="skill" />
      </div>

      <div v-if="education.skills?.length" class="sm:hidden mt-2">
        <button
          @click="showSkills = !showSkills"
          class="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline focus:outline-none flex items-center gap-1 mx-auto lg:mx-0"
        >
          <svg
            class="w-3.5 h-3.5 transition-transform duration-200"
            :class="{ 'rotate-180': showSkills }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          {{ showSkills ? t('general.hideSkills') : t('general.showSkills') }}
        </button>
        <transition
          enter-active-class="transition-all duration-300 ease-out overflow-hidden"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-active-class="transition-all duration-200 ease-in overflow-hidden"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-show="showSkills" class="flex flex-wrap gap-1.5 pt-2 overflow-hidden">
            <Tag v-for="skill in education.skills" :key="skill.text" :tag="skill" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
