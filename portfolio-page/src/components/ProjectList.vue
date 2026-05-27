<script setup lang="ts">
import ProjectItem from "@/components/ProjectItem.vue";
import type {Project} from "@/types/types.ts";
{}
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
</script>

<template>
  <div class="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 w-full">My Projects</div>
  <div class="flex flex-col w-full divide-y-2 divide-slate-300">
    <div v-for="project in projects" :key="project.id" class="py-4">
      <ProjectItem
        :project="project"
      />
    </div>
  </div>
</template>
