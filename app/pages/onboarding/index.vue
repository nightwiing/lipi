<template>
  <main class="h-dvh overflow-y-auto bg-background text-foreground">
    <div class="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center gap-8 px-6 py-12">
      <header class="space-y-2">
        <h1 class="text-2xl font-semibold">What would you like to practise?</h1>
        <p class="text-sm text-muted-foreground">
          Choose your language and level. Your chat will open once both are selected.
        </p>
      </header>

      <OnboardingSelector
        :model-value="languageStore.language"
        label="Choose a language"
        :options="languageStore.languageList"
        @update:model-value="selectLanguage"
      />

      <OnboardingSelector
        :model-value="languageStore.level"
        label="Choose your level"
        :options="languageStore.levelList"
        :disabled="!languageStore.language"
        @update:model-value="selectLevel"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()

function selectLanguage(value: string) {
  languageStore.language = value
  return openChatWhenReady()
}

function selectLevel(value: string) {
  languageStore.level = value
  return openChatWhenReady()
}

function openChatWhenReady() {
  if (languageStore.isComplete) return navigateTo('/', { replace: true })
}
</script>
