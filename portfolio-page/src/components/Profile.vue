<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/outline'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Github, Linkedin } from '@thesvg/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const phrases = [
  { text: 'Level: 25', font: "'Bytesized', monospace" },
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
let currentResolver: ((value: unknown) => void) | null = null

const sleep = (ms: number) =>
  new Promise((resolve) => {
    currentResolver = resolve
    sleepTimer = setTimeout(resolve, ms)
  })

function pickNextIndex(excluding: number): number {
  let nextIndex: number
  do {
    nextIndex = Math.floor(Math.random() * phrases.length)
  } while (nextIndex === excluding)
  return nextIndex
}

async function eraseText(text: string): Promise<void> {
  for (let i = text.length; i >= 0 && isAnimating; i--) {
    currentLevelText.value = text.substring(0, i)
    await sleep(80)
  }
}

async function typeText(text: string): Promise<void> {
  for (let i = 1; i <= text.length && isAnimating; i++) {
    currentLevelText.value = text.substring(0, i)
    await sleep(100)
  }
}

const typeWriterEffect = async () => {
  while (isAnimating) {
    await sleep(5000)
    if (!isAnimating) break

    await eraseText(phrases[currentIndex]!.text)

    await sleep(400)
    if (!isAnimating) break

    currentIndex = pickNextIndex(currentIndex)
    const nextPhraseObj = phrases[currentIndex]
    currentFont.value = nextPhraseObj!.font
    await typeText(nextPhraseObj!.text)
  }
}

onMounted(() => {
  typeWriterEffect()
})

onBeforeUnmount(() => {
  isAnimating = false
  clearTimeout(sleepTimer)
  if (currentResolver) currentResolver(null)
})
</script>

<template>
  <aside class="flex flex-col items-center md:items-start w-full md:w-64">
    <h1 class="text-3xl font-bold text-slate-800 mb-4 dark:text-slate-100">Michael Mayr</h1>
    <div
      class="w-full aspect-square mb-2 shadow-lg rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800"
    >
      <img
        src="/profile_picture.webp"
        alt="Michael Mayr"
        width="512"
        height="512"
        decoding="async"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex flex-col items-center md:items-start w-full mb-4">
      <span class="sr-only">{{ t('general.aboutScreenReader') }}</span>
      <div
        class="pixel-text flex items-center text-slate-700 dark:text-slate-300 min-h-10"
        :style="{ fontFamily: currentFont }"
      >
        <span aria-hidden="true">{{ currentLevelText }}</span>
        <span
          class="cursor-blink inline-block w-2.5 h-5 ml-1 bg-slate-700 dark:bg-slate-300"
        ></span>
      </div>
    </div>
    <h2 class="text-xl text-slate-700 dark:text-slate-300 font-semibold">
      {{ t('general.getInTouch') }}
    </h2>
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
