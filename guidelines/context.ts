export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type LearningMode = 'guided' | 'free'

export interface PromptContext {
  targetLanguage?: string
  explanationLanguage?: string
  level?: CefrLevel
  goals?: readonly string[]
  currentObjective?: string
  learnerEvidence?: string
}

export interface CorePromptOptions extends PromptContext {
  tutorName?: string
}

/** Add supplied learner context without inventing defaults or learning history. */
export function withPromptContext(prompt: string, context: PromptContext): string {
  const details: string[] = []

  if (context.targetLanguage) details.push(`- Target language: ${context.targetLanguage}`)
  if (context.explanationLanguage) {
    details.push(`- Preferred explanation language: ${context.explanationLanguage}`)
  }
  if (context.level) details.push(`- Current study CEFR level: ${context.level}`)
  if (context.goals?.length) details.push(`- Learner goals: ${context.goals.join('; ')}`)
  if (context.currentObjective)
    details.push(`- Current learning objective: ${context.currentObjective}`)
  if (context.learnerEvidence)
    details.push(`- Available learner evidence: ${context.learnerEvidence}`)

  if (!details.length) return prompt

  return [prompt, `## Learner Context\n\n${details.join('\n')}`].filter(Boolean).join('\n\n')
}
