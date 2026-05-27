<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import ProjectItem from "@/components/ProjectItem.vue";
import type {Project} from "@/types/types.ts";
import { ChevronDownIcon , ChevronUpIcon} from "@heroicons/vue/24/outline"
import {ref} from "vue";

const projects: Project[] = [
  {
    id: 1,
    title: 'LiDARC',
    description: 'This is a brief description of the project. It outlines the core features and the problem it solves.',
    imageUrl: import.meta.env.BASE_URL + 'lidarc_logo.png',
    tags: [
      { text: 'Vue.js', color: 'blue' },
      { text: 'Tailwind', color: 'green' },
      { text: 'TypeScript', color: 'red' },
    ]
  },
  {
    id: 2,
    title: 'My project',
    description: 'A real-time weather tracking application using external APIs and interactive charts.',
    imageUrl: import.meta.env.BASE_URL + 'lidarc_logo.png',
    tags: [
      { text: 'Vue.js', color: 'blue' },
      { text: 'Tailwind', color: 'green' },
      { text: 'TypeScript', color: 'red' },
    ]
  },
];

const isOpen = ref(false);
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
