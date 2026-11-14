<template>
  <div class="flex h-dvh min-h-svh w-full overflow-hidden bg-background text-foreground">
    <ChatSidebar />

    <section class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <header
        class="flex min-h-14 shrink-0 flex-wrap items-center gap-x-4 gap-y-1 border-b px-3 py-3 sm:px-4 md:px-6"
      >
        <p class="text-sm font-medium">Language: {{ selectedLanguage }}</p>
        <p class="text-sm text-muted-foreground">Level: {{ selectedLevel }}</p>
      </header>

      <main class="min-h-0 min-w-0 flex-1" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'

definePageMeta({
  middleware: () => {
    if (!useLanguageStore().isComplete) return navigateTo('/onboarding')
  },
})

const languageStore = useLanguageStore()

const selectedLanguage = computed(
  () => languageStore.languageList.find((option) => option.value === languageStore.language)?.label,
)
const selectedLevel = computed(
  () => languageStore.levelList.find((option) => option.value === languageStore.level)?.label,
)
</script>
