import { withPromptContext, type PromptContext } from '../context'

// Language-specific guidance has not been authored yet.
export function createGermanPrompt(context: PromptContext = {}): string {
  return withPromptContext(``, context)
}
