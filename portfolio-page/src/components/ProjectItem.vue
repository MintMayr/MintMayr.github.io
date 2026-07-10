<script setup lang="ts">
import Tag from "@/components/Tag.vue";
import type {Project} from "@/types/types.ts";
import {ref} from "vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n();
defineProps<{
  project: Project;
}>();

const isExpanded = ref(false);

</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden flex flex-col w-full transition-colors">
    <div
      @click="isExpanded = !isExpanded"
      class="relative w-full p-8 cursor-pointer group flex justify-center items-center bg-slate-50 dark:bg-slate-800/50">
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
        <div class="w-full h-48 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-2xl shadow-inner text-slate-400 dark:text-slate-500">
          <svg class="w-32 h-32 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
      </div>

    </div>
    <div class="p-6 flex flex-col">
      <div class="grid transition-all duration-300 ease-in-out"
           :class="isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
         >
        <div class="overflow-hidden">
          <div class="flex flex-col gap-4 pb-6">
            <div class="flex justify-between items-start gap-4">
              <h3 class="text-xl font-bold text-gray-900 dark:text-slate-100">
                {{ t(project.title) }}
              </h3>
              <div v-if="project.links && project.links.length > 0" class="flex flex-wrap justify-center gap-3">
                <a
                  v-for="link in project.links"
                  :key="link.href"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
                  <component :is="link.logo" variant="mono" class="w-6 h-6" />
                </a>
              </div>
            </div>
            <p class ="text-gray-600 dark:text-slate-300 text-base pb-3">
              {{ t(project.description) }}
            </p>

          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 mt-auto">
        <Tag
          v-for="tag in project.tags"
          :key="tag.text"
          :tag="tag"
        />
      </div>
    </div>
  </div>
</template>
