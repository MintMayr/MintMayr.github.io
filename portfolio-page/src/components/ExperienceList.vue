<script setup lang="ts">

import ExperienceItem from "@/components/ExperienceItem.vue";
import type {Experience} from "@/types/types.ts";

const experiences: Experience[] = [
  {
    id: 1,
    name: 'Siemens Mobility Austria GmbH',
    description: 'Working Student Technical - System Architect',
    start_date: new Date('2024-05-15T10:00:00'),
    end_date: new Date('2026-08-31T10:00:00'),
    summary: 'This is a test summary!',
    imageUrl: import.meta.env.BASE_URL + "Siemens_AG_logo.svg.png",
    tags: [
      { text: 'Python', color: 'blue' },
      { text: 'Vue.js', color: 'green' },
      { text: 'Project Management', color: 'brown' },
    ],
  },
  {
    id: 2,
    name: 'TU Wien',
    description: 'Tutor (Advanced) Software Engineering Project',
    start_date: new Date('2023-10-01T10:00:00'),
    end_date: new Date('2026-06-30T10:00:00'),
    summary: 'Supporting students groups throughout the semester to develop their Software Engineering Project. Tutoring both master and bachelor students.',
    imageUrl: import.meta.env.BASE_URL + "TU_logo_transparent.png",
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
    description: 'Working Student - Software Developer',
    start_date: new Date('2022-07-01T10:00:00'),
    end_date: new Date('2023-10-01T10:00:00'),
    summary: 'Worked in a small team and got first-hand backend and frontend experience with Spring Boot and Angular. While mainly focused on the backend from the get go I also got great insights into Angular in combination with frontend languages such as HTML, CSS and Typescript. Furthermore i configured the keycloak realms and helped with deployment on docker.',
    imageUrl: import.meta.env.BASE_URL + "wastics_logo_transparent.png",
    tags: [
      { text: 'Java', color: 'green' },
      { text: 'Spring Boot', color: 'brown' },
      { text: 'Hibernate', color: 'gray' },
      { text: 'Angular', color: 'violet' },
      { text: 'HTML & CSS', color: 'red' },
      { text: 'Scrum', color: 'yellow' },
    ],
  },
  {
    id: 3,
    name: 'Österreichisches Bundesheer (Austrian Armed Forces)',
    description: 'Military Service',
    start_date: new Date('2020-10-01T10:00:00'),
    end_date: new Date('2021-06-01T10:00:00'),
    summary: 'Mandatory basic military service at the Austrian Armed Forces trained as a paramedic for six months. Plus three months of voluntary service at the Covid center. Active militiaman at Austrian Armed Forces.',
    imageUrl: import.meta.env.BASE_URL + "bh_logo.svg",
    tags: [
      { text: 'Paramedic', color: 'red' },
      { text: 'Stress Management', color: 'yellow' },
      { text: 'Teamwork', color: 'blue' },
      { text: 'Communication', color: 'green' },
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
