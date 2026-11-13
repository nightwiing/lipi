# Lang Tutor

A Nuxt 4 application with Nitro server routes, Pinia, Tailwind CSS 4, Sera-style
shadcn-vue components, and installable PWA metadata.

## Setup

```sh
pnpm install
```

## Development

Add your Google AI API key to `.env`:

```sh
G_API_KEY=your_google_ai_api_key
```

The key is used only by the Nitro server route and is not exposed to the browser.
The tutor currently uses `gemini-3.5-flash-lite` through Google's OpenAI-compatible
Chat Completions endpoint.

```sh
pnpm dev
```

Nuxt registers files in `server/api/` under `/api` and files in `server/routes/`
without that prefix. For example, `server/api/health.get.ts` is available at
`GET /api/health`.

## Prompt guidelines

Every prompt under `guidelines/` exports a TypeScript function with optional typed
learner context. Use the composition function to combine core, learning mode,
language, and CEFR guidance:

```ts
import { createGuidelinesPrompt, createCorePrompt } from './guidelines'

const prompt = createGuidelinesPrompt({
  targetLanguage: 'Spanish',
  explanationLanguage: 'English',
  level: 'A2',
  mode: 'guided',
  tutorName: 'Vac',
  goals: ['Order food confidently'],
  currentObjective: 'es-a2-001',
  learnerEvidence: 'Needs support with past-tense narration.',
})

// Individual prompts can also be used independently.
const core = createCorePrompt({ targetLanguage: 'French', tutorName: 'Vac' })
```

Omitted context is left out. The composition function defaults to free mode and
includes learner context once. French and German curriculum files remain empty
placeholders; other languages still receive core, mode, and selected CEFR guidance.
The chat route continues to use `server/utils/language-system-prompt.ts` until
these guidelines are explicitly integrated there.

## Validation

```sh
pnpm type-check
pnpm lint
pnpm build
```

## Production

The default build targets a Node server:

```sh
pnpm build
node .output/server/index.mjs
```

Serve the application over HTTPS in production so browsers can install it. The
generated service worker precaches versioned frontend assets while page navigation
and API data continue to use the Nuxt server.
