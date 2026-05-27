<script setup lang="ts">
import { EnvelopeIcon } from "@heroicons/vue/24/outline";
import {onBeforeUnmount, onMounted, ref} from "vue";

const phrases = [
  { text: 'Level: 25...', font: "'Bytesized', monospace" },
  { text: 'Software Engineer...', font: "'VT323', monospace" },
  { text: 'I <3 to travel', font: "'Space Mono', monospace" },
  { text: 'Beer drinker 🍺', font: "'VT323', monospace" },
  { text: 'I like videogames 🎮', font: "'Space Mono', monospace" },
]
let currentIndex = Math.floor(Math.random() * phrases.length)
const currentLevelText = ref(phrases[currentIndex]!.text)
const currentFont = ref(phrases[currentIndex]!.font)

let isAnimating = true
let sleepTimer: ReturnType<typeof setTimeout>

const sleep = (ms: number) => new Promise(resolve => {
  sleepTimer = setTimeout(resolve, ms)
});

const typeWriterEffect = async () => {
  while (isAnimating) {
    await sleep(3000)
    if (!isAnimating) break;

    const currentPhrase = phrases[currentIndex]!.text

    for (let i = currentPhrase.length; i >= 0; i--) {
      currentLevelText.value = currentPhrase.substring(0, i)
      await sleep(80)
      if (!isAnimating) break;
    }

    await sleep(400)
    if (!isAnimating) break;

    let nextIndex
    do {
      nextIndex = Math.floor(Math.random() * phrases.length)
    } while (nextIndex === currentIndex)

    currentIndex = nextIndex
    const nextPhraseObj = phrases[currentIndex]
    currentFont.value = nextPhraseObj!.font

    for (let i = 1; i <= nextPhraseObj!.text.length; i++) {
      currentLevelText.value = nextPhraseObj!.text.substring(0,i)
      await sleep(100)
      if (!isAnimating) break;
    }
  }
};

onMounted(() => {
  typeWriterEffect()
});

onBeforeUnmount(() => {
  isAnimating = false
  clearTimeout((sleepTimer))
});
</script>

<template>
  <aside class="flex flex-col items-center md:items-start shrink-0 md:w-64">
    <h1 class="text-3xl font-bold text-slate-800 mb-4 dark:text-slate-100">Michael Mayr</h1>
    <div class="w-48 h-48 mb-2 shadow-lg rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shrink-0">
      <img
        src="/profile_picture.jpg"
        alt="Michael Mayr"
        class="w-full h-full object-cover"
      >
    </div>
    <div class="flex flex-col items-center md:items-start w-full mb-4">
      <div class="pixel-text flex items-center text-slate-700 dark:text-slate-300 min-h-10"
           :style="{ fontFamily: currentFont }">
        <span>{{ currentLevelText }}</span>
        <span class="cursor-blink inline-block w-2.5 h-5 ml-1 bg-slate-700 dark:bg-slate-300"></span>
      </div>
    </div>
    <div class="flex flex-row justify-center md:justify-start gap-5 w-full mt-2">
      <a href="https://github.com/MintMayr"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Visit my GitHub profile"
         class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
        </svg>
      </a>
      <a href="www.linkedin.com/in/micmayr"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Visit my LinkedIn profile"
         class="text-slate-600 dark:text-slate-400 hover:text-[#0a66c2] dark:hover:text-[#4ca3ff] transition-colors">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />        </svg>
      </a>
      <a href="mailto:m.mayr201100@gmail.com"
         aria-label="Send me an email"
         class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
        <EnvelopeIcon class="w-7 h-7" />
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

.cursor-blink{
  animation: terminalBlink 1s step-end infinite;
}


@keyframes terminalBlink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
