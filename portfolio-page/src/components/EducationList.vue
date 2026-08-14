<script setup lang="ts">
import type { Education } from '@/types/types.ts'
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'
import EducationItem from '@/components/EducationItem.vue'
import { formatDate, sortedByDate } from '@/utils/utils.ts'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const educations: Education[] = [
  {
    id: 1,
    institute: 'education.institutes.tu_wien',
    imageUrl: import.meta.env.BASE_URL + 'TU_logo_transparent.png',
    grade_of_education: 'education.tu_wien_bsc',
    start_date: new Date('2021-10-01T10:00:00'),
    end_date: new Date('2025-09-01T10:00:00'),
    skills: [
      { text: 'tags.java', color: 'blue' },
      { text: 'tags.angular', color: 'red' },
      { text: 'tags.spring_boot', color: 'green' },
      { text: 'tags.calculus', color: 'brown' },
      { text: 'tags.database_systems', color: 'violet' },
      { text: 'tags.algorithms', color: 'teal' },
      { text: 'tags.software_design', color: 'indigo' },
    ],
  },
  {
    id: 2,
    institute: 'education.institutes.tu_wien',
    imageUrl: import.meta.env.BASE_URL + 'TU_logo_transparent.png',
    grade_of_education: 'education.tu_wien_msc',
    start_date: new Date('2025-10-01T10:00:00'),
    end_date: undefined,
    skills: [
      { text: 'tags.machine_learning', color: 'emerald' },
      { text: 'tags.semantic_systems', color: 'amber' },
      { text: 'tags.distributed_systems', color: 'rose' },
      { text: 'tags.problem_solving', color: 'orange' },
    ],
  },
  {
    id: 3,
    institute: 'education.institutes.htl_saalfelden',
    imageUrl: import.meta.env.BASE_URL + 'htl-logo.jpg',
    grade_of_education: 'education.htl_saalfelden',
    start_date: new Date('2015-09-01T10:00:00'),
    end_date: new Date('2020-06-01T10:00:00'),
    skills: [],
  },
]

const sortedEducations = computed(() => {
  return sortedByDate(educations)
})

const itemRefs = ref<HTMLElement[]>([])
const visibleItems = ref<Record<number, boolean>>({})
let observer: IntersectionObserver | null = null
onMounted(() => {
  const firstItem = sortedEducations.value[0]
  if (firstItem) {
    visibleItems.value[firstItem.id] = true
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement
          const id = Number(target.dataset.id)
          if (id) {
            visibleItems.value[id] = true
          }
          observer!.unobserve(target)
        }
      })
    },
    {
      rootMargin: '0px',
      threshold: 0.2,
    },
  )

  itemRefs.value.forEach((item) => {
    if (item) observer!.observe(item)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="relative w-full mx-auto py-12 overflow-hidden">
    <div
      id="education"
      class="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4"
    >
      {{ t('general.educationTitle') }}
    </div>
    <div
      class="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-300 dark:bg-slate-700 transform -translate-x-1/2 transition-colors mask-[linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]"
    ></div>
    <div
      v-for="(item, index) in sortedEducations"
      :key="item.id"
      :data-id="item.id"
      ref="itemRefs"
      class="relative flex items-stretch justify-between w-full mb-30 min-h-50"
      :class="index % 2 === 0 ? 'flex-row-reverse' : ''"
    >
      <div class="flex-1 min-w-0"></div>
      <div
        class="z-10 flex flex-col items-center w-24 shrink-0 transition-all duration-700 ease-out"
        :class="visibleItems[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div
          class="w-6 h-6 bg-slate-50 dark:bg-slate-900 border-[3px] border-blue-500 rounded-full shrink-0 relative flex justify-center transition-colors"
        >
          <span
            class="absolute bottom-full mb-2 text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded leading-none whitespace-nowrap transition-colors"
          >
            {{ formatDate(item.end_date, locale) }}
          </span>
        </div>

        <div
          class="w-1 bg-blue-500 flex-1 my-1 rounded-full origin-top relative shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-transform duration-700 delay-300 ease-out"
          :class="visibleItems[item.id] ? 'scale-y-100' : 'scale-y-0'"
        ></div>

        <div
          class="w-6 h-6 bg-blue-500 rounded-full shrink-0 relative flex justify-center transition-opacity duration-500 delay-700"
          :class="visibleItems[item.id] ? 'opacity-100' : 'opacity-0'"
        >
          <span
            class="absolute top-full mt-2 text-xs font-medium text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded leading-none whitespace-nowrap transition-colors"
          >
            {{ formatDate(item.start_date, locale) }}
          </span>
        </div>
      </div>
      <div
        class="flex-1 min-w-0 py-4 transition-all duration-700 delay-500 ease-out"
        :class="[
          visibleItems[item.id] ? 'opacity-100 translate-x-0' : 'opacity-0',
          !visibleItems[item.id] && index % 2 === 0 ? '-translate-x-12' : '',
          !visibleItems[item.id] && index % 2 !== 0 ? 'translate-x-12' : '',
        ]"
      >
        <EducationItem :education="item" />
      </div>
    </div>
  </div>
</template>
