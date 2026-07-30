<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/outline'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Github, Linkedin } from '@thesvg/vue'

const phrases = [
  { text: 'Level: 25...', font: "'Bytesized', monospace" },
  { text: 'Software Engineer 💻', font: "'VT323', monospace" },
  { text: 'I like to travel ✈️', font: "'Space Mono', monospace" },
  { text: 'I like video games 🎮', font: "'Bytesized', monospace" },
  { text: '💚 Nature', font: "'VT323', monospace" },
  { text: 'Taking 📷 of Animals', font: "'Space Mono', monospace" },
]
let currentIndex = Math.floor(Math.random() * phrases.length)
const currentLevelText = ref(phrases[currentIndex]!.text)
const currentFont = ref(phrases[currentIndex]!.font)

let isAnimating = true
let sleepTimer: ReturnType<typeof setTimeout>

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    sleepTimer = setTimeout(() => {
      if (isAnimating) resolve()
    }, ms)
  })

const typeWriterEffect = async () => {
  while (isAnimating) {
    await sleep(3000)
    if (!isAnimating) break

    const currentPhrase = phrases[currentIndex]!.text

    for (let i = currentPhrase.length; i >= 0; i--) {
      currentLevelText.value = currentPhrase.substring(0, i)
      await sleep(80)
      if (!isAnimating) break
    }

    await sleep(400)
    if (!isAnimating) break

    let nextIndex
    do {
      nextIndex = Math.floor(Math.random() * phrases.length)
    } while (nextIndex === currentIndex)

    currentIndex = nextIndex
    const nextPhraseObj = phrases[currentIndex]
    currentFont.value = nextPhraseObj!.font

    for (let i = 1; i <= nextPhraseObj!.text.length; i++) {
      currentLevelText.value = nextPhraseObj!.text.substring(0, i)
      await sleep(100)
      if (!isAnimating) break
    }
  }
}

onMounted(() => {
  typeWriterEffect()
})

onBeforeUnmount(() => {
  isAnimating = false
  clearTimeout(sleepTimer)
})
</script>

<template>
  <aside class="flex flex-col items-center md:items-start shrink-0 md:w-64">
    <h1 class="text-3xl font-bold text-slate-800 mb-4 dark:text-slate-100">Michael Mayr</h1>
    <div
      class="w-48 h-48 mb-2 shadow-lg rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shrink-0"
    >
      <img src="/profile_picture.jpg" alt="Michael Mayr" class="w-full h-full object-cover" />
    </div>
    <div class="flex flex-col items-center md:items-start w-full mb-4">
      <div
        class="pixel-text flex items-center text-slate-700 dark:text-slate-300 min-h-10"
        :style="{ fontFamily: currentFont }"
      >
        <span>{{ currentLevelText }}</span>
        <span
          class="cursor-blink inline-block w-2.5 h-5 ml-1 bg-slate-700 dark:bg-slate-300"
        ></span>
      </div>
    </div>
    <div class="flex flex-row justify-center md:justify-start items-center gap-5 w-full">
      <a
        href="https://github.com/MintMayr"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit my GitHub profile"
        class="text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100 [&_path]:fill-current hover:scale-110 transition-all"
      >
        <Github variant="mono" class="w-8 h-8" />
      </a>
      <a
        href="https://linkedin.com/in/micmayr"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit my LinkedIn profile"
        class="text-slate-800 dark:text-slate-200 hover:text-[#0a66c2] dark:hover:text-[#4ca3ff] [&_path]:fill-current hover:scale-110 transition-all"
      >
        <Linkedin variant="mono" class="w-8 h-8" />
      </a>
      <a
        href="mailto:m.mayr201100@gmail.com"
        aria-label="Send me an email"
        class="text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100 hover:scale-110 transition-all"
      >
        <EnvelopeIcon class="w-9 h-9" />
      </a>
    </div>
  </aside>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bytesized&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.pixel-text {
  font-weight: 400;
  font-size: 1.25rem;
  letter-spacing: -0.025em;
}

.cursor-blink {
  animation: terminalBlink 1s step-end infinite;
}

@keyframes terminalBlink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
