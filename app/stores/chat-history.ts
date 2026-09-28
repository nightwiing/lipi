import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface ChatHistoryEntry {
  id: number
  userMessage: string
  response: string
}

export const useChatHistoryStore = defineStore('chat-history', () => {
  const chatHistory = ref<ChatHistoryEntry[]>([])
  let nextChatId = 1

  function addChat(userMessage: string) {
    const id = nextChatId++

    chatHistory.value.push({
      id,
      userMessage,
      response: '',
    })

    return id
  }

  function setResponse(id: number, response: string) {
    const chat = chatHistory.value.find((item) => item.id === id)

    if (chat) chat.response = response
  }

  function clearHistory() {
    chatHistory.value = []
    nextChatId = 1
  }

  return { chatHistory, addChat, setResponse, clearHistory }
})
