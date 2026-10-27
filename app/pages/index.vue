<template>
  <div class="flex h-dvh min-h-svh w-full overflow-hidden bg-background text-foreground">
    <ChatSidebar @new-chat="startNewChat" />

    <section class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <div
        class="flex shrink-0 items-center justify-between gap-3 border-b px-3 sm:px-4 md:h-14 md:px-6 md:pt-0"
      >
        <Button class="min-h-11 shrink-0 md:hidden" variant="ghost" size="sm" @click="startNewChat">
          New chat
        </Button>
      </div>

      <main
        ref="messagesContainer"
        class="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
        aria-live="polite"
      >
        <div
          v-if="!chatHistoryStore.chatHistory.length"
          class="mx-auto flex min-h-full max-w-3xl items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-12"
        >
          <div class="space-y-2">
            <h1 class="text-lg font-semibold sm:text-xl">
              How can I help you practise {{ languageStore.language }}?
            </h1>
            <p class="text-xs text-muted-foreground">Your level: {{ languageStore.level }}</p>
            <p class="text-sm text-muted-foreground">
              Ask for a translation, grammar help, or start a conversation.
            </p>
          </div>
        </div>

        <div
          v-else
          class="mx-auto w-full min-w-0 max-w-3xl space-y-5 px-3 py-5 sm:space-y-6 sm:px-4 sm:py-8 md:px-6"
        >
          <template v-for="chat in chatHistoryStore.chatHistory" :key="chat.id">
            <article class="flex min-w-0 justify-end">
              <div
                class="min-w-0 max-w-[92%] space-y-1.5 bg-muted px-3 py-2.5 sm:max-w-[85%] sm:px-4 sm:py-3 md:max-w-[75%]"
              >
                <p class="text-xs font-medium text-muted-foreground">You</p>
                <p class="whitespace-pre-wrap text-sm leading-6 wrap-anywhere">
                  {{ chat.userMessage }}
                </p>
              </div>
            </article>

            <article v-if="chat.response" class="flex min-w-0 justify-start">
              <div class="min-w-0 max-w-[92%] space-y-1.5 sm:max-w-[85%] md:max-w-[75%]">
                <p class="text-xs font-medium text-muted-foreground">Lipi</p>
                <ChatTutorResponse :response="chat.response" />
              </div>
            </article>
          </template>

          <div v-if="isSubmitting" class="text-sm text-muted-foreground">Lipi is thinking…</div>
          <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>
        </div>
      </main>

      <footer
        class="shrink-0 border-t bg-background px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-4 sm:pt-4 sm:pb-[calc(1rem+env(safe-area-inset-bottom))] md:px-6"
      >
        <form
          class="mx-auto flex w-full min-w-0 max-w-3xl items-end gap-2 sm:gap-3"
          @submit.prevent="submitMessage"
        >
          <Textarea
            v-model="message"
            rows="1"
            class="min-h-11 min-w-0 max-h-32 flex-1 resize-none border bg-transparent px-3 py-2.5 text-base leading-6 outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 sm:max-h-40 sm:text-sm"
            aria-label="Message"
            autocomplete="off"
            placeholder="Message Lipi"
            @keydown.enter="handleComposerKeydown"
          />
          <Button
            class="min-h-11 shrink-0 px-4"
            type="submit"
            :disabled="!message.trim() || isSubmitting"
          >
            Send
          </Button>
        </form>
        <p class="mx-auto mt-2 hidden w-full max-w-3xl text-xs text-muted-foreground sm:block">
          Press Enter to send · Shift + Enter for a new line
        </p>
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { TutorResponse } from '#shared/schemas/tutor-response'
import { useChatHistoryStore } from '@/stores/chat-history'
import { useLanguageStore } from '@/stores/language'

definePageMeta({
  middleware: () => {
    if (!useLanguageStore().isComplete) return navigateTo('/onboarding')
  },
})

const message = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const chatHistoryStore = useChatHistoryStore()
const languageStore = useLanguageStore()

async function scrollToLatestMessage() {
  await nextTick()

  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

function startNewChat() {
  message.value = ''
  chatHistoryStore.clearHistory()
  errorMessage.value = ''
}

function handleComposerKeydown(event: KeyboardEvent) {
  if (event.isComposing || event.shiftKey) return

  event.preventDefault()
  void submitMessage()
}

async function submitMessage() {
  const trimmedMessage = message.value.trim()
  if (!trimmedMessage || isSubmitting.value) return

  const chatId = chatHistoryStore.addChat(trimmedMessage)
  message.value = ''
  errorMessage.value = ''
  isSubmitting.value = true
  await scrollToLatestMessage()

  try {
    const result = await $fetch<{ response: TutorResponse }>('/api/chat', {
      method: 'POST',
      body: {
        message: trimmedMessage,
        language: languageStore.language,
        level: languageStore.level,
        chatHistory: chatHistoryStore.chatHistory,
      },
    })

    chatHistoryStore.setResponse(chatId, result.response)
  } catch (error) {
    const fetchError = error as { data?: { statusMessage?: string } }
    errorMessage.value = fetchError.data?.statusMessage || 'Unable to reach the AI model.'
  } finally {
    isSubmitting.value = false
    await scrollToLatestMessage()
  }
}
</script>
