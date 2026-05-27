<script setup lang="ts">
import type {Education} from "@/types/types.ts";
import {computed, onMounted, ref} from "vue";
import EducationItem from "@/components/EducationItem.vue";
import {formatDate, sortedByDate} from "@/utils/utils.ts";

const educations: Education[] = [
  {
    id: 1,
    institute: "TU Wien",
    imageUrl: import.meta.env.BASE_URL + "TU_logo.png",
    grade_of_education: "Bachelor of Science - BSc, Computer Science",
    start_date: new Date("2021-10-01T10:00:00"),
    end_date: new Date("2025-09-01T10:00:00"),
    skills: []
  },
  {
    id: 2,
    institute: "TU Wien",
    imageUrl: import.meta.env.BASE_URL + "TU_logo.png",
    grade_of_education: "Master of Science - MSc, Computer Science",
    start_date: new Date("2025-10-01T10:00:00"),
    end_date: undefined,
    skills: []
  },
  {
    id: 3,
    institute: "HTL Saalfelden",
    imageUrl: import.meta.env.BASE_URL + "htl-logo.jpg",
    grade_of_education: "Matura, Elektrotechnik",
    start_date: new Date("2015-09-01T10:00:00"),
    end_date: new Date("2020-06-01T10:00:00"),
    skills: []
  }
];

const sortedEducations = computed(() => {
  return sortedByDate(educations)
});

const itemRefs = ref<HTMLElement[]>([]);
const visibleItems = ref<Record<number, boolean>>({});

onMounted(() => {
  const firstItem = sortedEducations.value[0];
  if (firstItem) {
    visibleItems.value[firstItem.id] = true;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const id = Number(target.dataset.id);
          if (id) {
            visibleItems.value[id] = true;
          }
          observer.unobserve(target);
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  itemRefs.value.forEach((item) => {
    if (item) observer.observe(item);
  });
});
</script>

<template>
  <div class="relative w-full mx-auto py-12 overflow-hidden">
    <div class="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
      Education
    </div>
    <div class="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-300 dark:bg-slate-700 transform -translate-x-1/2 transition-colors mask-[linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]"></div>
    <div
      v-for="(item, index) in sortedEducations"
      :key="item.id"
      :data-id="item.id"
      ref="itemRefs"
      class="relative flex items-stretch justify-between w-full mb-30 min-h-50"
      :class="index % 2 === 0 ? 'flex-row-reverse' : ''">

      <div class="flex-1 w-full"></div>

      <div class="z-10 flex flex-col items-center w-24 shrink-0 transition-all duration-700 ease-out"
           :class="visibleItems[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">

        <div class="w-6 h-6 bg-slate-50 dark:bg-slate-900 border-[3px] border-blue-500 rounded-full shrink-0 relative flex justify-center transition-colors">
          <span class="absolute bottom-full mb-2 text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded leading-none whitespace-nowrap transition-colors">
            {{ formatDate(item.end_date) }}
          </span>
        </div>

        <div class="w-1 bg-blue-500 flex-1 my-1 rounded-full origin-top relative shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-transform duration-700 delay-300 ease-out"
             :class="visibleItems[item.id] ? 'scale-y-100' : 'scale-y-0'"></div>

        <div class="w-6 h-6 bg-blue-500 rounded-full shrink-0 relative flex justify-center transition-opacity duration-500 delay-700"
             :class="visibleItems[item.id] ? 'opacity-100' : 'opacity-0'">
          <span class="absolute top-full mt-2 text-xs font-medium text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded leading-none whitespace-nowrap transition-colors">
            {{ formatDate(item.start_date) }}
          </span>
        </div>

      </div>
      <div class="flex-1 w-full py-4 transition-all duration-700 delay-500 ease-out"
           :class="[
          visibleItems[item.id] ? 'opacity-100 translate-x-0' : 'opacity-0',
          !visibleItems[item.id] && index % 2 === 0 ? '-translate-x-12' : '',
          !visibleItems[item.id] && index % 2 !== 0 ? 'translate-x-12' : ''
        ]">
        <EducationItem :education="item"/>
      </div>
    </div>
  </div>
</template>
