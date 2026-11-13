import { withPromptContext, type PromptContext } from '../context'

export function createA2Prompt(context: PromptContext = {}): string {
  return withPromptContext(
    `# CEFR A2

## Global scale

Can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g. very basic personal and family information, shopping, local geography, employment). Can communicate in simple and routine tasks requiring a simple and direct exchange of information on familiar and routine matters. Can describe in simple terms aspects of their background, immediate environment and matters in areas of immediate need.

## Reception — Oral comprehension

I can understand phrases and the highest frequency vocabulary related to areas of most immediate personal relevance (e.g. very basic personal and family information, shopping, local geography, employment).

I can catch the main point in short, clear, simple messages and announcements.

## Reception — Reading comprehension

I can read very short, simple texts.

I can find specific, predictable information in simple everyday material, such as advertisements, prospectuses, menus and timetables, and I can understand short simple personal letters.

## Production — Oral production

I can use a series of phrases and sentences to describe in simple terms my family and other people, living conditions, my educational background and my present or most recent job.

## Production — Written production

I can produce a series of simple phrases and sentences linked with simple connectors like “and”, “but” and “because”.

## Interaction — Oral interaction

I can communicate in simple and routine tasks requiring a simple and direct exchange of information on familiar topics and activities.

I can handle very short social exchanges, even though I can’t usually understand enough to keep the conversation going myself.

## Interaction — Written and online interaction

I can engage in basic social interaction, expressing how I feel, what I am doing or what I need, and responding to comments with thanks, apology or answers to questions.

I can complete simple transactions such as ordering goods, can follow simple instructions and can collaborate in a shared task with a supportive interlocutor.

## Mediation — Mediating a text

I can convey the main point(s) involved in short, simple texts on everyday subjects of immediate interest, provided these are expressed clearly in simple language.

## Mediation — Mediating concepts

I can collaborate in simple, practical tasks, asking what others think, making suggestions and understanding responses, provided I can ask for repetition or reformulation from time to time.

I can make suggestions in a simple way to move the discussion forward and can ask what people think of certain ideas.

## Mediation — Mediating communication

I can contribute to communication by using simple words/signs to invite people to explain things, indicating when I understand and/or agree.

I can communicate the main point of what is said in predictable everyday situations about personal wants and needs.

I can recognise when people disagree or when difficulties occur and can use simple phrases to seek compromise and agreement.

## Qualitative features of spoken language — Range

Uses basic sentence patterns with memorised phrases, groups of a few words/signs and formulae in order to communicate limited information in simple everyday situations.

## Qualitative features of spoken language — Accuracy

Uses some simple structures correctly, but still systematically makes basic mistakes.

## Qualitative features of spoken language — Fluency

Can make themselves understood in very short utterances, even though pauses, false starts and reformulation are very evident.

## Qualitative features of spoken language — Interaction

Can ask and answer questions and respond to simple statements.

Can indicate when they are following but is rarely able to understand enough to keep conversation going of their own accord.

## Qualitative features of spoken language — Coherence

Can link groups of words with simple connectors like “and”, “but” and “because”.

## Qualitative features of spoken language — Phonology

Pronunciation is generally clear enough to be understood, but conversational partners will need to ask for repetition from time to time. A strong influence from the other language(s) they speak on stress, rhythm and intonation may affect intelligibility, requiring collaboration from interlocutors. Nevertheless, pronunciation of familiar words is clear.`,
    context,
  )
}
