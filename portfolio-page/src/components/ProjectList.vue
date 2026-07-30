<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import ProjectItem from '@/components/ProjectItem.vue'
import type { Project } from '@/types/types.ts'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { Github } from '@thesvg/vue'

const projects: Project[] = [
  {
    id: 1,
    title: 'project.lidarc.title',
    description: 'project.lidarc.description',
    imageUrl: import.meta.env.BASE_URL + 'lidarc_logo_nobg.png',
    tags: [
      { text: 'tags.spring_boot', color: 'green' },
      { text: 'tags.angular', color: 'red' },
      { text: 'tags.typescript', color: 'blue' },
      { text: 'tags.rabbitmq', color: 'amber' },
      { text: 'tags.kubernetes', color: 'blue' },
      { text: 'tags.minio', color: 'rose' },
      { text: 'tags.python', color: 'emerald' },
      { text: 'tags.docker', color: 'blue' },
      { text: 'tags.redis', color: 'indigo' },
    ],
    links: [{ href: 'https://github.com/BFW-Remote-Sensing/LiDARC', logo: Github }],
  },
  {
    id: 2,
    title: 'project.willgraph.title',
    description: 'project.willgraph.description',
    tags: [
      { text: 'tags.neo4j', color: 'red' },
      { text: 'tags.python', color: 'yellow' },
      { text: 'tags.typescript', color: 'blue' },
      { text: 'tags.vuejs', color: 'green' },
      { text: 'tags.quasar', color: 'blue' },
      { text: 'tags.docker', color: 'blue' },
      { text: 'tags.spring_boot', color: 'green' },
    ],
    links: [{ href: 'https://github.com/Freyness-gd/willgraph', logo: Github }],
  },
  {
    id: 3,
    title: 'project.cryptocurrency.title',
    description:
      'project.cryptocurrency.description',
    tags: [
      { text: 'tags.cryptocurrency', color: 'blue' },
      { text: 'tags.algorithms', color: 'amber' },
      { text: 'tags.distributed_systems', color: 'green' },
      { text: 'tags.python', color: 'yellow' },
    ],
  },
  {
    id: 4,
    title: 'project.ontobinocular.title',
    description: 'project.ontobinocular.description',
    tags: [
      { text: 'tags.semantic_systems', color: 'blue' },
      { text: 'tags.rdf', color: 'brown' },
      { text: 'tags.jupyternotebook', color: 'blue' },
      { text: 'tags.arangodb', color: 'green' },
      { text: 'tags.python', color: 'yellow' },
    ],
    links: [{ href: 'https://github.com/MintMayr/bachelor_thesis', logo: Github }],
  },
]

const isOpen = ref(true)
const toggleProjects = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="w-full">
    <button
      @click="toggleProjects"
      class="w-full flex items-center justify-between text-3xl font-bold cursor-pointer text-slate-800 dark:text-slate-100 mb-4 p-3 rounded-lg hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
    >
      <span>My Projects</span>
      <ChevronDownIcon
        class="w-8 h-8 transition-transform duration-300"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </button>
  </div>
  <div
    class="grid transition-all duration-300 ease-in-out"
    :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
  >
    <div class="overflow-hidden">
      <div v-if="isOpen" class="flex flex-col w-full divide-y-2 divide-slate-300">
        <div v-for="project in projects" :key="project.id" class="py-4">
          <ProjectItem :project="project" :expand="project.id == 1" />
        </div>
      </div>
    </div>
  </div>
</template>
