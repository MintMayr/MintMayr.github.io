<script setup lang="ts">
import ProjectList from '@/components/ProjectList.vue'
import EducationList from '@/components/EducationList.vue'
import ExperienceList from '@/components/ExperienceList.vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { onMounted, ref } from 'vue'
import Profile from '@/components/Profile.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const isDark = ref(false)
const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  if (
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && globalThis.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <main class="max-w-360 mx-auto p-4 pb-64 flex flex-col md:flex-row gap-6 items-start">
    <button
      @click="toggleTheme"
      class="cursor-pointer absolute top-4 right-4 p-2 rounded-full flex flex-col justify-center items-center gap-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
    >
      <SunIcon v-if="isDark" class="w-8 h-8" />
      <MoonIcon v-if="!isDark" class="w-8 h-8" />
      {{ isDark ? 'Light' : 'Dark' }}
    </button>

    <Profile />
    <div class="flex flex-col flex-1 w-full gap-8">
      <ExperienceList />
      <EducationList />
      <ProjectList />
    </div>
    <LanguageSwitcher />
  </main>
</template>
