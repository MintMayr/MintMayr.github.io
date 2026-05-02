<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  text: string;
  color?: 'blue' | 'teal' | 'yellow' | 'red' | 'green' | 'gray' | 'violet';
}>();
const colorVariants: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-800',
  teal: 'bg-teal-100 text-teal-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  green: 'bg-green-100 text-green-800',
  gray: 'bg-gray-100 text-gray-800',
  violet: 'bg-violet-100 text-violet-800',
};

const activeColorClass = computed(() =>{
  return colorVariants[props.color || 'gray'];
});
</script>

<template>
  <span :class="[
    'px-3 py-1 text-xs font-medium rounded-full',
    activeColorClass
    ]"
        >
    {{ text }}
  </span>
</template>
