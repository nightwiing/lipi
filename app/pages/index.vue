<script setup lang="ts">
import type { TutorResponse } from '#shared/schemas/tutor-response'

import TutorResponseView from '@/components/chat/TutorResponse.vue'
import { useChatHistoryStore } from '@/stores/chat-history'

const message = ref('')
const language = 'Spanish'
const errorMessage = ref('')
const isSubmitting = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const chatHistoryStore = useChatHistoryStore()

const conversationTitle = computed(() => {
  const firstMessage = chatHistoryStore.chatHistory[0]?.userMessage

  if (!firstMessage) return 'New conversation'
  return firstMessage.length > 32 ? `${firstMessage.slice(0, 32)}…` : firstMessage
})

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
        language,
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

<template>
  <div class="flex h-dvh overflow-hidden bg-background text-foreground">
    <aside class="hidden w-64 shrink-0 flex-col border-r bg-sidebar md:flex">
      <div class="flex h-14 items-center border-b px-4">
        <span class="text-sm font-semibold">Lipi</span>
      </div>

      <div class="p-3">
        <Button class="w-full justify-start" variant="outline" size="sm" @click="startNewChat">
          <span aria-hidden="true">+</span>
          New chat
        </Button>
      </div>

      <nav class="min-h-0 flex-1 overflow-y-auto px-3" aria-label="Conversations">
        <p class="px-2 pb-2 text-xs font-medium text-muted-foreground">Chats</p>
        <button
          v-if="chatHistoryStore.chatHistory.length"
          type="button"
          class="w-full truncate bg-sidebar-accent px-3 py-2 text-left text-sm text-sidebar-accent-foreground"
        >
          {{ conversationTitle }}
        </button>
        <p v-else class="px-2 py-2 text-sm text-muted-foreground">No conversations yet</p>
      </nav>

      <div class="border-t px-4 py-3 text-xs text-muted-foreground">Spanish tutor</div>
    </aside>

    <section class="flex min-w-0 flex-1 flex-col">
      <header class="flex h-14 shrink-0 items-center justify-between border-b px-4 md:px-6">
        <div>
          <p class="text-sm font-medium">Spanish tutor</p>
          <p class="text-xs text-muted-foreground">Gemini</p>
        </div>
        <Button class="md:hidden" variant="ghost" size="sm" @click="startNewChat">
          New chat
        </Button>
      </header>

      <main ref="messagesContainer" class="min-h-0 flex-1 overflow-y-auto" aria-live="polite">
        <div
          v-if="!chatHistoryStore.chatHistory.length"
          class="mx-auto flex min-h-full max-w-3xl items-center justify-center px-6 py-12 text-center"
        >
          <div class="space-y-2">
            <h1 class="text-xl font-semibold">How can I help you practise Spanish?</h1>
            <p class="text-sm text-muted-foreground">
              Ask for a translation, grammar help, or start a conversation.
            </p>
          </div>
        </div>

        <div v-else class="mx-auto w-full max-w-3xl space-y-6 px-4 py-8 md:px-6">
          <template v-for="chat in chatHistoryStore.chatHistory" :key="chat.id">
            <article class="flex justify-end">
              <div class="max-w-[85%] space-y-1.5 bg-muted px-4 py-3 md:max-w-[75%]">
                <p class="text-xs font-medium text-muted-foreground">You</p>
                <p class="whitespace-pre-wrap text-sm leading-6">{{ chat.userMessage }}</p>
              </div>
            </article>

            <article v-if="chat.response" class="flex justify-start">
              <div class="max-w-[85%] space-y-1.5 md:max-w-[75%]">
                <p class="text-xs font-medium text-muted-foreground">Lipi</p>
                <TutorResponseView :response="chat.response" />
              </div>
            </article>
          </template>

          <div v-if="isSubmitting" class="text-sm text-muted-foreground">Lipi is thinking…</div>
          <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>
        </div>
      </main>

      <footer class="shrink-0 border-t bg-background px-4 py-4 md:px-6">
        <form class="mx-auto flex w-full max-w-3xl items-end gap-3" @submit.prevent="submitMessage">
          <textarea
            v-model="message"
            rows="1"
            class="min-h-11 max-h-40 flex-1 resize-none border bg-transparent px-3 py-2.5 text-sm leading-6 outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            aria-label="Message"
            autocomplete="off"
            placeholder="Message Lipi"
            @keydown.enter="handleComposerKeydown"
          />
          <Button type="submit" :disabled="!message.trim() || isSubmitting">Send</Button>
        </form>
        <p class="mx-auto mt-2 w-full max-w-3xl text-xs text-muted-foreground">
          Press Enter to send · Shift + Enter for a new line
        </p>
      </footer>
    </section>
  </div>
</template>
