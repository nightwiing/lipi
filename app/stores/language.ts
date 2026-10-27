import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const languageList = [
    { label: 'Spanish', value: 'Spanish' },
    { label: 'French', value: 'French' },
    { label: 'German', value: 'German' },
  ]
  const language = ref('')
  const levelList = [
    { label: 'A1 · Beginner', value: 'A1' },
    { label: 'A2 · Elementary', value: 'A2' },
    { label: 'B1 · Intermediate', value: 'B1' },
    { label: 'B2 · Upper intermediate', value: 'B2' },
    { label: 'C1 · Advanced', value: 'C1' },
    { label: 'C2 · Proficient', value: 'C2' },
  ]
  const level = ref('')

  const isComplete = computed(
    () =>
      languageList.some((option) => option.value === language.value) &&
      levelList.some((option) => option.value === level.value),
  )

  return { language, languageList, level, levelList, isComplete }
})
