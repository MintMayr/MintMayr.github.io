<script setup lang="ts">
import type {Education} from "@/types/types.ts";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
  education: Education;
}>();

</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 w-full flex transition-colors">
    <div class="w-40 shrink-0 bg-white dark:bg-slate-200 rounded-lg p-2 flex items-center justify-center">
      <img
        :src="education.imageUrl"
        :alt="t(education.institute) + ' Logo'"
        class="w-full h-full object-contain"
      />
    </div>
    <div class="p-6 flex-1 flex flex-col gap-3">
      <h3 class="font-bold text-slate-800 dark:text-slate-100">{{ t(education.institute)}}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ t(education.grade_of_education) }}</p>
    </div>
  </div>
</template>
