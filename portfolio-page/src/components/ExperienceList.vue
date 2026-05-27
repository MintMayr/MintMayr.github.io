<script setup lang="ts">

import ExperienceItem from "@/components/ExperienceItem.vue";
import type {Experience} from "@/types/types.ts";
import {sortedByDate} from "@/utils/utils.ts";

const experiences: Experience[] = [
  {
    id: 1,
    name: 'Siemens Mobility Austria GmbH',
    start_date: new Date('2023-05-15T10:00:00'),
    end_date: new Date('2026-08-31T10:00:00'),
    summary: 'This is a test summary!',
    tags: [
      { text: 'Python', color: 'blue' },
      { text: 'Vue.js', color: 'green' },
      { text: 'Project Management', color: 'brown' },
    ],
  },
  {
    id: 2,
    name: 'TU Wien',
    start_date: new Date('2023-10-01T10:00:00'),
    end_date: new Date('2026-06-30T10:00:00'),
    summary: 'This is a test summary!',
    tags: [
      { text: 'Project Management', color: 'blue' },
      { text: 'Java', color: 'green' },
      { text: 'Spring Boot', color: 'brown' },
      { text: 'Angular', color: 'violet' },
    ],
  },
  {
    id: 3,
    name: 'Wastics GmbH',
    start_date: new Date('2023-05-15T10:00:00'),
    end_date: new Date('2021-08-31T10:00:00'),
    summary: 'This is a test summary!',
    tags: [
      { text: 'Docker', color: 'blue' },
      { text: 'Java', color: 'green' },
      { text: 'Spring Boot', color: 'brown' },
      { text: 'Angular', color: 'violet' },
    ],
  },

];
</script>

<template>
  <div class="grid transition-all duration-300 ease-in-out">
    <div class="flex flex-col w-full divide-y-2 divide-slate-300">
      <div class="text-3xl font-bold text-slate-800 mb-4 dark:text-slate-100">Work Experience</div>
      <div v-for="experience in experiences" :key="experience.id" class="py-4">
        <ExperienceItem
          :experience="experience"
        />
      </div>
      <div></div>
    </div>
  </div>
</template>
