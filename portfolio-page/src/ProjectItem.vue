<script setup lang="ts">
import Tag from "@/Tag.vue";
interface TagData {
  text: string;
  color?: 'blue' | 'teal' | 'yellow' | 'red' | 'green' | 'gray' | 'violet';
}
defineProps<{
  title: string;
  description: string;
  imageUrl: string;
  tags: TagData[] ;
}>();
</script>

<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden flex w-full">
    <div class="w-40 shrink-0 p-4">
      <img
        :src="imageUrl"
        :alt="title + ' Logo'"
        class="w-full h-full object-contain"
      />
    </div>
    <div class="p-6 flex-1 flex flex-col gap-3">
      <h3 class="text-xl font-bold text-gray-900">{{ title }}</h3>
      <p class ="text-gray-600 text-base">
        {{ description}}
      </p>
      <div class="flex flex-wrap gap-2 mt-auto pt-2">
        <Tag
          v-for="tag in tags"
          :key="tag.text"
          :color="tag.color"
          :text="tag.text"
        />
      </div>
    </div>
  </div>
</template>
