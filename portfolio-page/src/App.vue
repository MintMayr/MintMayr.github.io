<script setup lang="ts">
import ProjectList from '@/components/ProjectList.vue'
import EducationList from '@/components/EducationList.vue'
import ExperienceList from '@/components/ExperienceList.vue'
import PortfolioGraph from './components/PortfolioGraph.vue'
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
  <main
    class="max-w-360 mx-auto p-4 pb-64 grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] gap-6 items-start"
  >
    <Profile class="order-1 md:order-1" />
    <div class="flex justify-end order-2 md:order-3">
      <div class="flex flex-col items-center gap-2">
        <button
          @click="toggleTheme"
          class="cursor-pointer p-2 rounded-full flex flex-col justify-center items-center gap-2 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          <SunIcon v-if="isDark" class="w-6 h-6" />
          <MoonIcon v-else class="w-6 h-6" />
        </button>
        <LanguageSwitcher />
      </div>
    </div>

    <!--- <div class="col-span-2 md:col-span-1 flex flex-col w-full gap-8 order-3 md:order-2">
       <ExperienceList />
      <EducationList />
      <ProjectList />
    </div>-->
    <PortfolioGraph class="order-2" />
  </main>
</template>
