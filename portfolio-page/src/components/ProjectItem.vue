<script setup lang="ts">
import Tag from "@/components/Tag.vue";
import type {Project} from "@/types/types.ts";
defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden flex w-full">
    <div class="w-40 shrink-0 p-4">
      <img
        :src="project.imageUrl"
        :alt="project.title + ' Logo'"
        class="w-full h-full object-contain"
      />
    </div>
    <div class="p-6 flex-1 flex flex-col gap-3">
      <h3 class="text-xl font-bold text-gray-900">{{ project.title }}</h3>
      <p class ="text-gray-600 text-base">
        {{ project.description}}
      </p>
      <div class="flex flex-wrap gap-2 mt-auto pt-2">
        <Tag
          v-for="tag in project.tags"
          :tag="tag"
        />
      </div>
    </div>
  </div>
</template>
