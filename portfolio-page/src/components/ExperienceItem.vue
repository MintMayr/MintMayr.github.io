<script setup lang="ts">

import Tag from "@/components/Tag.vue";
import type {Experience} from "@/types/types.ts";
import {formatDate} from "@/utils/utils.ts";

defineProps<{
  experience: Experience;
}>();
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden flex w-full transition-colors">
    <div class="p-6 flex-1 flex flex-col gap-3">
      <h3 class="text-xl font-bold text-gray-900 dark:text-slate-100">
        {{ experience.name }}
      </h3>
      <p class="text-gray-500 dark:text-slate-400 text-base">
        {{ formatDate(experience.start_date) }} - {{ formatDate(experience.end_date) }}
      </p>
      <p class="text-gray-700 dark:text-slate-300 text-base">
        {{ experience.summary }}
      </p>
      <div class="flex flex-wrap gap-2 mt-auto pt-2">
        <Tag v-for="tag in experience.tags"
             :tag="tag"/>
      </div>
    </div>
  </div>
</template>
