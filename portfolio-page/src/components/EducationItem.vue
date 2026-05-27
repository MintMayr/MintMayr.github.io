<script setup lang="ts">
import type {Education} from "@/types/types.ts";

defineProps<{
  education: Education;
}>();

</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-4 w-full flex">
    <div class="w-40 shrink-0">
      <img
        :src="education.imageUrl"
        :alt="education.institute + ' Logo'"
        class="w-full h-full object-contain"
      />
    </div>
    <div class="p-6 flex-1 flex flex-col gap-3">
      <h3 class="font-bold text-slate-800">{{ education.institute}}</h3>
      <p class="text-sm text-slate-500">{{ education.grade_of_education }}</p>
    </div>
  </div>
</template>
