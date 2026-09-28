import {
  tutorResponseSchema,
  type TutorResponse,
} from '../../shared/schemas/tutor-response'
import { createGeminiTutorProvider } from '../providers/gemini-tutor-provider'
import type { TutorConversationTurn } from '../providers/tutor-provider'
import { createLanguageSystemPrompt, DEFAULT_LANGUAGE } from '../utils/language-system-prompt'

class TutorOutputError extends Error {
  constructor(
    readonly code: 'empty-output' | 'invalid-json' | 'invalid-schema',
    message: string,
  ) {
    super(message)
    this.name = 'TutorOutputError'
  }
}

function parseChatHistory(value: unknown): TutorConversationTurn[] {
  if (value === undefined) return []

  if (!Array.isArray(value)) {
    throw createError({ statusCode: 400, statusMessage: 'Chat history must be an array.' })
  }

  return value.map((item) => {
    if (!item || typeof item !== 'object' || !('userMessage' in item)) {
      throw createError({ statusCode: 400, statusMessage: 'Chat history is invalid.' })
    }

    const userMessage = typeof item.userMessage === 'string' ? item.userMessage.trim() : ''

    if (!userMessage) {
      throw createError({ statusCode: 400, statusMessage: 'Chat history is invalid.' })
    }

    if (!('response' in item) || item.response === null || item.response === undefined) {
      return { userMessage }
    }

    const response = tutorResponseSchema.safeParse(item.response)

    if (!response.success) {
      throw createError({ statusCode: 400, statusMessage: 'Chat history is invalid.' })
    }

    return { userMessage, response: response.data }
  })
}

function parseTutorResponse(content: string): TutorResponse {
  if (!content) {
    throw new TutorOutputError('empty-output', 'The model returned an empty response.')
  }

  let parsed: unknown

  try {
    parsed = JSON.parse(content)
  } catch {
    throw new TutorOutputError('invalid-json', 'The model returned invalid JSON.')
  }

  const response = tutorResponseSchema.safeParse(parsed)

  if (!response.success) {
    console.error('Tutor response schema validation failed.', {
      issues: response.error.issues.map((issue) => ({
        code: issue.code,
        path: issue.path.join('.'),
      })),
    })
    throw new TutorOutputError('invalid-schema', 'The model response did not match the schema.')
  }

  return response.data
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

  const provider = createGeminiTutorProvider(apiKey)
  let output: string

  try {
    output = await provider.generate({
      message,
      systemInstruction: createLanguageSystemPrompt(language),
      chatHistory,
    })
  } catch (error) {
    const errorCode = findErrorCode(error)
    const upstreamError = getUpstreamError(error)
    console.error('Tutor provider request failed.', {
      provider: 'gemini',
      code: errorCode,
      status: upstreamError?.status,
      message: upstreamError?.message,
    })

    if (['ECONNREFUSED', 'EHOSTUNREACH', 'ENETUNREACH', 'ETIMEDOUT'].includes(errorCode || '')) {
      throw createError({
        statusCode: 502,
        statusMessage: 'The tutor provider is unreachable.',
      })
    }

    throw createError({
      statusCode: 502,
      statusMessage: 'The tutor provider could not complete the request.',
    })
  }

  try {
    return { response: parseTutorResponse(output) }
  } catch (error) {
    if (error instanceof TutorOutputError) {
      console.error('Tutor provider returned unusable output.', { code: error.code })
      throw createError({
        statusCode: 502,
        statusMessage: 'The tutor returned an invalid response.',
      })
    }

    throw error
  }
})
