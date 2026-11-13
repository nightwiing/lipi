import { withPromptContext, type PromptContext } from '../context'

export function createB2Prompt(context: PromptContext = {}): string {
  return withPromptContext(
    `# CEFR B2

## Global scale

Can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in their field of specialisation. Can interact with a degree of fluency and spontaneity that makes regular interaction with users of the target language quite possible without imposing strain on either party. Can produce clear, detailed text on a wide range of subjects and explain a viewpoint on a topical issue giving the advantages and disadvantages of various options.

## Reception — Oral comprehension

I can understand extended talk and lectures and follow even complex lines of argument provided the topic is reasonably familiar.

I can understand most TV news and current affairs programmes. I can understand the majority of films in standard language.

## Reception — Reading comprehension

I can read articles and reports concerned with contemporary problems in which the writers adopt particular stances or viewpoints.

I can understand contemporary literary prose.

## Production — Oral production

I can present clear, detailed descriptions on a wide range of subjects related to my field of interest.

I can explain a viewpoint on a topical issue giving the advantages and disadvantages of various options.

## Production — Written production

I can produce clear, detailed text on a wide range of subjects related to my interests.

I can produce an essay or report, passing on information or giving reasons in support of or against a particular point of view.

## Interaction — Oral interaction

I can interact with a degree of fluency and spontaneity that makes regular interaction with users of the target language quite possible.

I can take an active part in discussion in familiar contexts, accounting for and sustaining my views.

## Interaction — Written and online interaction

I can interact with several people, linking my contributions to theirs and handling misunderstandings or disagreements, provided the others avoid complex language, allow me time and are generally co-operative.

I can highlight the significance of facts, events and experiences, justify ideas and support collaboration.

## Mediation — Mediating a text

I can convey detailed information and arguments reliably, e.g. the significant point(s) contained in complex but well-structured texts within my fields of professional, academic and personal interest.

## Mediation — Mediating concepts

I can encourage participation and pose questions that invite reactions from other group members or ask people to expand on their thinking and clarify their opinions.

I can further develop other people’s ideas and link them into coherent lines of thinking, considering different sides of an issue.

## Mediation — Mediating communication

I can encourage a shared communication culture by adapting the way I proceed, by expressing appreciation of different ideas, feelings and viewpoints, and by inviting participants to react to each other’s ideas.

I can communicate the significance of important statements and viewpoints on subjects within my fields of interest, provided speakers give clarifications if needed.

## Qualitative features of spoken language — Range

Has a sufficient range of language to give clear descriptions and express viewpoints on most general topics, without much conspicuous searching for words, using some complex sentence forms to do so.

## Qualitative features of spoken language — Accuracy

Shows a relatively high degree of grammatical control. Does not make errors that cause misunderstanding, and can correct most of their mistakes.

## Qualitative features of spoken language — Fluency

Can produce stretches of language with a fairly even tempo; although they can be hesitant as they search for patterns and expressions, there are few noticeably long pauses.

## Qualitative features of spoken language — Interaction

Can initiate discourse, take their turn when appropriate and end conversation when they need to, though they may not always do this elegantly.

Can help the discussion along on familiar ground confirming comprehension, inviting others in, etc.

## Qualitative features of spoken language — Coherence

Can use a limited number of cohesive devices to link their utterances into clear, coherent discourse, though there may be some “jumpiness” in a long contribution.

## Qualitative features of spoken language — Phonology

Can generally use appropriate intonation, place stress correctly and articulate individual sounds clearly; accent tends to be influenced by the other language(s) they speak, but has little or no effect on intelligibility.`,
    context,
  )
}
