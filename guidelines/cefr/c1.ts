import { withPromptContext, type PromptContext } from '../context'

export function createC1Prompt(context: PromptContext = {}): string {
  return withPromptContext(
    `# CEFR C1

## Global scale

Can understand a wide range of demanding, longer texts, and recognise implicit meaning. Can express themselves fluently and spontaneously without much obvious searching for expressions. Can use language flexibly and effectively for social, academic and professional purposes. Can produce clear, well-structured, detailed text on complex subjects, showing controlled use of organisational patterns, connectors and cohesive devices.

## Reception — Oral comprehension

I can understand extended talk even when it is not clearly structured and when relationships are only implied and not signalled explicitly.

I can understand television programmes and films without too much effort.

## Reception — Reading comprehension

I can understand long and complex factual and literary texts, appreciating distinctions of style.

I can understand specialised articles and longer technical instructions, even when they do not relate to my field.

## Production — Oral production

I can present clear, detailed descriptions of complex subjects integrating sub-themes, developing particular points and rounding off with an appropriate conclusion.

## Production — Written production

I can express myself in clear, well-structured text, expressing points of view at some length.

I can produce detailed expositions of complex subjects in an essay or a report, underlining what I consider to be the salient issues.

I can produce different kinds of texts in a style appropriate to the reader I have in mind.

## Interaction — Oral interaction

I can express myself fluently and spontaneously without much obvious searching for expressions.

I can use language flexibly and effectively for social and professional purposes.

I can formulate ideas and opinions with precision and relate my contribution skilfully to those of others.

## Interaction — Written and online interaction

I can understand the intentions and implications of other contributions on complex, abstract issues and can express myself with clarity and precision, adapting my language and register flexibly and effectively.

I can deal effectively with communication problems and cultural issues that arise by clarifying and exemplifying.

## Mediation — Mediating a text

I can convey clearly and fluently in well-structured language the significant ideas in long, complex texts, whether or not they relate to my own fields of interest, provided I can occasionally check particular technical concepts.

## Mediation — Mediating concepts

I can acknowledge different perspectives in guiding a group, asking a series of open questions that build on different contributions in order to stimulate logical reasoning, reporting on what others have said, summarising, elaborating and weighing up multiple points of view, and tactfully helping steer discussion towards a conclusion.

## Mediation — Mediating communication

I can mediate a shared communication culture by managing ambiguity, demonstrating sensitivity to different viewpoints and heading off misunderstandings.

I can communicate significant information clearly, fluently and concisely, and explain cultural references.

I can use persuasive language diplomatically.

## Qualitative features of spoken language — Range

Has a good command of a broad range of language allowing them to select a formulation to express themselves clearly in an appropriate style on a wide range of general, academic, professional or leisure topics without having to restrict what they want to say.

## Qualitative features of spoken language — Accuracy

Consistently maintains a high degree of grammatical accuracy; errors are rare, difficult to spot and generally corrected when they do occur.

## Qualitative features of spoken language — Fluency

Can express themselves fluently and spontaneously, almost effortlessly. Only a conceptually difficult subject can hinder a natural, smooth flow of language.

## Qualitative features of spoken language — Interaction

Can select a suitable phrase from a readily available range of discourse functions to preface their remarks in order to get or to keep the floor and to relate their own contributions skilfully to those of other speakers.

## Qualitative features of spoken language — Coherence

Can produce clear, smoothly flowing, well-structured language, showing controlled use of organisational patterns, connectors and cohesive devices.

## Qualitative features of spoken language — Phonology

Can employ the full range of phonological features in the target language with sufficient control to ensure intelligibility throughout.

Can articulate virtually all the sounds of the target language; some features of accent retained from other language(s) may be noticeable, but they do not affect intelligibility at all.`,
    context,
  )
}
