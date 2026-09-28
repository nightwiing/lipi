import { tutorResponseJsonSchema } from '../../shared/schemas/tutor-response'
import type {
  TutorConversationTurn,
  TutorGenerationInput,
  TutorProvider,
} from './tutor-provider'

interface TextContent {
  type: 'text'
  text: string
}

interface InteractionStep {
  type: 'user_input' | 'model_output'
  content: TextContent[]
}

interface GeminiInteractionResponse {
  steps?: Array<{
    type?: string
    content?: Array<{
      type?: string
      text?: string
    }>
  }>
}

const GEMINI_MODEL = 'gemini-3.5-flash-lite'
const GEMINI_INTERACTIONS_URL = 'https://generativelanguage.googleapis.com/v1beta/interactions'

function textContent(text: string): TextContent[] {
  return [{ type: 'text', text }]
}

function createInteractionHistory(
  chatHistory: TutorConversationTurn[],
  message: string,
): InteractionStep[] {
  const input: InteractionStep[] = []

  for (const chat of chatHistory) {
    input.push({ type: 'user_input', content: textContent(chat.userMessage) })

    if (chat.response) {
      input.push({
        type: 'model_output',
        content: textContent(JSON.stringify(chat.response)),
      })
    }
  }

  const latestChat = chatHistory.at(-1)
  if (!latestChat || latestChat.userMessage !== message || latestChat.response) {
    input.push({ type: 'user_input', content: textContent(message) })
  }

  return input
}

function extractOutputText(response: GeminiInteractionResponse) {
  for (const step of response.steps?.toReversed() || []) {
    if (step.type !== 'model_output') continue

    const text = step.content
      ?.filter((content) => content.type === 'text')
      .map((content) => content.text)
      .filter((content): content is string => Boolean(content))
      .join('')
      .trim()

    if (text) return text
  }

  return ''
}

export function createGeminiTutorProvider(apiKey: string): TutorProvider {
  return {
    async generate(input: TutorGenerationInput) {
      const response = await $fetch<GeminiInteractionResponse>(GEMINI_INTERACTIONS_URL, {
        method: 'POST',
        headers: {
          'x-goog-api-key': apiKey,
        },
        body: {
          model: GEMINI_MODEL,
          store: false,
          system_instruction: input.systemInstruction,
          input: createInteractionHistory(input.chatHistory, input.message),
          response_format: {
            type: 'text',
            mime_type: 'application/json',
            schema: tutorResponseJsonSchema,
          },
        },
      })

      return extractOutputText(response)
    },
  }
}
