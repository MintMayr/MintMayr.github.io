<script setup lang="ts">
import ProjectList from '@/components/ProjectList.vue'
import EducationList from '@/components/EducationList.vue'
import ExperienceList from '@/components/ExperienceList.vue'
import PortfolioGraph from './components/PortfolioGraph.vue'
import { SunIcon, MoonIcon, DocumentTextIcon, ShareIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import Profile from '@/components/Profile.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isDark = ref(
  localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && globalThis.matchMedia('(prefers-color-scheme: dark)').matches),
)

if (isDark.value) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

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

const showGraph = ref(false)
const toggleView = () => {
  showGraph.value = !showGraph.value
}
</script>

<template>
  <main
    class="max-w-360 mx-auto p-4 grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] gap-6 items-start"
  >
    <div class="order-1 md:order-1 flex flex-col items-center md:items-start gap-4">
      <Profile />
      <button
        @click="toggleView"
        class="flex items-center justify-center flex-col gap-3 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer w-full md:w-64 text-center"
      >
        <component
          :is="showGraph ? DocumentTextIcon : ShareIcon"
          class="w-8 h-8 text-amber-500 shrink-0"
        />
        <span class="font-medium text-slate-800 dark:text-slate-100">
          {{ showGraph ? t('general.staticCV') : t('general.cvGraph') }}
        </span>
      </button>
    </div>

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
    <div class="col-span-2 md:col-span-1 order-3 md:order-2 grid w-full">
      <Transition name="cv-fade">
        <div v-show="!showGraph" class="col-start-1 pb-64 row-start-1 flex flex-col w-full gap-8">
          <ExperienceList />
          <EducationList />
          <ProjectList />
        </div>
      </Transition>
      <Transition name="cv-fade">
        <PortfolioGraph v-show="showGraph" class="col-start-1 row-start-1" />
      </Transition>
    </div>
  </main>
</template>
<style scoped>
.cv-fade-enter-active,
.cv-fade-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}
.cv-fade-enter-from,
.cv-fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>
