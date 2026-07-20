import { create } from 'zustand'
import en from '@/locales/en.json'
import zh from '@/locales/zh.json'
import es from '@/locales/es.json'
import ja from '@/locales/ja.json'

export type Locale = 'en' | 'zh' | 'es' | 'ja'

const messages: Record<string, any> = { en, zh, es, ja }

interface I18nState {
  locale: Locale
  setLocale: (newLocale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
  tm: (key: string) => any
}

export const useI18nStore = create<I18nState>()((set, get) => ({
  locale: typeof window !== 'undefined' ? (localStorage.getItem('bgg_locale') as Locale) || 'en' : 'en',
  
  setLocale: (newLocale: Locale) => {
    set({ locale: newLocale })
    if (typeof window !== 'undefined') {
      localStorage.setItem('bgg_locale', newLocale)
    }
  },

  t: (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.')
    let value = messages[get().locale]

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        return key // Fallback to key itself
      }
    }

    let result = typeof value === 'string' ? value : key

    // Replace parameters like {platform} with actual values
    if (params) {
      Object.keys(params).forEach(paramKey => {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(params[paramKey]))
      })
    }

    return result
  },

  tm: (key: string): any => {
    const keys = key.split('.')
    let value = messages[get().locale]

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        return {}
      }
    }
    return value
  }
}))
