# Lipi implementation plan: structured tutor responses

Last updated: 2026-09-28

## Why this document exists

This file records the product and technical decisions made so far and provides a step-by-step implementation plan for the next session. The immediate goal is to replace the assistant's plain-text response with a validated structured response that the UI can render as differentiated learning material.

No implementation from this plan has been started yet.

## Decisions already made

- Keep Nuxt rather than moving to a plain Vue application.
- The learning experience remains a client-oriented web app/PWA.
- Nuxt/Nitro server routes act as the backend-for-frontend and keep the Gemini API key off the client.
- Keep LLM calls behind `/api/chat`; the browser must never call Gemini directly.
- Use structured JSON for tutor responses so grammar, vocabulary, grammatical gender, number forms, cultural notes, examples, corrections, and follow-up prompts can have distinct UI treatments.
- The JSON structure must be enforced by Gemini structured output and validated on the server. Prompting the model to "return JSON" is not sufficient by itself.
- Optional or irrelevant teaching sections must be empty or `null`; the model must not invent cultural, gender, or grammar notes merely to fill the UI.
- `gender` means **grammatical gender** unless a user explicitly asks about social or identity-related language.
- Start with Spanish, while keeping the contract flexible enough for languages whose gender and number systems differ from Spanish or do not exist.

## Current implementation snapshot

Relevant files:

- `server/utils/language-system-prompt.ts` contains the current conversational tutor prompt.
- `server/api/chat.post.ts` calls `gemini-3.5-flash-lite` through Gemini's OpenAI-compatible chat-completions endpoint.
- `server/api/chat.post.ts` extracts one plain-text completion and returns `{ response: string }`.
- `app/pages/index.vue` stores every chat message as `{ id, role, content: string }` and renders the assistant response as plain text.
- The client sends only the latest user message to `/api/chat`. The model does not currently receive earlier conversation turns.
- The completion is currently limited to 512 output tokens.
- API requests are already configured as `NetworkOnly` in the PWA Workbox configuration and must remain uncached.

There are existing uncommitted changes in the repository. Preserve them and do not reset unrelated work when implementing this plan.

## Target response contract

Use a versioned response object so the contract can evolve later without silently breaking saved conversations.

```ts
interface TutorResponse {
  schemaVersion: 1

  intent:
    | 'conversation'
    | 'translation'
    | 'correction'
    | 'grammar'
    | 'vocabulary'
    | 'general'

  answer: {
    targetText: string | null
    translation: string | null
    explanation: string | null
  }

  correction: {
    original: string
    corrected: string
    explanation: string
  } | null

  vocabulary: Array<{
    term: string
    meaning: string
    partOfSpeech: string

    grammaticalGender: {
      value: string
      article: string | null
      note: string | null
    } | null

    number: {
      singular: string | null
      plural: string | null
      note: string | null
    } | null
  }>

  notes: {
    grammar: Array<{
      title: string
      explanation: string
    }>

    culture: Array<{
      title: string
      explanation: string
      region: string | null
    }>

    regional: Array<{
      title: string
      explanation: string
      region: string | null
    }>
  }

  examples: Array<{
    targetText: string
    translation: string
  }>

  followUp: string | null
}
```

### Contract rules

- `answer` is the primary learner-facing response and should remain concise.
- `targetText` contains the main target-language phrase or reply when applicable.
- `translation` is normally English, but can be `null` when the learner explicitly requests immersion.
- `correction` is populated only when the learner made a meaningful error.
- `vocabulary` contains only the most educationally useful terms, not every word in the response.
- `grammaticalGender` is `null` when it does not apply.
- `number` is `null` when singular/plural forms do not apply.
- Notes use empty arrays when no note is useful.
- Culture notes must affect meaning, politeness, appropriateness, or natural usage; generic trivia should be omitted.
- Regional notes should state the relevant country or region whenever it is known.
- `followUp` contains at most one useful question and is otherwise `null`.

### Suggested output-size limits

Keep responses useful without making every translation excessively large:

- Vocabulary entries: maximum 4
- Grammar notes: maximum 3
- Cultural notes: maximum 1
- Regional notes: maximum 2
- Examples: maximum 3
- Follow-up questions: maximum 1

## Step-by-step implementation

### Phase 1: Define one shared schema

1. Add a runtime schema library. Zod is the preferred starting choice because it can validate data and generate a JSON Schema from the same definition.
2. Create `shared/schemas/tutor-response.ts`.
3. Define the complete runtime schema there, including array limits and string-length limits.
4. Export both the runtime schema and the inferred `TutorResponse` TypeScript type.
5. Generate the Gemini-compatible JSON Schema from the same source rather than maintaining an unrelated hand-written schema.
6. Keep the generated JSON Schema simple because Gemini supports only a subset of JSON Schema. Avoid complicated transforms, refinements, and deeply nested unions.
7. Add fixture tests proving that:
   - a complete Spanish response is accepted;
   - irrelevant gender/number fields can be `null`;
   - empty note arrays are accepted;
   - unknown or malformed shapes are rejected;
   - configured array limits are enforced.

