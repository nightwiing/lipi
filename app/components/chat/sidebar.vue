<template>
  <aside class="hidden w-64 shrink-0 flex-col border-r bg-sidebar md:flex">
    <div class="flex h-14 items-center border-b px-4">
      <span class="text-sm font-semibold">Lipi</span>
    </div>

    <div class="p-3">
      <Button class="w-full justify-start" variant="outline" size="sm" @click="$emit('new-chat')">
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
  </aside>
</template>

<script setup lang="ts">
import { useChatHistoryStore } from '@/stores/chat-history'

defineEmits(['new-chat'])

const chatHistoryStore = useChatHistoryStore()

const conversationTitle = computed(() => {
  const firstMessage = chatHistoryStore.chatHistory[0]?.userMessage

  if (!firstMessage) return 'New conversation'
  return firstMessage.length > 32 ? `${firstMessage.slice(0, 32)}…` : firstMessage
})
</script>
