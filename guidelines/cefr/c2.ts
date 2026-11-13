import { withPromptContext, type PromptContext } from '../context'

export function createC2Prompt(context: PromptContext = {}): string {
  return withPromptContext(
    `# CEFR C2

## Global scale

Can understand virtually all types of texts. Can summarise information from different oral and written sources, reconstructing arguments and accounts in a coherent presentation. Can express themselves spontaneously, very fluently and precisely, differentiating finer shades of meaning even in more complex situations.

## Reception — Oral comprehension

I have no difficulty in understanding any kind of oral language, whether live or broadcast, even when delivered at fast natural speed, provided I have some time to get familiar with the accent.

## Reception — Reading comprehension

I can read with ease virtually all forms of the written/signed language, including abstract, structurally or linguistically complex texts, such as manuals, specialised articles and literary works.

## Production — Oral production

I can present a clear, smoothly flowing description or argument in a style appropriate to the context and with an effective logical structure that helps the recipient notice and remember significant points.

## Production — Written production

I can produce clear, smoothly flowing text in an appropriate style.

I can produce complex letters, reports or articles that present a case with an effective logical structure that helps the recipient notice and remember significant points.

I can produce summaries and reviews of professional or literary works.

## Interaction — Oral interaction

I can take part effortlessly in any conversation or discussion and have a good familiarity with idiomatic expressions and colloquialisms.

I can express myself fluently and convey finer shades of meaning precisely. If I do have a problem I can backtrack and restructure around the difficulty so smoothly that other people are hardly aware of it.

## Interaction — Written and online interaction

I can express myself in an appropriate tone and style in virtually any type of interaction.

I can anticipate and deal effectively with possible misunderstandings, communication issues and emotional reactions, adjusting language and tone flexibly and sensitively as appropriate.

## Mediation — Mediating a text

I can explain in clear, fluent, well-structured language the way facts and arguments are presented, conveying evaluative aspects and most nuances precisely, and pointing out sociocultural implications (e.g. use of register, understatement, irony and sarcasm).

## Mediation — Mediating concepts

I can guide the development of ideas in a discussion of complex abstract topics, encouraging others to elaborate on their reasoning, summarising, evaluating and linking the various contributions in order to create agreement for a solution or way forward.

## Mediation — Mediating communication

I can mediate effectively and naturally between members of my own and other communities, taking account of sociocultural and sociolinguistic differences and communicating finer shades of meaning.

## Qualitative features of spoken language — Range

Shows great flexibility reformulating ideas in differing linguistic forms to convey finer shades of meaning precisely, to give emphasis, to differentiate and to eliminate ambiguity. Also has a good command of idiomatic expressions and colloquialisms.

## Qualitative features of spoken language — Accuracy

Maintains consistent grammatical control of complex language, even while attention is otherwise engaged (e.g. in forward planning, in monitoring others’ reactions).

## Qualitative features of spoken language — Fluency

Can express themselves spontaneously at length with a natural colloquial flow, avoiding or backtracking around any difficulty so smoothly that the interlocutor is hardly aware of it.

## Qualitative features of spoken language — Interaction

Can interact with ease and skill, picking up and using non-verbal and intonational cues apparently effortlessly.

Can interweave their contribution into the joint discourse with fully natural turntaking, referencing, allusion making, etc.

## Qualitative features of spoken language — Coherence

Can create coherent and cohesive discourse making full and appropriate use of a variety of organisational patterns and a wide range of connectors and other cohesive devices.

## Qualitative features of spoken language — Phonology

Can employ the full range of phonological features in the target language with a high level of control – including prosodic features such as word and sentence stress, rhythm and intonation – so that the finer points of their message are clear and precise. Intelligibility is not affected in any way by features of accent that may be retained from other language(s).`,
    context,
  )
}
