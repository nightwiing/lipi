import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const languageList = [
    { label: 'Spanish', value: 'sp' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'ge' },
  ]
  const language = ref('sp')
  const levelList = [
    { label: 'A1 · Beginner', value: 'A1' },
    { label: 'A2 · Elementary', value: 'A2' },
    { label: 'B1 · Intermediate', value: 'B1' },
    { label: 'B2 · Upper intermediate', value: 'B2' },
    { label: 'C1 · Advanced', value: 'C1' },
    { label: 'C2 · Proficient', value: 'C2' },
  ]
  const level = ref('A1')
  const durationOptions = [
    { label: '5 Min', value: '5_min' },
    { label: '10 Min', value: '10_min' },
    { label: '15 Min', value: '15_min' },
  ]
  const duration = ref('5_min')

  const isComplete = computed(
    () =>
      languageList.some((option) => option.value === language.value) &&
      levelList.some((option) => option.value === level.value) &&
      durationOptions.some((option) => option.value === duration.value),
  )

  return { language, languageList, level, levelList, duration, durationOptions, isComplete }
})
