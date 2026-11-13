import { createA1Prompt } from './cefr/a1'
import { createA2Prompt } from './cefr/a2'
import { createB1Prompt } from './cefr/b1'
import { createB2Prompt } from './cefr/b2'
import { createC1Prompt } from './cefr/c1'
import { createC2Prompt } from './cefr/c2'
import { withPromptContext, type CorePromptOptions, type LearningMode } from './context'
import { createFrenchPrompt } from './languages/french'
import { createGermanPrompt } from './languages/german'
import { createSpanishPrompt } from './languages/spanish'
import { createCorePrompt } from './tutor/core'
import { createFreePrompt } from './tutor/free'
import { createGuidedPrompt } from './tutor/guided'

export type { CefrLevel, CorePromptOptions, LearningMode, PromptContext } from './context'
export {
  createA1Prompt,
  createA2Prompt,
  createB1Prompt,
  createB2Prompt,
  createC1Prompt,
  createC2Prompt,
  createFrenchPrompt,
  createGermanPrompt,
  createSpanishPrompt,
  createCorePrompt,
  createFreePrompt,
  createGuidedPrompt,
}

export interface GuidelinesPromptOptions extends CorePromptOptions {
  targetLanguage: string
  mode?: LearningMode
}

const cefrPrompts = {
  A1: createA1Prompt,
  A2: createA2Prompt,
  B1: createB1Prompt,
  B2: createB2Prompt,
  C1: createC1Prompt,
  C2: createC2Prompt,
}

const languagePrompts = new Map([
  ['spanish', createSpanishPrompt],
  ['french', createFrenchPrompt],
  ['german', createGermanPrompt],
])

const modePrompts = { guided: createGuidedPrompt, free: createFreePrompt }

/** Compose core, mode, curriculum, and CEFR guidance with learner context added once. */
export function createGuidelinesPrompt(options: GuidelinesPromptOptions): string {
  const { targetLanguage, tutorName, level, mode = 'free' } = options
  const languagePrompt = languagePrompts.get(targetLanguage.trim().toLowerCase())
  const sections = [
    createCorePrompt({ tutorName }),
    modePrompts[mode](),
    languagePrompt?.(),
    level ? cefrPrompts[level]() : undefined,
  ]

  return withPromptContext(sections.filter(Boolean).join('\n\n'), options)
}
