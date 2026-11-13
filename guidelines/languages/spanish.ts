import { withPromptContext, type PromptContext } from '../context'

export function createSpanishPrompt(context: PromptContext = {}): string {
  return withPromptContext(
    `# Spanish Language Learning Guidelines

## Purpose and Scope

- A shared Spanish objective registry for A1–C2, using the corresponding files in \`../cefr/\` as the primary proficiency reference. This is a proposed instructional curriculum informed by accessible Instituto Cervantes material, with partial external verification; see Sources and Alignment Notes.
- Objectives define outcomes, not lessons, prescribed activities, vocabulary quotas, or a fixed sequence. All learners at a level share its targets; contexts, explanations, practice, ordering, and revision can vary. Vocabulary examples are illustrative; grammar lists identify useful resources rather than exhaustive requirements.
- The heading supplies each objective's stable ID and title. IDs identify capabilities independently of lesson content; retain them for equivalent revisions and never reuse them for different capabilities. Skills identify evidence to look for, not an automatic mastery threshold. Progress records belong outside this document.
- Levels build cumulatively. Higher objectives extend earlier capabilities through greater independence, complexity, precision, or sensitivity to audience. Prerequisites name only direct dependencies; “None” means no specific registry dependency, not that all prior language knowledge is unnecessary. Numbering does not prescribe teaching order.
- Scope covers reading comprehension, vocabulary, grammar, listening, speaking, pronunciation, and oral interaction/mediation. Writing lessons, composition, orthography exercises, and written interaction practice are excluded; this registry does not represent full coverage of every CEFR skill. Gaps in numbering preserve existing IDs; removed IDs remain reserved.
- All production, interaction, and mediation outcomes below target speech and are **audio-dependent**, including where no inline label appears. Listening requires audio input, spoken production and pronunciation require learner audio, and oral interaction requires actual spoken exchange. Text-only activities can check reading comprehension and linguistic knowledge; transcripts and phonetic explanations cannot establish oral proficiency. Reading written sources remains in scope.
- The existing \`../tutor/core.ts\`, \`guided.ts\`, and \`free.ts\` govern teaching, assessment, progress, mode behavior, and safeguards. This registry adds no completion rules or assessment policy.
- Use a coherent, context-appropriate Spanish variety while developing receptive awareness of others. Include relevant distinctions such as tú/usted, ustedes/vosotros, and voseo without requiring production of every paradigm. Accept valid regional vocabulary, tense usage, and pronunciation; cultural conventions depend on community and situation. C2 does not require an accent indistinguishable from a first-language speaker or encyclopedic cultural knowledge.

## A1 — Beginner

### es-a1-001 — Greetings and personal introductions

- **Objective:** Exchange greetings and basic personal information with a supportive interlocutor.
- **Vocabulary:** Greetings, names, countries, nationalities, languages, occupations.
- **Grammar:** Present ser, llamarse, subject pronouns and basic subject omission; qué, cómo, de dónde; simple negation.
- **Skills:** Introduce oneself; ask and answer name, origin, and occupation questions; choose a familiar or polite greeting.
- **Prerequisites:** None.
- **CEFR alignment:** A1 basic social interaction and exchange of personal details.

### es-a1-002 — Exchanging and checking contact details

- **Objective:** Supply and check simple identifying information in a short spoken exchange.
- **Vocabulary:** Alphabet names, numbers, age, telephone, email, address.
- **Grammar:** Tener for age; basic interrogatives and confirmation patterns.
- **Skills:** Say a name letter by letter; give basic contact details; ask for confirmation of a number or address.
- **Prerequisites:** None.
- **CEFR alignment:** A1 supported oral exchange of personal information.

### es-a1-003 — People, family, and possessions

- **Objective:** Identify familiar people and describe basic characteristics and belongings.
- **Vocabulary:** Family relationships, everyday objects, colors, common physical descriptions.
- **Grammar:** Definite/indefinite articles; noun gender and plural; adjective agreement; tener; mi/tu/su; basic demonstratives.
- **Skills:** Identify a person; give a simple description; say who owns an object with agreement that supports understanding.
- **Prerequisites:** es-a1-001.
- **CEFR alignment:** A1 simple descriptions of familiar people and concrete surroundings; basic grammatical range.

### es-a1-004 — Home and immediate surroundings

- **Objective:** Say what exists in a familiar place and where known people or objects are.
- **Vocabulary:** Rooms, furniture, neighborhood places, aquí/allí, cerca/lejos.
- **Grammar:** Hay versus está/están; en, al lado de, delante de; basic ser for identification and estar for location.
- **Skills:** Describe a room in simple sentences; locate a known object; ask where a familiar place is.
- **Prerequisites:** es-a1-003.
- **CEFR alignment:** A1 descriptions of home and immediate surroundings; questions about immediate needs.

### es-a1-005 — Daily routines and time

- **Objective:** Exchange basic information about habitual activities and when they happen.
- **Vocabulary:** Daily actions, days, months, clock times, morning/evening, frequency.
- **Grammar:** Present indicative regular verbs and frequent irregulars; common reflexive routines; a las, por la mañana; y, luego.
- **Skills:** Describe a typical day; ask when an activity occurs; connect a few routine actions in order.
- **Prerequisites:** None.
- **CEFR alignment:** A1 familiar questions and short descriptions using basic linear connectors.

### es-a1-006 — Likes and simple choices

- **Objective:** Express basic likes and dislikes and choose between familiar activities or items.
- **Vocabulary:** Foods, leisure, sports, music, everyday preferences.
- **Grammar:** Me/te gusta + singular noun or infinitive, gustan + plural noun; también/tampoco; basic querer and preferir.
- **Skills:** State a preference; ask what another person likes; accept or reject a simple option.
- **Prerequisites:** None.
- **CEFR alignment:** A1 simple interaction on very familiar topics with a limited repertoire.

### es-a1-007 — Basic purchases and food orders

- **Objective:** Request familiar goods or food and exchange predictable price and quantity information.
- **Vocabulary:** Menu items, common groceries, prices, basic quantities, por favor, gracias.
- **Grammar:** Quiero/quería as useful request patterns; cuánto cuesta/cuestan; un/una; basic quantifiers.
- **Skills:** Request an item; ask its price; specify quantity and thank the other person with support if needed.
- **Prerequisites:** es-a1-002.
- **CEFR alignment:** A1 concrete immediate needs and very simple purchases.

### es-a1-008 — Immediate needs and physical states

- **Objective:** State a basic need or physical state and request simple help.
- **Vocabulary:** Hunger, thirst, tiredness, heat/cold, water, restroom, ayuda.
- **Grammar:** Necesitar + noun/infinitive; tener hambre/sed/frío; estar + common state adjectives; puedo + infinitive as a request pattern.
- **Skills:** Say what is needed; describe a familiar state; ask for help or permission simply.
- **Prerequisites:** None.
- **CEFR alignment:** A1 familiar expressions for concrete needs and supported interaction.

### es-a1-009 — Notices and predictable information

- **Objective:** Locate and pass on simple facts from short everyday written material.
- **Vocabulary:** Opening hours, dates, signs, destinations, abierto/cerrado, entrada/salida.
- **Grammar:** Recognition of familiar present forms, numbers, and basic time/place phrases.
- **Skills:** Identify a place and opening time; match a notice to a practical need; relay a stated date or destination without adding information.
- **Prerequisites:** es-a1-002.
- **CEFR alignment:** A1 reading familiar words and simple sentences; mediation of predictable written information.

### es-a1-010 — Supported exchange and communication repair

- **Objective:** Sustain a short supported exchange and request help when meaning is unclear.
- **Vocabulary:** Greetings, thanks, simple reactions, no entiendo, otra vez, más despacio.
- **Grammar:** Isolated present-tense sentences; y; familiar question patterns.
- **Skills:** Offer a simple greeting or reaction; answer a familiar question; request repetition or clarification and invite a simple response.
- **Prerequisites:** es-a1-001.
- **CEFR alignment:** A1 supported oral interaction and basic communication repair.

### es-a1-011 — Familiar words in slow speech

- **Objective:** Recognize familiar personal details in slow, clear speech and say short phrases about oneself (**audio-dependent**).
- **Vocabulary:** Names, family, origin, home, numbers, familiar activities.
- **Grammar:** Familiar present-tense phrases and simple questions.
- **Skills:** With audio, identify a name or number and respond to a basic question with repetition available; say where one lives. In text, identify the same information in a transcript only.
- **Prerequisites:** es-a1-001, es-a1-002.
- **CEFR alignment:** A1 oral reception, simple oral production, and highly supported oral interaction.

### es-a1-012 — Sound–spelling foundations

- **Objective:** Relate familiar spellings to Spanish sounds and pronounce a small repertoire intelligibly with interlocutor support (**audio-dependent** for pronunciation).
- **Vocabulary:** Familiar words illustrating vowels, ñ, r/rr, j/g, c/qu, silent h, and b/v.
- **Grammar:** Syllables, basic word stress, and recognition of stress cues in familiar spellings.
- **Skills:** In text, locate stressed syllables and explain common letter–sound correspondences; with audio, reproduce familiar vowels, consonants, and word stress. Recognize seseo and distinction as valid varieties.
- **Prerequisites:** None.
- **CEFR alignment:** A1 phonological control of familiar words and phrases.

## A2 — Elementary

### es-a2-001 — Background and everyday circumstances

- **Objective:** Describe living conditions, studies, work, and familiar people in a linked series of simple sentences.
- **Vocabulary:** Housing, education, jobs, responsibilities, personality, everyday relationships.
- **Grammar:** Present indicative consolidation; ser/estar in common descriptions; relative que; y, pero, porque; adjective agreement.
- **Skills:** Outline a living or work situation; describe a person's role; give a simple reason or contrast.
- **Prerequisites:** es-a1-003, es-a1-005.
- **CEFR alignment:** A2 descriptions of background and immediate environment; connected simple production.

### es-a2-002 — Completed events and experiences

- **Objective:** Exchange simple accounts of completed activities and personal experiences with clear time references.
- **Vocabulary:** Trips, weekends, milestones, ayer, la semana pasada, alguna vez.
- **Grammar:** Pretérito indefinido and pretérito perfecto compuesto; frequent irregulars and participles; regional differences in their distribution.
- **Skills:** State what happened and when; ask about an experience; distinguish a dated event from experience up to now without treating one region's tense preference as universal.
- **Prerequisites:** es-a1-005.
- **CEFR alignment:** A2 simple accounts of past activities and basic personal exchanges.

### es-a2-003 — Past habits and simple anecdotes

- **Objective:** Describe former routines and give a short anecdote distinguishing background from main events.
- **Vocabulary:** Childhood, school life, earlier living conditions, antes, entonces, de repente.
- **Grammar:** Pretérito imperfecto, including era/iba/veía; basic contrast with indefinido; cuando; simple sequencing.
- **Skills:** Describe a former habit; set a simple scene; relate what happened next in a short sequence.
- **Prerequisites:** es-a2-002.
- **CEFR alignment:** A2 simple descriptions of background and linked accounts of familiar events.

### es-a2-004 — Current activities and practical plans

- **Objective:** Explain what is happening now and arrange a near-future activity.
- **Vocabulary:** Appointments, invitations, availability, weather, travel plans.
- **Grammar:** Estar + gerundio; ir a + infinitive; present for arrangements; tener que/hay que + infinitive.
- **Skills:** Distinguish a routine from an activity in progress; propose a time; accept, decline with a reason, or reschedule.
- **Prerequisites:** es-a1-005, es-a1-006.
- **CEFR alignment:** A2 routine social exchanges, practical collaboration, and simple explanations of needs.

### es-a2-005 — Shopping comparisons and service requests

- **Objective:** Compare familiar goods and complete a routine service exchange, including a simple problem.
- **Vocabulary:** Sizes, materials, prices, accommodation, reservations, replacement, receipt.
- **Grammar:** Más/menos… que, tan… como, mejor/peor; direct/indirect object pronouns in common patterns; polite request formulas.
- **Skills:** Compare options; specify what needs changing; request a replacement or confirm reservation details in a predictable exchange.
- **Prerequisites:** es-a1-007.
- **CEFR alignment:** A2 routine transactions and direct information exchange.

### es-a2-006 — Directions and practical instructions

- **Objective:** Ask for and give simple routes, permissions, and instructions for a familiar task.
- **Vocabulary:** Street features, transport, household actions, steps, primero/después.
- **Grammar:** Common affirmative imperatives; poder; hay que; prohibition patterns such as no se puede; movement prepositions and al/del.
- **Skills:** Follow a short written route; explain ordered steps; ask permission and identify a simple prohibition.
- **Prerequisites:** es-a1-004.
- **CEFR alignment:** A2 simple instructions and collaboration on practical tasks.

### es-a2-007 — Health and everyday difficulties

- **Objective:** Explain a familiar physical problem and understand simple language about an appointment or routine recommendation.
- **Vocabulary:** Body parts, common symptoms, appointments, duration, everyday discomfort.
- **Grammar:** Doler and indirect object pronouns; estar/tener for symptoms; desde/hace; common advice patterns with infinitives.
- **Skills:** Describe location and duration of discomfort; request an appointment; restate a simple written recommendation as language practice.
- **Prerequisites:** es-a1-008.
- **CEFR alignment:** A2 immediate personal needs and predictable everyday information exchange.

### es-a2-008 — Everyday reading and relaying main points

- **Objective:** Extract predictable details and convey the main point of short everyday texts.
- **Vocabulary:** Advertisements, menus, schedules, simple instructions, personal correspondence.
- **Grammar:** Recognition of familiar present/past forms, basic connectors, and referents.
- **Skills:** Locate a required detail; identify what a short message requests; relay its main point without confusing sender, date, or action.
- **Prerequisites:** es-a1-009.
- **CEFR alignment:** A2 reading short simple texts and mediation of everyday written information.

### es-a2-010 — Cooperative exchanges and social conventions

- **Objective:** Maintain a short practical exchange, expressing a simple view and seeking agreement with support.
- **Vocabulary:** Suggestions, agreement, disagreement, apologies, address forms, routine courtesy.
- **Grammar:** Creo que + indicative; podemos + infinitive; ¿qué te parece?; consistent familiar/polite address.
- **Skills:** Ask another person's preference; make a suggestion; signal misunderstanding and seek a simple compromise; adjust address to the stated context.
- **Prerequisites:** es-a1-006, es-a1-010.
- **CEFR alignment:** A2 short social exchanges and mediation of concepts/communication in practical tasks.

### es-a2-011 — Clear messages and short oral descriptions

- **Objective:** Understand short clear announcements and describe familiar circumstances through a series of phrases (**audio-dependent**).
- **Vocabulary:** Transport announcements, shopping, work, family, immediate surroundings.
- **Grammar:** Familiar sentence patterns linked by y, pero, porque.
- **Skills:** With audio, identify the main point and needed detail, give a short description, and request repetition; in text, identify the main point and details in a transcript only.
- **Prerequisites:** es-a1-011, es-a2-001.
- **CEFR alignment:** A2 oral reception, short oral production, and routine oral exchanges.

### es-a2-012 — Stress and intelligibility in familiar phrases

- **Objective:** Apply basic stress conventions and make familiar phrases generally intelligible, with occasional repetition (**audio-dependent** for sound).
- **Vocabulary:** Familiar words illustrating diphthongs/hiatus and common stress contrasts.
- **Grammar:** Word stress, recognition of accent marks as reading cues, and question/statement phrasing.
- **Skills:** In text, recognize stress cues in familiar words and identify phrase boundaries; with audio, distinguish familiar sound/stress contrasts and produce understandable short phrases. Recognize common pronunciation variation without labeling it error.
- **Prerequisites:** es-a1-012.
- **CEFR alignment:** A2 phonological control with interlocutor collaboration when needed.

## B1 — Intermediate

### es-b1-001 — Connected narratives and personal change

- **Objective:** Narrate a familiar experience with background, event sequence, and personal reactions in a connected spoken account.
- **Vocabulary:** Life events, turning points, achievements, setbacks, feelings.
- **Grammar:** Indefinido/imperfecto/perfecto contrast; pluscuamperfecto indicative for prior events; time connectors and duration expressions.
- **Skills:** Establish chronology; distinguish background from completed events; explain how an experience affected someone without losing the narrative thread.
- **Prerequisites:** es-a2-002, es-a2-003.
- **CEFR alignment:** B1 accounts of experiences and events; straightforward connected production.

### es-b1-002 — Travel problems and practical solutions

- **Objective:** Resolve a non-routine but familiar travel or service problem through explanation and clarification.
- **Vocabulary:** Delays, lost property, booking errors, repairs, alternatives, refunds.
- **Grammar:** Past-event explanations; object pronouns and common combinations; conditional request forms such as podría; por/para in common contexts.
- **Skills:** Explain what went wrong; ask for an alternative; confirm the proposed solution and clarify an unfamiliar term.
- **Prerequisites:** es-a2-005, es-a2-010.
- **CEFR alignment:** B1 handling most travel situations and checking mutual understanding.

### es-b1-003 — Opinions with reasons

- **Objective:** State a view on a familiar subject and support it with reasons and a relevant example.
- **Vocabulary:** Education, work, leisure, community, media, advantages and difficulties.
- **Grammar:** Creo/pienso que + indicative; porque, por eso, además, sin embargo; common comparative constructions.
- **Skills:** Separate a view from its reason; give an example; acknowledge and respond to a different familiar view.
- **Prerequisites:** es-a2-010.
- **CEFR alignment:** B1 brief reasons and explanations for opinions and plans; connected discussion of familiar matters.

### es-b1-004 — Hopes, recommendations, and reactions

- **Objective:** Express a wish, recommendation, doubt, or emotional reaction concerning a present or future situation.
- **Vocabulary:** Goals, wellbeing, relationships, concern, satisfaction, uncertainty.
- **Grammar:** Present subjunctive in frequent patterns: querer que, recomendar que, es importante que, no creo que, ojalá; same-subject infinitive versus different-subject clause.
- **Skills:** State a wish; recommend an action; contrast an asserted belief with a doubt or reaction using common patterns.
- **Prerequisites:** es-b1-003.
- **CEFR alignment:** B1 expression of hopes, feelings, and opinions using a repertoire of frequent patterns.

### es-b1-005 — Plans, predictions, and future conditions

- **Objective:** Explain future plans and predictions and state when or under what realistic condition they will occur.
- **Vocabulary:** Ambitions, projects, deadlines, likely outcomes, future milestones.
- **Grammar:** Future indicative; ir a + infinitive contrast; si + present indicative; cuando + present subjunctive for future reference; para que + subjunctive for purpose.
- **Skills:** Distinguish intention from prediction; explain a realistic condition; link a future action to an anticipated event or purpose.
- **Prerequisites:** es-a2-004, es-b1-004.
- **CEFR alignment:** B1 descriptions of ambitions and explanations of plans.

### es-b1-006 — Instructions and everyday advice

- **Objective:** Give a usable explanation of a familiar process, including a precaution or recommendation.
- **Vocabulary:** Devices, study routines, practical procedures, common risks and solutions.
- **Grammar:** Affirmative/negative imperatives with common pronoun placement; conditional for advice; infinitive instructions; sequence and purpose clauses.
- **Skills:** Explain ordered steps; state what to avoid; respond to a clarification about the procedure.
- **Prerequisites:** es-a2-006, es-b1-004.
- **CEFR alignment:** B1 straightforward explanations and practical information exchange on familiar matters.

### es-b1-007 — Informational reading and paraphrase

- **Objective:** Understand a clear informational text on a familiar subject and convey its essential information.
- **Vocabulary:** Everyday news, work/study information, interests, common collocations and word families.
- **Grammar:** Relative que/donde/quien in familiar uses; pronoun reference; cause, contrast, and sequence markers.
- **Skills:** Identify main points and supporting facts; infer a familiar word from context; paraphrase key information while retaining source meaning.
- **Prerequisites:** es-a2-008.
- **CEFR alignment:** B1 reading high-frequency everyday/job-related texts and mediating well-structured familiar information.

### es-b1-009 — Collaborative discussion and clarification

- **Objective:** Help a group define a familiar task and maintain shared understanding during a spoken exchange.
- **Vocabulary:** Roles, priorities, proposals, reasons, clarification, agreement.
- **Grammar:** Questions for elaboration; decir que + indicative in simple reporting; paraphrase and reference to earlier contributions.
- **Skills:** Invite another person's contribution; ask why a proposal is useful; restate a view for confirmation; summarize an agreed next step.
- **Prerequisites:** es-a2-010, es-b1-003.
- **CEFR alignment:** B1 mediation of concepts and communication through collaborative discussion, with visual support for complex information when needed.

### es-b1-010 — Sustaining conversation through paraphrase

- **Objective:** Maintain a familiar-topic exchange despite vocabulary gaps and recognize common usage differences.
- **Vocabulary:** Everyday circumlocutions, interaction markers, context-relevant regional terms such as ordenador/computadora.
- **Grammar:** Descriptive relative clauses; repair and reformulation patterns; consistent address forms.
- **Skills:** Describe an unknown word by function; ask for explanation; repair a misunderstood message and close the exchange appropriately. Text can check understanding of repair strategies only.
- **Prerequisites:** es-a2-010, es-b1-007.
- **CEFR alignment:** B1 interaction maintenance, circumlocution, and confirmation of understanding.

### es-b1-011 — Main points and unprepared oral exchange

- **Objective:** Follow clear standard speech on familiar matters and enter an unprepared conversation on those matters (**audio-dependent**).
- **Vocabulary:** Work, study, travel, interests, accessible current events.
- **Grammar:** Connected familiar tense patterns and explanatory clauses.
- **Skills:** With audio, identify main points of a clear report, narrate an experience, and answer follow-up questions with planning pauses; in text, identify main points and narrative relationships in transcripts only.
- **Prerequisites:** es-a2-011, es-b1-001, es-b1-010.
- **CEFR alignment:** B1 oral reception, connected oral production, and unprepared familiar-topic interaction.

### es-b1-012 — Intelligible connected speech

- **Objective:** Make connected speech generally intelligible through word stress, phrasing, and basic intonation (**audio-dependent**).
- **Vocabulary:** Familiar phrases illustrating word boundaries, r/rr contrasts, and stressed/unstressed words.
- **Grammar:** Intonational groups; word and sentence stress; linking across word boundaries.
- **Skills:** With audio, distinguish familiar phrase boundaries and produce a connected account with comprehensible stress; in text, recognize phrase boundaries and stress-related meaning contrasts only.
- **Prerequisites:** es-a2-012.
- **CEFR alignment:** B1 phonological intelligibility with approximate word/utterance stress and intonation.

## B2 — Upper Intermediate

### es-b2-001 — Sustained arguments and alternatives

- **Objective:** Develop a clear argument on a general issue, weighing options and responding to a counterargument.
- **Vocabulary:** Society, environment, education, technology, benefits, limitations, consequences.
- **Grammar:** Causal, concessive, and consecutive clauses; aunque in factual/hypothetical contexts; contrast and conclusion markers.
- **Skills:** Support a claim with relevant details; compare advantages and disadvantages; address an objection and reach a justified conclusion.
- **Prerequisites:** es-b1-003, es-b1-004.
- **CEFR alignment:** B2 explanation and sustained justification of viewpoints, including advantages and disadvantages.

### es-b2-002 — Hypotheses, regrets, and unreal outcomes

- **Objective:** Explore hypothetical alternatives and explain how a past outcome could have differed.
- **Vocabulary:** Decisions, missed opportunities, causes, consequences, regret.
- **Grammar:** Imperfect subjunctive with conditional simple; pluscuamperfecto subjunctive with conditional compuesto; si clauses; relevant -ra/-se alternatives.
- **Skills:** Distinguish a realistic possibility from an unreal hypothesis; describe an unreal past condition and result; express regret without confusing event times.
- **Prerequisites:** es-b1-001, es-b1-004, es-b1-005.
- **CEFR alignment:** B2 range for complex viewpoints and relatively high grammatical control; Spanish scope supported by Cervantes B2 course material.

### es-b2-003 — Certainty, evaluation, and reference

- **Objective:** Make clear whether a claim is asserted, doubted, evaluated, or refers to something unidentified.
- **Vocabulary:** Evidence, probability, evaluation, requirements, known/unknown referents.
- **Grammar:** Indicative/subjunctive in noun, relative, and concessive clauses; present perfect subjunctive; future/conditional for conjecture; future perfect for anticipated completion.
- **Skills:** Distinguish evidence from supposition; describe an unidentified person or item sought; explain how mood choice changes a message in a clear context.
- **Prerequisites:** es-b1-004, es-b1-005, es-b1-007.
- **CEFR alignment:** B2 clear viewpoints and sufficient grammatical range for complex sentence forms.

### es-b2-004 — Reporting statements and requests

- **Objective:** Report another person's account, question, or request while preserving perspective and temporal relations.
- **Vocabulary:** Reporting verbs, announcements, interviews, instructions, explanations.
- **Grammar:** Indirect statements/questions; reported requests with subjunctive; tense and deictic shifts; unchanged forms when context warrants them.
- **Skills:** Attribute a claim; report a request; adjust person, time, and place references without implying agreement or inventing details.
- **Prerequisites:** es-b1-001, es-b1-009, es-b2-002.
- **CEFR alignment:** B2 reliable transmission of detailed information and viewpoints.

### es-b2-005 — Detailed spoken explanations

- **Objective:** Explain a process, trend, or issue in one's field of interest with clear organization and detail.
- **Vocabulary:** Field-relevant terminology, quantities, trends, methods, results.
- **Grammar:** Passive with ser; passive/impersonal se; result states with estar; expanded noun phrases; relative clauses and reference chains.
- **Skills:** Describe stages or trends; distinguish agent, process, and result; organize a spoken explanation for a listener who needs supporting detail.
- **Prerequisites:** es-b1-006, es-b1-007.
- **CEFR alignment:** B2 detailed production and technical discussion within the learner's field.

### es-b2-006 — Stance and literary interpretation

- **Objective:** Read articles, reports, and contemporary literary prose, distinguishing content from authorial viewpoint.
- **Vocabulary:** Public issues, narrative description, evaluative language, common figurative expressions.
- **Grammar:** Complex clause relationships; aspect in narration; reference, ellipsis, and discourse markers.
- **Skills:** Trace an argument; identify stance with textual support; explain a character's motives or a narrative event without reducing inference to stated fact.
- **Prerequisites:** es-b1-001, es-b1-007.
- **CEFR alignment:** B2 reading stance-bearing articles/reports and contemporary literary prose.

### es-b2-008 — Negotiation and disagreement

- **Objective:** Participate actively in a multi-person spoken discussion, negotiating an outcome and handling misunderstanding.
- **Vocabulary:** Proposals, reservations, concessions, priorities, terms, compromise.
- **Grammar:** Mitigation with conditional and subjunctive; concessive clauses; reference to others' contributions; reformulation markers.
- **Skills:** Link a response to a previous contribution; justify a reservation; clarify a disputed point and propose a workable compromise with cooperative participants.
- **Prerequisites:** es-b1-009, es-b1-010, es-b2-001.
- **CEFR alignment:** B2 active oral discussion and support for collaborative reasoning.

### es-b2-009 — Detailed mediation of texts and ideas

- **Objective:** Convey significant information and arguments from complex but well-structured material in a familiar field.
- **Vocabulary:** Summarizing, comparison, evidence, points of agreement/disagreement, field-specific terms.
- **Grammar:** Reporting and reformulation; concessive/causal relations; cohesive reference.
- **Skills:** Separate central claims from examples; relay qualifications accurately; connect two participants' ideas and invite elaboration without misattribution.
- **Prerequisites:** es-b2-004, es-b2-006.
- **CEFR alignment:** B2 mediation of detailed texts and development of others' ideas, with clarification available.

### es-b2-010 — Register and regional appropriateness

- **Objective:** Adjust language to familiar social/professional contexts and interpret common regional or colloquial alternatives.
- **Vocabulary:** Common idioms, collocations, address conventions, workplace/social formulas.
- **Grammar:** Contextual pronoun/address choices, including receptive voseo/vosotros where relevant; tense and pragmatic alternatives across varieties.
- **Skills:** Rephrase a request for a different social relationship; explain the likely effect of a colloquial phrase; distinguish a valid regional form from an error using contextual support.
- **Prerequisites:** es-b1-010.
- **CEFR alignment:** B2 linguistic range and appropriate participation in familiar social contexts.

### es-b2-011 — Extended oral argument and discussion

- **Objective:** Follow extended speech on reasonably familiar topics and sustain an active oral discussion (**audio-dependent**).
- **Vocabulary:** News, public issues, interests, field-related explanations and argument.
- **Grammar:** Complex argument structure and varied cohesive devices.
- **Skills:** With audio, follow a line of reasoning, identify major viewpoints in standard-language media, and defend a position with responsive turns; in text, identify viewpoints and lines of reasoning in transcripts only.
- **Prerequisites:** es-b1-011, es-b2-001, es-b2-008.
- **CEFR alignment:** B2 extended oral comprehension and fluent, spontaneous interaction without undue strain.

### es-b2-012 — Prosody for clear emphasis

- **Objective:** Use articulation, stress, and intonation to keep extended speech clear and highlight intended meaning (**audio-dependent**).
- **Vocabulary:** Phrases contrasting focus, questions, certainty, and polite requests.
- **Grammar:** Sentence focus, intonational grouping, rhythm, and common sound linking.
- **Skills:** With audio, identify emphatic information, articulate clearly, and place stress/intonation appropriately; in text, recognize how alternative emphasis could change an interpretation only.
- **Prerequisites:** es-b1-012.
- **CEFR alignment:** B2 phonological control with little or no effect of retained accent on intelligibility.

## C1 — Advanced

### es-c1-001 — Implicit meaning in demanding texts

- **Objective:** Interpret long factual, literary, and specialized texts, recognizing implicit meaning and stylistic distinctions.
- **Vocabulary:** Abstract concepts, specialized terminology, connotation, metaphor, allusion.
- **Grammar:** Dense noun phrases; embedded clauses; ellipsis; complex anaphoric reference and discourse organization.
- **Skills:** Infer an implied position from evidence; explain a stylistic contrast; interpret unfamiliar technical instructions with occasional reference checks and rereading.
- **Prerequisites:** es-b2-006.
- **CEFR alignment:** C1 demanding reading, including specialized material outside one's field and distinctions of style.

### es-c1-002 — Nuanced stance and evidential distance

- **Objective:** Express precise degrees of certainty, reservation, evaluation, and distance from a reported claim.
- **Vocabulary:** Hedging, evidential language, reservations, competing interpretations, evaluative collocations.
- **Grammar:** Context-sensitive mood choice; scope of negation; modal tense uses; conditional for attributed/unconfirmed claims; reporting-verb distinctions.
- **Skills:** Distinguish assertion from inference or attribution; qualify an overgeneralization; reformulate a claim to change commitment while preserving its core content.
- **Prerequisites:** es-b2-003, es-b2-004.
- **CEFR alignment:** C1 precise formulation and flexible linguistic range for complex subjects.

### es-c1-003 — Information structure and fine grammatical control

- **Objective:** Reorganize complex statements to control focus, agency, aspect, and reference without obscuring meaning.
- **Vocabulary:** Abstract nominalizations, aspectual expressions, change-of-state verbs, verb–preposition combinations.
- **Grammar:** Word order and dislocation; clitic reference and values of se; nominalization and non-finite clauses; nuanced ser/estar and aspectual periphrases.
- **Skills:** Shift emphasis through sentence structure; resolve ambiguous reference; choose a construction that clarifies process, result, or change and self-correct a misleading formulation.
- **Prerequisites:** es-b2-005.
- **CEFR alignment:** C1 flexibility, high grammatical accuracy, and controlled cohesion.

### es-c1-005 — Diplomatic social and professional interaction

- **Objective:** Handle a sensitive or complex spoken exchange using tactful, precise language adapted to the relationship.
- **Vocabulary:** Reservations, objections, delicate requests, negotiated commitments, conciliatory language.
- **Grammar:** Indirectness, mitigation, conditionals/subjunctive, modal periphrases, pragmatic discourse markers.
- **Skills:** Express firm disagreement diplomatically; clarify an ambiguous commitment; adjust register and explain a misunderstanding without attributing unsupported motives.
- **Prerequisites:** es-b2-008, es-b2-010, es-c1-002.
- **CEFR alignment:** C1 flexible social/professional oral interaction and mediation of communication problems.

### es-c1-006 — Idioms, connotation, and cultural references

- **Objective:** Interpret and use a broad range of idiomatic and colloquial language with sensitivity to context.
- **Vocabulary:** Fixed expressions, figurative collocations, non-explicit humor, culturally situated references.
- **Grammar:** Pragmatic markers, expressive word order, ellipsis, contextual register shifts.
- **Skills:** Explain a connotation beyond literal meaning; paraphrase an unfamiliar idiom using context or reference support; adapt a culturally specific expression for a different audience without stereotyping.
- **Prerequisites:** es-b2-010, es-c1-001.
- **CEFR alignment:** C1 broad linguistic range, implicit meaning, and effective sociolinguistic adaptation.

### es-c1-007 — Mediation of long complex material

- **Objective:** Convey significant ideas from long complex material clearly, concisely, and accurately for a new audience.
- **Vocabulary:** Abstract/specialized terms, definitions, paraphrase, source attribution, explanatory analogies.
- **Grammar:** Reporting structures; nominal/verbal reformulation; cohesion across summaries and explanations.
- **Skills:** Reconstruct a difficult argument; explain a technical concept after checking it where needed; preserve qualifications while making the message accessible to a non-specialist.
- **Prerequisites:** es-b2-009, es-c1-001.
- **CEFR alignment:** C1 text mediation beyond one's interests, with occasional checks of technical concepts.

### es-c1-008 — Guiding collaborative reasoning

- **Objective:** Guide a complex spoken discussion by connecting perspectives and helping participants reach a reasoned conclusion.
- **Vocabulary:** Assumptions, criteria, implications, shared ground, unresolved differences.
- **Grammar:** Open questions; synthesis and concession markers; accurate attribution and cohesive reference.
- **Skills:** Ask a question building on earlier contributions; weigh competing views fairly; clarify ambiguity and steer discussion toward a conclusion without erasing dissent.
- **Prerequisites:** es-b2-008, es-b2-009, es-c1-005.
- **CEFR alignment:** C1 mediation of concepts and communication through perspective-sensitive collaborative reasoning.

### es-c1-009 — Implicit oral discourse and flexible delivery

- **Objective:** Follow extended, loosely structured speech and communicate complex ideas fluently in social/professional exchanges (**audio-dependent**).
- **Vocabulary:** Abstract issues, implicit attitudes, idiomatic language, professional discussion.
- **Grammar:** Implicit discourse relationships, complex development, flexible turn-prefacing formulas.
- **Skills:** With audio, infer relationships left unstated, follow demanding media, integrate subthemes in a presentation, and respond spontaneously; in text, identify implicit relationships and attitudes in transcripts only.
- **Prerequisites:** es-b2-011, es-c1-005.
- **CEFR alignment:** C1 extended oral comprehension, structured complex production, and fluent flexible interaction.

### es-c1-010 — Prosody and pragmatic intent

- **Objective:** Use a broad range of phonological features to convey pragmatic intent while remaining intelligible throughout (**audio-dependent**).
- **Vocabulary:** Phrases expressing reservation, reassurance, contrast, emphasis, and tact.
- **Grammar:** Prosodic focus, intonational contours, rhythm, phrasing, and sound linking in connected speech.
- **Skills:** With audio, interpret attitudinal cues and deliver a complex message with controlled stress/intonation and clear articulation; in text, explain possible prosodic intentions only.
- **Prerequisites:** es-b2-012.
- **CEFR alignment:** C1 phonological control ensuring intelligibility despite possible retained accent features.

## C2 — Proficient

### es-c2-001 — Complex texts and interpretive nuance

- **Objective:** Read virtually all types of complex Spanish text with ease, explaining subtle evaluative and stylistic effects.
- **Vocabulary:** Abstract argument, literary imagery, specialized terms, allusion, irony, understatement.
- **Grammar:** Marked syntax; layered reference; non-canonical ordering; context-bound ellipsis and rhetorical constructions.
- **Skills:** Reconstruct a difficult argument; distinguish a literal reading from an ironic one with evidence; explain how form shapes interpretation while acknowledging genuine ambiguity.
- **Prerequisites:** es-c1-001, es-c1-006.
- **CEFR alignment:** C2 reading abstract, structurally complex, specialized, and literary texts; precise interpretation of nuance.

### es-c2-002 — Synthesis across conflicting sources

- **Objective:** Reconstruct and evaluate accounts from multiple written sources in a coherent synthesis preserving nuances and disagreement.
- **Vocabulary:** Evidence, corroboration, contradiction, source limitations, evaluative and attributive language.
- **Grammar:** Flexible reporting and qualification; source-reference chains; compression and expansion of complex clauses.
- **Skills:** Reconcile chronology where supported; distinguish incompatible claims from different emphases; explain evaluative framing and sociocultural implications without inventing agreement.
- **Prerequisites:** es-c1-007, es-c2-001.
- **CEFR alignment:** C2 synthesis of sources and text mediation conveying evaluative aspects and most nuances precisely.

### es-c2-003 — Precise reformulation and ambiguity control

- **Objective:** Reformulate complex ideas to convey fine shades of meaning, eliminate unintended ambiguity, or create deliberate emphasis.
- **Vocabulary:** Near-synonyms, idiomatic collocations, gradation, evaluative and aspectual distinctions.
- **Grammar:** Flexible mood/tense selection, scope and focus, aspectual/modal alternatives, marked word order and reference control.
- **Skills:** Compare plausible formulations; explain how each changes commitment or emphasis; repair an ambiguous statement while maintaining consistent control of complex grammar.
- **Prerequisites:** es-c1-002, es-c1-003.
- **CEFR alignment:** C2 flexible reformulation, fine semantic distinctions, and consistent grammatical control.

### es-c2-005 — Sensitive interaction and unobtrusive repair

- **Objective:** Handle complex spoken interaction with precise tone, anticipating misunderstanding and adjusting to others' reactions.
- **Vocabulary:** Diplomatic distinctions, emotional nuance, idiomatic responses, sensitive qualifications.
- **Grammar:** Flexible indirectness, mitigation, reference to others' wording, concise reformulation and discourse repair.
- **Skills:** Anticipate an unintended implication; adapt a response to an interlocutor's expressed concern; backtrack and restructure without losing the exchange's purpose. Text can check recognition of repair strategies only.
- **Prerequisites:** es-c1-005, es-c2-003.
- **CEFR alignment:** C2 flexible oral interaction, nuanced expression, and smooth communication repair.

### es-c2-006 — Sociolinguistic nuance and rhetorical play

- **Objective:** Interpret and deploy register, idiom, and non-explicit rhetorical play with fine sensitivity to audience and setting.
- **Vocabulary:** Colloquialisms, wordplay, allusion, understatement, irony, context-specific formulas.
- **Grammar:** Expressive syntax; pragmatic particles; register-dependent constructions; recognition of rare literary/administrative forms when encountered.
- **Skills:** Explain competing readings of humor; adapt an allusion for a different community; identify when a marked form is contextually effective rather than assuming all unusual forms are errors.
- **Prerequisites:** es-c1-006, es-c2-001.
- **CEFR alignment:** C2 idiomatic range and sociolinguistic sensitivity, including subtle evaluative implications.

### es-c2-007 — Mediation across perspectives and communities

- **Objective:** Mediate complex abstract disagreement while conveying fine distinctions and helping participants identify a way forward.
- **Vocabulary:** Perspective, implicit assumptions, cultural framing, common ground, qualifications, competing priorities.
- **Grammar:** Flexible attributed paraphrase, contrast, qualification, synthesis, and tactful questioning.
- **Skills:** Explain a culturally situated implication without generalizing to a whole community; link and evaluate competing reasoning; formulate shared ground while retaining substantive differences.
- **Prerequisites:** es-c1-008, es-c2-002, es-c2-005.
- **CEFR alignment:** C2 mediation of concepts and communication across sociocultural/sociolinguistic differences.

### es-c2-008 — Fast varied speech and oral-source synthesis

- **Objective:** Understand virtually any oral discourse at fast natural speed after reasonable accent familiarization and synthesize oral/written sources (**audio-dependent**).
- **Vocabulary:** Broad abstract/specialized language, idioms, colloquialisms, evaluative cues.
- **Grammar:** Compressed and elliptical speech, implicit connections, reporting and synthesis.
- **Skills:** With audio, recover argument and nuance across sources, distinguish speakers' attitudes, and produce an attributed synthesis; in text, compare claims and source attribution across transcripts and reading material only.
- **Prerequisites:** es-c1-009, es-c2-002.
- **CEFR alignment:** C2 oral reception with accent familiarization and synthesis across oral/written sources.

### es-c2-009 — Effortless oral interaction and effective presentation

- **Objective:** Participate very fluently in complex oral exchanges and present a logically effective argument adapted to listeners (**audio-dependent**).
- **Vocabulary:** Precise idiomatic language, fine qualifications, responsive turn-management expressions.
- **Grammar:** Flexible rhetorical organization, reformulation, allusive reference, and grammatical control during spontaneous production.
- **Skills:** In actual spoken exchange, interweave contributions, respond to intonational/non-verbal cues where available, and repair smoothly; in spoken presentation, highlight memorable points. Text can check interpretation of contributions only.
- **Prerequisites:** es-c1-009, es-c2-003, es-c2-005.
- **CEFR alignment:** C2 spontaneous oral fluency, skilled turn-taking, and effective oral production.

### es-c2-010 — Prosody for fine shades of meaning

- **Objective:** Control phonological and prosodic choices so finer intentions remain clear in complex speech (**audio-dependent**).
- **Vocabulary:** Contextual phrases contrasting irony/sincerity, reassurance/reservation, and degrees of emphasis.
- **Grammar:** Interplay of intonation, stress, rhythm, pauses, and syntactic focus.
- **Skills:** With audio, distinguish subtle pragmatic effects and vary delivery to convey them precisely without compromising intelligibility; in text, recognize possible effects of phrasing only.
- **Prerequisites:** es-c1-010.
- **CEFR alignment:** C2 high phonological/prosodic control; retained accent features do not affect intelligibility.

## Sources and Alignment Notes

- **Primary proficiency source:** The repository's [A1](../cefr/a1.ts), [A2](../cefr/a2.ts), [B1](../cefr/b1.ts), [B2](../cefr/b2.ts), [C1](../cefr/c1.ts), and [C2](../cefr/c2.ts) files. Alignment fields paraphrase their capability categories; they are not official descriptor numbers, quotations, or claims of exhaustive coverage. Reading and oral reception, oral production/interaction, mediation, and qualitative features inform the progression; writing descriptors are outside this application's curriculum scope.
- **Architectural context:** [Core](../tutor/core.ts), [Guided Learning](../tutor/guided.ts), and [Free Learning](../tutor/free.ts) were read for compatibility. Their teaching and progress rules remain separate from curriculum content.
- **PCIC framework, partially accessible via search-indexed official content:** [PCIC overview](https://cvc.cervantes.es/ensenanza/biblioteca_ELE/plan_curricular/default.htm), [index](https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/indice.htm), and [general introduction](https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/introduccion.htm). These support attention to communicative functions, language resources, discourse, and intercultural competence rather than a grammar-only course. The inventory headings do not verify every objective's exact level assignment.
- **Beginner/elementary scope cross-check:** Official [AVE Grama-Exprés contents](https://ave.cervantes.es/grama-expres/niveles-y-contenidos-de-los-cursos-grama-expres) and [Stockholm A2 course scope](https://estocolmo.cervantes.es/es/cursos_espanol/estudiantes_espanol/cursos_generales_espanol/generales_inicial_a2_espanol.htm), consulted through indexed content, support A2 past-tense narration, present-progressive forms, object pronouns, and common imperatives. These are examples of Cervantes instructional scope, not universal CEFR grammar requirements.
- **Intermediate scope cross-check:** The official [AVE B1 future-reference guidance](https://cvc.cervantes.es/ensenanza/actividades_ave/nivelII/ficha_46.htm), [Aveteca level index](https://cvc.cervantes.es/ensenanza/actividades_ave/aveteca.htm), and [Shanghai B2 course scope](https://shanghai.cervantes.es/es/cursos_espanol/nivel_B2.htm), consulted through indexed content, support B1 future-reference subjunctive and B2 imperfect/pluscuamperfecto subjunctive and conditional-compound work. No activities from these sources are reproduced here.
- **Advanced scope cross-check:** Indexed official [PCIC C1–C2 general objectives](https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/niveles/01_objetivos_relacion_c1-c2.htm) and [C1–C2 grammar inventory](https://cvc.cervantes.es/ensenanza/biblioteca_Ele/plan_curricular/niveles/02_gramatica_inventario_c1-c2.htm) support attention to inference, register, modal nuance, and marked constructions. Paired-level search extracts do not always preserve column attribution; this registry's exact C1/C2 division is an instructional proposal checked primarily against the local descriptors.
- **Access limitation (2026-11-11):** Direct requests for the PCIC index and A1–A2/B1–B2 grammar inventories redirected to Cervantes maintenance; other requests failed. Official indexed extracts and course pages enabled partial cross-checking, not a complete inventory audit. This document is therefore a proposed, partially source-checked curriculum, not an officially verified or endorsed PCIC syllabus.
- **Interpretation and review:** CEFR describes capabilities rather than prescribing exact Spanish word/grammar lists. All IDs, groupings, prerequisites, examples, and exact instructional allocations here are application-specific proposals. Repeated grammar supports increasingly demanding communicative outcomes; first exposure is not equivalent to full control. Review exact PCIC column placements when access returns, particularly fine C1/C2 distinctions. Regional production priorities may be chosen per learner without changing shared communicative targets; no single regional variety is assumed.`,
    context,
  )
}
