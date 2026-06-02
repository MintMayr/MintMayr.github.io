<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import ProjectItem from "@/components/ProjectItem.vue";
import type {Project} from "@/types/types.ts";
import { ChevronDownIcon } from "@heroicons/vue/24/outline"
import {ref} from "vue";
import {Github} from "@thesvg/vue";

const projects: Project[] = [
  {
    id: 1,
    title: 'LiDARC',
    description: 'This system provides an interactive platform for uploading, processing, and comparing\n' +
      'pointcloud sets with a focus on efficient analysis and clear visual feedback. Users can\n' +
      'submit data through a web-based interface, trigger a comparison, and explore the resulting\n' +
      'analyses through interactive visualizations. The system is designed to handle\n' +
      'computationally intensive tasks in the background, allowing users to continue working\n' +
      'without interruption while results are generated asynchronously. Created Results can be\n' +
      'viewed and additionally downloaded as a Report.',
    imageUrl: import.meta.env.BASE_URL + 'lidarc_logo_nobg.png',
    tags: [
      { text: 'Spring Boot', color: 'green' },
      { text: 'Angular', color: 'red' },
      { text: 'TypeScript', color: 'blue' },
      { text: 'RabbitMQ', color: 'amber' },
      { text: 'Kubernetes', color: 'blue' },
      { text: 'MinIO', color: 'rose' },
      { text: 'Python', color: 'emerald' },
      { text: 'Docker', color: 'blue' },
      { text: 'Redis', color: 'indigo' },
    ],
    links: [
      { href: 'https://github.com/BFW-Remote-Sensing/LiDARC', logo: Github},
    ]
  },
  {
    id: 2,
    title: 'My project',
    description: 'A real-time weather tracking application using external APIs and interactive charts.',
    tags: [
      { text: 'Vue.js', color: 'blue' },
      { text: 'Tailwind', color: 'green' },
      { text: 'TypeScript', color: 'red' },
    ]
  },
];

const isOpen = ref(true);
const toggleProjects = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="w-full">
    <button
      @click="toggleProjects"
      class="w-full flex items-center justify-between text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 p-3 rounded-lg hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors">
     <span>My Projects</span>
        <ChevronDownIcon class="w-8 h-8 transition-transform duration-300"
                         :class="isOpen ? 'rotate-180' : ''"/>
    </button>
  </div>
  <div class="grid transition-all duration-300 ease-in-out"
  :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
    <div class="overflow-hidden">
      <div v-if="isOpen" class="flex flex-col w-full divide-y-2 divide-slate-300">
        <div v-for="project in projects" :key="project.id" class="py-4">
          <ProjectItem
            :project="project"
          />
        </div>
      </div>
    </div>
  </div>
</template>
