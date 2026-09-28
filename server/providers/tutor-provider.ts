import type { TutorResponse } from '../../shared/schemas/tutor-response'

export interface TutorConversationTurn {
  userMessage: string
  response?: TutorResponse
}

export interface TutorGenerationInput {
  message: string
  systemInstruction: string
  chatHistory: TutorConversationTurn[]
}

export interface TutorProvider {
  generate(input: TutorGenerationInput): Promise<string>
}
