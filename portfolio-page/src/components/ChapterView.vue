<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const chapters = [
  { id: 'experience', labelKey: 'general.workExperience' },
  { id: 'education', labelKey: 'general.educationTitle' },
  { id: 'projects', labelKey: 'general.myProjects' },
]

const activeId = ref<string>('experience')

let scrollHandler: (() => void) | null = null

const scrollToChapter = (id: string) => {
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const updateActiveChapter = () => {
  let current = 'experience'
  for (const chapter of chapters) {
    const el = document.getElementById(chapter.id)
    if (el && el.getBoundingClientRect().top <= 120) {
      current = chapter.id
    }
  }
  activeId.value = current
}

onMounted(() => {
  scrollHandler = () => updateActiveChapter()
  window.addEventListener('scroll', scrollHandler, { passive: true })
})

onBeforeUnmount(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>

<template>
  <nav class="flex flex-col items-center" aria-label="Sections">
    <div v-for="(chapter, index) in chapters" :key="chapter.id" class="flex flex-col items-center">
      <button
        @click="scrollToChapter(chapter.id)"
        class="cursor-pointer text-[10px] leading-tight tracking-wide uppercase transition-all duration-300"
        :class="
          activeId === chapter.id
            ? 'font-bold text-blue-500 scale-105'
            : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
        "
      >
        {{ t(chapter.labelKey) }}
      </button>
      <div
        v-if="index < chapters.length - 1"
        class="w-0.5 h-4 my-1 border-l-2 border-dotted border-slate-300 dark:border-slate-600"
      ></div>
    </div>
  </nav>
</template>
