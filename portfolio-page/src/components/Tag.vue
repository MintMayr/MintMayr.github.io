<script setup lang="ts">
import { computed } from 'vue';
import type {TagData} from "@/types/types.ts";
const props = defineProps<{
  tag: TagData;
}>();
const colorVariants: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-800',
  teal: 'bg-teal-100 text-teal-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  green: 'bg-green-100 text-green-800',
  gray: 'bg-gray-100 text-gray-800',
  violet: 'bg-violet-100 text-violet-800',
  brown: 'bg-stone-200 text-stone-800',
  indigo: 'bg-indigo-100 text-indigo-800',
  purple: 'bg-purple-100 text-purple-800',
  pink: 'bg-pink-100 text-pink-800',
  orange: 'bg-orange-100 text-orange-800',
  cyan: 'bg-cyan-100 text-cyan-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  rose: 'bg-rose-100 text-rose-800',
  amber: 'bg-amber-100 text-amber-800',
};

const activeColorClass = computed(() =>{
  return colorVariants[props.tag.color || 'gray'];
});
</script>

<template>
  <span :class="[
    'px-3 py-1 text-xs font-medium rounded-full',
    activeColorClass
    ]"
        >
    {{ tag.text }}
  </span>
</template>
