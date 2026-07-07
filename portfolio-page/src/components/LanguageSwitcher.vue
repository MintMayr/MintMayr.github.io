<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale } = useI18n()
const switchLanguage = (newLang: 'en' | 'de') => {
  locale.value = newLang
  localStorage.setItem('user-locale', newLang)
}
</script>

<template>
  <div class="flex gap-2">
    <button
      @click="switchLanguage('en')"
      class="cursor-pointer"
      :class="locale === 'en' ? 'font-bold text-blue-500' : 'text-slate-500'"
    >
      EN
    </button>
    <button
      @click="switchLanguage('de')"
      class="cursor-pointer"
      :class="locale === 'de' ? 'font-bold text-blue-500' : 'text-slate-500'"
    >
      DE
    </button>
  </div>
</template>

<style scoped></style>