Expected result: the server and Vue client import the same `TutorResponse` type, and the server has a runtime validator for untrusted model output.

### Phase 2: Use Gemini native structured output

1. Prefer Gemini's native API or current official `@google/genai` SDK for this feature instead of relying on the OpenAI compatibility layer.
2. Keep `gemini-3.5-flash-lite` initially; it supports structured output and is already the selected model.
3. Configure the generation request with a structured text response:

   ```ts
   response_format: {
     type: 'text',
     mime_type: 'application/json',
     schema: tutorResponseJsonSchema,
   }
   ```

   Confirm the exact property casing against the installed SDK version when implementing; the REST API and JavaScript SDK may expose different casing.
4. Continue loading the API key only through Nuxt runtime configuration on the server.
5. Do not expose provider options, system instructions, model selection, or the API key through the request body.
6. Raise the output-token limit from 512 to an initial range around 1,000-1,200 tokens, then tune it using real responses and cost measurements.
7. Keep `stream: false` for the first structured-response implementation. Streaming partial JSON complicates parsing and UI rendering and can be added later.

Expected result: Gemini returns a JSON string constrained by the requested schema.

### Phase 3: Validate and normalize on the server

1. Parse the model's returned text with `JSON.parse` inside `server/api/chat.post.ts`.
2. Validate the parsed value with the shared runtime schema.
3. Return `{ response: TutorResponse }`, not `{ response: string }` containing serialized JSON.
4. Never pass unvalidated model output to the UI.
5. Add clear internal error categories for:
   - empty model response;
   - invalid JSON;
   - schema-validation failure;
   - upstream timeout/network error;
   - upstream HTTP error.
6. Keep detailed validation/provider information in server logs, but return a safe generic error to the client.
7. Consider one controlled repair retry only for invalid structured output. Do not retry authentication, quota, or deterministic validation failures indefinitely.

Expected result: `/api/chat` always returns a validated `TutorResponse` on success.

### Phase 4: Update the tutor instructions

Extend `server/utils/language-system-prompt.ts` with semantic rules. The schema controls shape; the system prompt controls teaching quality.

Add guidance equivalent to:

```text
- Provide the most useful direct answer first.
- Identify only the most educationally useful vocabulary.
- For relevant vocabulary, explain grammatical gender, articles,
  singular/plural forms, and irregularities.
- Explain only the grammar needed to understand the answer.
- Add cultural or regional notes only when they materially affect
  meaning, politeness, appropriateness, or natural usage.
- Never invent information merely to fill a response field.
- Treat gender as grammatical gender unless the learner explicitly
  asks about social or identity-related language.
- If the learner made a meaningful mistake, provide a gentle correction.
- Keep examples short, natural, and suitable for the learner's level.
- Ask at most one follow-up question and only when useful.
```

Do not paste the entire JSON Schema into the prose system prompt. Put useful descriptions on the schema fields and let structured output enforce the contract.

Expected result: structurally correct responses are also concise, relevant, and pedagogically useful.

### Phase 5: Update client-side message types

1. Replace the single `ChatMessage` shape with a discriminated union:

   ```ts
   type UserChatMessage = {
     id: number
     role: 'user'
     content: string
   }

   type AssistantChatMessage = {
     id: number
     role: 'assistant'
     content: TutorResponse
   }

   type ChatMessage = UserChatMessage | AssistantChatMessage
   ```

2. Update the `$fetch` response type to `{ response: TutorResponse }`.
3. Keep user messages rendered as ordinary text.
4. Pass assistant responses to a dedicated structured-response component.
5. Never render model-generated text with `v-html`; use normal Vue text interpolation.

Expected result: TypeScript prevents the UI from treating assistant responses as plain strings.

### Phase 6: Build the differentiated tutor UI

Create an initial `app/components/chat/TutorResponse.vue` component. Start with subcomponents only where repetition makes them worthwhile.

Recommended presentation order:

1. Primary answer
2. Translation/explanation
3. Correction card, when present
4. Vocabulary cards
5. Grammar notes
6. Cultural and regional notes
7. Examples
8. Follow-up suggestion

Suggested UI differentiation:

