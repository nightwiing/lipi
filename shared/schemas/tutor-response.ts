import { z } from 'zod'

const grammaticalGenderSchema = z
  .object({
    value: z.string().describe('The grammatical gender category.'),
    article: z.string().nullable().describe('The matching article, when relevant.'),
    note: z.string().nullable().describe('A concise irregularity or usage note.'),
  })
  .strict()

const numberSchema = z
  .object({
    singular: z.string().nullable(),
    plural: z.string().nullable(),
    note: z.string().nullable().describe('A concise number-form rule or irregularity.'),
  })
  .strict()

const titledNoteSchema = z
  .object({
    title: z.string(),
    explanation: z.string(),
  })
  .strict()

const regionalNoteSchema = titledNoteSchema
  .extend({
    region: z.string().nullable(),
  })
  .strict()

export const tutorResponseSchema = z
  .object({
    schemaVersion: z.literal(1),
    intent: z.enum([
      'conversation',
      'translation',
      'correction',
      'grammar',
      'vocabulary',
      'general',
    ]),
    answer: z
      .object({
        targetText: z.string().nullable().describe('The primary target-language answer.'),
        translation: z.string().nullable().describe('The English translation, when useful.'),
        explanation: z.string().nullable().describe('A concise English explanation.'),
      })
      .strict(),
    correction: z
      .object({
        original: z.string(),
        corrected: z.string(),
        explanation: z.string(),
      })
      .strict()
      .nullable(),
    vocabulary: z.array(
      z
        .object({
          term: z.string(),
          meaning: z.string(),
          partOfSpeech: z.string(),
          grammaticalGender: grammaticalGenderSchema.nullable(),
          number: numberSchema.nullable(),
        })
        .strict(),
    ),
    notes: z
      .object({
        grammar: z.array(titledNoteSchema),
        culture: z.array(regionalNoteSchema),
        regional: z.array(regionalNoteSchema),
      })
      .strict(),
    examples: z.array(
      z
        .object({
          targetText: z.string(),
          translation: z.string(),
        })
        .strict(),
    ),
    followUp: z.string().nullable(),
  })
  .strict()

export type TutorResponse = z.infer<typeof tutorResponseSchema>

const generatedJsonSchema = z.toJSONSchema(tutorResponseSchema, {
  target: 'draft-07',
  reused: 'inline',
})

delete generatedJsonSchema.$schema

function replaceConstantsWithEnums(value: unknown): void {
  if (!value || typeof value !== 'object') return

  if (Array.isArray(value)) {
    value.forEach(replaceConstantsWithEnums)
    return
  }

  const schema = value as Record<string, unknown>

  if ('const' in schema) {
    schema.enum = [schema.const]
    delete schema.const
  }

  Object.values(schema).forEach(replaceConstantsWithEnums)
}

replaceConstantsWithEnums(generatedJsonSchema)

export const tutorResponseJsonSchema = generatedJsonSchema
