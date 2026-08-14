<script setup lang="ts">
import ExperienceItem from '@/components/ExperienceItem.vue'
import type { Experience } from '@/types/types.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const experiences: Experience[] = [
  {
    id: 1,
    name: 'experience.siemens.company',
    description: 'experience.siemens.role',
    grade_of_employment: 'experience.part_time',
    start_date: new Date('2024-05-15T10:00:00'),
    end_date: new Date('2026-09-30T10:00:00'),
    summary: 'experience.siemens.summary',
    imageUrl: import.meta.env.BASE_URL + 'Siemens_AG_logo.svg.png',
    tags: [
      { text: 'tags.python', color: 'blue' },
      { text: 'tags.vuejs', color: 'green' },
      { text: 'tags.project_management', color: 'brown' },
    ],
  },
  {
    id: 2,
    name: 'experience.tu_wien.company',
    description: 'experience.tu_wien.role',
    grade_of_employment: 'experience.part_time',
    start_date: new Date('2023-10-01T10:00:00'),
    end_date: new Date('2026-06-30T10:00:00'),
    summary: 'experience.tu_wien.summary',
    imageUrl: import.meta.env.BASE_URL + 'TU_logo_transparent.png',
    tags: [
      { text: 'tags.project_management', color: 'blue' },
      { text: 'tags.java', color: 'green' },
      { text: 'tags.spring_boot', color: 'brown' },
      { text: 'tags.angular', color: 'violet' },
    ],
  },
  {
    id: 3,
    name: 'experience.wastics.company',
    description: 'experience.wastics.role',
    grade_of_employment: 'experience.part_time',
    start_date: new Date('2022-07-01T10:00:00'),
    end_date: new Date('2023-10-01T10:00:00'),
    summary: 'experience.wastics.summary',
    imageUrl: import.meta.env.BASE_URL + 'wastics_logo_transparent.png',
    tags: [
      { text: 'tags.java', color: 'green' },
      { text: 'tags.spring_boot', color: 'brown' },
      { text: 'tags.hibernate', color: 'gray' },
      { text: 'tags.angular', color: 'violet' },
      { text: 'tags.html_css', color: 'red' },
      { text: 'tags.scrum', color: 'yellow' },
    ],
  },
  {
    id: 4,
    name: 'experience.armed_forces.company',
    description: 'experience.armed_forces.role',
    grade_of_employment: 'experience.full_time',
    start_date: new Date('2020-10-01T10:00:00'),
    end_date: new Date('2021-06-01T10:00:00'),
    summary: 'experience.armed_forces.summary',
    imageUrl: import.meta.env.BASE_URL + 'bh_logo.svg',
    tags: [
      { text: 'tags.paramedic', color: 'red' },
      { text: 'tags.stress_management', color: 'yellow' },
      { text: 'tags.teamwork', color: 'blue' },
      { text: 'tags.communication', color: 'green' },
    ],
  },
]
</script>

<template>
  <div class="grid transition-all duration-300 ease-in-out">
    <div class="flex flex-col w-full divide-y-2 divide-slate-300">
      <div
        id="experience"
        class="text-3xl font-bold text-slate-800 mb-4 dark:text-slate-100"
      >
        {{ t('general.workExperience') }}
      </div>
      <div
        v-for="(experience, index) in experiences"
        :key="experience.id"
        class="py-4"
        :class="index === 0 ? 'pt-0' : ''"
      >
        <ExperienceItem :experience="experience" />
      </div>
      <div></div>
    </div>
  </div>
</template>
