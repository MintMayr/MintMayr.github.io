import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'

import en from './locales/en.json'
import de from './locales/de.json'

type MessageSchema = typeof en
type Locales = 'en' | 'de'

const savedLocale = localStorage.getItem('user-locale') as Locales | null
const browserLang = navigator.language.split('-')[0]

const startingLocale: Locales = savedLocale || (browserLang === 'de' ? 'de' : 'en')

const i18n = createI18n<[MessageSchema], Locales>({
  locale: startingLocale,
  fallbackLocale: 'en',
  messages: {
    en: en,
    de: de,
  },
})

const app = createApp(App)

app.use(i18n)
app.mount('#app')
