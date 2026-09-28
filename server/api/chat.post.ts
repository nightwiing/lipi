import { createLanguageSystemPrompt, DEFAULT_LANGUAGE } from '../utils/language-system-prompt'

interface ChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string | Array<{ text?: string }>
    }
  }>
}

interface ChatHistoryEntry {
  userMessage: string
  response?: string
}

interface CompletionMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const GEMINI_MODEL = 'gemini-3.5-flash-lite'
const GEMINI_CHAT_COMPLETIONS_URL =
  'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'

function createCompletionMessages(
  message: string,
  language: string,
  chatHistory: ChatHistoryEntry[],
) {
  const messages: CompletionMessage[] = [
    { role: 'system', content: createLanguageSystemPrompt(language) },
  ]

  for (const chat of chatHistory) {
    messages.push({ role: 'user', content: chat.userMessage })

    if (chat.response) {
      messages.push({ role: 'assistant', content: chat.response })
    }
  }

  const latestChat = chatHistory.at(-1)
  if (!latestChat || latestChat.userMessage !== message || latestChat.response) {
    messages.push({ role: 'user', content: message })
  }

  return messages
}

function requestCompletion(
  apiKey: string,
  message: string,
  language: string,
  chatHistory: ChatHistoryEntry[],
) {
  return $fetch<ChatCompletionResponse>(GEMINI_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: {
      model: GEMINI_MODEL,
      messages: createCompletionMessages(message, language, chatHistory),
      stream: false,
    },
  })
}

function parseChatHistory(value: unknown): ChatHistoryEntry[] {
  if (value === undefined) return []

  if (!Array.isArray(value)) {
    throw createError({ statusCode: 400, statusMessage: 'Chat history must be an array.' })
  }

  return value.map((item) => {
    if (!item || typeof item !== 'object' || !('userMessage' in item)) {
      throw createError({ statusCode: 400, statusMessage: 'Chat history is invalid.' })
    }

    const userMessage =
      typeof item.userMessage === 'string' ? item.userMessage.trim() : ''
    const response =
      'response' in item && typeof item.response === 'string' ? item.response.trim() : undefined

    if (!userMessage) {
      throw createError({ statusCode: 400, statusMessage: 'Chat history is invalid.' })
    }

    return {
      userMessage,
      ...(response ? { response } : {}),
    }
  })
}

function extractResponseContent(response: ChatCompletionResponse) {
  const content = response.choices?.[0]?.message?.content

  if (typeof content === 'string') return content.trim()

  if (Array.isArray(content)) {
    return content
      .map((part) => part.text)
      .filter((text): text is string => Boolean(text))
      .join('\n')
      .trim()
  }

  return ''
}

function findErrorCode(error: unknown) {
  let current = error

  for (let depth = 0; depth < 5; depth++) {
    if (!current || typeof current !== 'object') return undefined

    if ('code' in current && typeof current.code === 'string') return current.code
    current = 'cause' in current ? current.cause : undefined
  }

  return undefined
}

function getUpstreamError(error: unknown) {
  if (!error || typeof error !== 'object') return undefined

  const status =
    'statusCode' in error && typeof error.statusCode === 'number'
      ? error.statusCode
      : 'status' in error && typeof error.status === 'number'
        ? error.status
        : undefined

  if (!status) return undefined

  let message: string | undefined

  if ('data' in error && error.data && typeof error.data === 'object') {
    const data = error.data

    if ('error' in data && data.error && typeof data.error === 'object') {
      const upstreamError = data.error
      if ('message' in upstreamError && typeof upstreamError.message === 'string') {
        message = upstreamError.message
      }
    }

    if (!message && 'message' in data && typeof data.message === 'string') {
      message = data.message
    }
  }

  const safeMessage = message?.replace(/\s+/g, ' ').trim().slice(0, 240)
  return { status, message: safeMessage }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<unknown>(event)

  if (!body || typeof body !== 'object' || !('message' in body)) {
    throw createError({ statusCode: 400, statusMessage: 'A message is required.' })
  }

  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const language =
    'language' in body && typeof body.language === 'string'
      ? body.language.trim()
      : DEFAULT_LANGUAGE
  const chatHistory = parseChatHistory('chatHistory' in body ? body.chatHistory : undefined)

  if (!message) {
    throw createError({ statusCode: 400, statusMessage: 'A message is required.' })
  }

  if (!language || !/^[\p{L}][\p{L}\p{M} .'-]{0,49}$/u.test(language)) {
    throw createError({ statusCode: 400, statusMessage: 'A valid language name is required.' })
  }

  const apiKey = process.env.G_API_KEY || useRuntimeConfig(event).geminiApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'G_API_KEY is not configured.',
    })
  }

  try {
    const completion = await requestCompletion(apiKey, message, language, chatHistory)
    const response = extractResponseContent(completion)

    if (!response) {
      throw new Error('The Gemini API returned an empty response.')
    }

    return { response }
  } catch (error) {
    const errorCode = findErrorCode(error)
    const upstreamError = getUpstreamError(error)
    console.error('Gemini API request failed.', {
      code: errorCode,
      status: upstreamError?.status,
      message: upstreamError?.message,
    })

    if (['ECONNREFUSED', 'EHOSTUNREACH', 'ENETUNREACH', 'ETIMEDOUT'].includes(errorCode || '')) {
      throw createError({
        statusCode: 502,
        statusMessage: 'The Gemini API is unreachable.',
      })
    }

    if (upstreamError) {
      const detail = upstreamError.message ? `: ${upstreamError.message}` : ''
      throw createError({
        statusCode: 502,
        statusMessage: `The Gemini API returned ${upstreamError.status}${detail}`,
      })
    }

    throw createError({
      statusCode: 502,
      statusMessage: 'The Gemini API could not complete the request.',
    })
  }
})
