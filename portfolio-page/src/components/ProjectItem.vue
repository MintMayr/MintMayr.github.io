<script setup lang="ts">
import Tag from '@/components/Tag.vue'
import type { Project } from '@/types/types.ts'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
defineProps<{
  project: Project
}>()

const isExpanded = ref(false)
</script>

<template>
  <div
    class="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-md overflow-hidden flex flex-col w-full transition-colors"
  >
    <div
      @click="isExpanded = !isExpanded"
      class="relative w-full p-8 cursor-pointer group flex justify-center items-center bg-slate-50/50 dark:bg-slate-800/50"
    >
      <img
        v-if="project.imageUrl"
        :src="project.imageUrl"
        :alt="project.title + ' Logo'"
        class="w-full h-48 object-contain transition-transform duration-300 ease-out group-hover:scale-105"
      />
      <div
        v-else
        class="w-full h-48 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105"
      >
        <div
          class="w-full h-48 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-2xl shadow-inner text-slate-400 dark:text-slate-500"
        >
          <h2 class="text-4xl text-slate-400 dark:text-slate-100">{{ t(project.title) }}</h2>
        </div>
      </div>
    </div>
    <div class="p-6 flex flex-col">
      <div
        class="grid transition-all duration-300 ease-in-out"
        :class="isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
      >
        <div class="overflow-hidden">
          <div class="flex flex-col gap-4 pb-6">
            <div class="flex justify-between items-start gap-4">
              <h3 class="text-xl font-bold text-gray-900 dark:text-slate-100">
                {{ t(project.title) }}
              </h3>
              <div
                v-if="project.links && project.links.length > 0"
                class="flex flex-wrap justify-center gap-3"
              >
                <a
                  v-for="link in project.links"
                  :key="link.href"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                >
                  <component :is="link.logo" variant="mono" class="w-6 h-6" />
                </a>
              </div>
            </div>
            <p class="text-gray-600 dark:text-slate-300 text-base pb-3">
              {{ t(project.description) }}
            </p>
          </div>
        </div>
      </div>
      <h1 v-if="!isExpanded" class="text-xl font-bold ">
        {{ t(project.title) }}
      </h1>
      <div class="flex flex-wrap gap-2 mt-auto">
        <p class="text-slate-800 dark:text-slate-100">Used Tech / Skills:</p>
        <Tag v-for="tag in project.tags" :key="tag.text" :tag="tag" />
      </div>
    </div>
  </div>
</template>