- Primary answer: normal assistant message styling.
- Correction: high-contrast card showing original, corrected form, and explanation.
- Vocabulary: compact cards or expandable rows.
- Grammatical gender: labeled badge containing the category/article; do not communicate it through color alone.
- Singular/plural: two-column comparison with a short rule underneath.
- Grammar: instructional note card.
- Culture: visually distinct callout, kept secondary to the direct answer.
- Regional differences: region badge plus explanation.
- Examples: target-language sentence followed by its translation.
- Follow-up: optional suggested-action button that copies the question into the composer or sends it after explicit user action.

Accessibility requirements:

- Do not rely solely on color to identify note types or grammatical categories.
- Use headings and semantic lists inside assistant responses.
- Ensure expanded/collapsed sections expose their state to assistive technology.
- Keep target-language text selectable and compatible with future text-to-speech controls.

Expected result: learners can scan the main answer quickly and open deeper explanations when needed.

### Phase 7: Add real conversation context

This is separate from structured output but is necessary for follow-up questions to work correctly.

1. Change the client request from one `message` to a bounded `messages` history.
2. Accept only `user` and `assistant` roles from the client. The server must always inject the system prompt itself.
3. Serialize validated assistant `TutorResponse` objects when passing previous assistant turns to Gemini.
4. Limit the number of turns and total input size, for example the latest 10-20 messages plus a total character/token ceiling.
5. Validate every incoming history item and reject unknown roles or oversized content.
6. Later, replace truncation with conversation summaries if long-running chats become important.

Expected result: when the learner says "give me another example" or answers a follow-up question, Gemini knows what the prior lesson was about.

### Phase 8: Testing

Add tests at three levels.

#### Schema tests

- Valid full response
- Valid minimal response with empty notes and nullable fields
- Invalid intent
- Invalid or missing required properties
- Excessively large arrays or strings

#### Server-route tests

- Valid Gemini JSON is parsed, validated, and returned as an object.
- Empty content produces a safe error.
- Malformed JSON produces a safe error.
- Schema-invalid JSON produces a safe error.
- Provider errors do not leak API keys, request headers, or raw sensitive data.
- Requests with invalid language names, oversized messages, or invalid conversation roles are rejected.

#### Component tests

- Sections with `null` or empty arrays are not rendered.
- Corrections render original and corrected text distinctly.
- Vocabulary gender and number data render correctly.
- Culture and regional notes show their labels and regions.
- Plain text is escaped rather than interpreted as HTML.
- Follow-up actions behave correctly.

Also manually test these learning cases:

- Spanish feminine noun: `la casa` / `las casas`
- Irregular gender: `la mano`
- A noun whose gender changes meaning
- An invariant or unusual plural
- Adjective gender/number agreement
- A sentence with a learner mistake
- A culturally relevant politeness distinction
- A request where no cultural note is relevant
- A language without grammatical gender
- Explicit full-immersion mode

### Phase 9: Observe and tune

1. Log schema failures, latency, model name, approximate response size, and retry count without logging secrets.
2. Track how often each optional section is populated. If culture or grammar is included almost every time, the prompt may be encouraging filler.
3. Review real examples for correctness before expanding the number of supported languages.
4. Tune token limits, array sizes, and schema descriptions from observed failures.
5. Keep the response contract at `schemaVersion: 1` until a breaking shape change is needed.

## Recommended implementation order for one coding session

If implementing this incrementally, use this order so the application remains testable:

1. Install the runtime-schema/native Gemini dependencies.
2. Add the shared schema and fixtures.
3. Add structured output to the Gemini request.
4. Parse and validate the server response.
5. Update the API return type and client message union together.
6. Add the basic `TutorResponse` renderer.
7. Add differentiated cards one section at a time.
8. Update the system prompt and manually test representative queries.
9. Add conversation history after the single-turn structured flow is stable.
10. Add automated route/component tests and observability.

## Definition of done

The structured tutor-response feature is complete when:

- Gemini is constrained by a JSON Schema rather than prompt-only JSON instructions.
- Every successful response is runtime-validated on the server.
- The browser receives a typed object, not a JSON string.
- The UI renders answer, correction, vocabulary, grammatical gender, number, grammar, culture, regional differences, examples, and follow-up as distinct optional sections.
- Irrelevant sections are omitted from the rendered UI.
- The model does not receive or expose the Gemini API key.
- Follow-up messages include bounded conversation context.
- The output does not get cached by the PWA service worker.
- Tests cover valid, minimal, malformed, and semantically varied responses.
- Existing lint, type-check, and build commands pass.

## Out of scope for the first pass

- Streaming partial structured JSON
- Voice input or text-to-speech
- Persisting conversations to a database
- Spaced-repetition scheduling
- Automatic fact-checking or web grounding of cultural notes
- A separate Nuxt marketing website
- Native mobile packaging with Capacitor

These can be layered on after the structured single-turn response and UI are stable.
