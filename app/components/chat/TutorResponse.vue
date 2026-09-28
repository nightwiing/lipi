<script setup lang="ts">
import type { TutorResponse } from '#shared/schemas/tutor-response'

defineProps<{
  response: TutorResponse
}>()
</script>

<template>
  <div class="space-y-4 text-sm leading-6">
    <section v-if="response.answer.targetText || response.answer.translation || response.answer.explanation">
      <p v-if="response.answer.targetText" class="font-medium">
        {{ response.answer.targetText }}
      </p>
      <p v-if="response.answer.translation" class="text-muted-foreground">
        {{ response.answer.translation }}
      </p>
      <p v-if="response.answer.explanation">
        {{ response.answer.explanation }}
      </p>
    </section>

    <section v-if="response.correction" class="border-l-2 border-primary pl-3">
      <h3 class="font-medium">Correction</h3>
      <p class="text-muted-foreground line-through">{{ response.correction.original }}</p>
      <p class="font-medium">{{ response.correction.corrected }}</p>
      <p>{{ response.correction.explanation }}</p>
    </section>

    <section v-if="response.vocabulary.length" class="space-y-2">
      <h3 class="font-medium">Vocabulary</h3>
      <ul class="space-y-2">
        <li v-for="item in response.vocabulary" :key="`${item.term}-${item.meaning}`" class="border p-3">
          <div class="flex flex-wrap items-baseline gap-x-2">
            <span class="font-medium">{{ item.term }}</span>
            <span class="text-xs text-muted-foreground">{{ item.partOfSpeech }}</span>
          </div>
          <p>{{ item.meaning }}</p>
          <p v-if="item.grammaticalGender" class="text-muted-foreground">
            Gender: {{ item.grammaticalGender.value
            }}<template v-if="item.grammaticalGender.article">
              · {{ item.grammaticalGender.article }}</template
            >
          </p>
          <p v-if="item.grammaticalGender?.note" class="text-muted-foreground">
            {{ item.grammaticalGender.note }}
          </p>
          <p v-if="item.number" class="text-muted-foreground">
            <template v-if="item.number.singular">Singular: {{ item.number.singular }}</template>
            <template v-if="item.number.singular && item.number.plural"> · </template>
            <template v-if="item.number.plural">Plural: {{ item.number.plural }}</template>
          </p>
          <p v-if="item.number?.note" class="text-muted-foreground">{{ item.number.note }}</p>
        </li>
      </ul>
    </section>

    <section v-if="response.notes.grammar.length" class="space-y-2">
      <h3 class="font-medium">Grammar</h3>
      <div v-for="note in response.notes.grammar" :key="note.title">
        <p class="font-medium">{{ note.title }}</p>
        <p>{{ note.explanation }}</p>
      </div>
    </section>

    <section v-if="response.notes.culture.length" class="space-y-2 border-l-2 pl-3">
      <h3 class="font-medium">Culture</h3>
      <div v-for="note in response.notes.culture" :key="`${note.region}-${note.title}`">
        <p class="font-medium">
          {{ note.title }}<span v-if="note.region"> · {{ note.region }}</span>
        </p>
        <p>{{ note.explanation }}</p>
      </div>
    </section>

    <section v-if="response.notes.regional.length" class="space-y-2">
      <h3 class="font-medium">Regional usage</h3>
      <div v-for="note in response.notes.regional" :key="`${note.region}-${note.title}`">
        <p class="font-medium">
          {{ note.title }}<span v-if="note.region"> · {{ note.region }}</span>
        </p>
        <p>{{ note.explanation }}</p>
      </div>
    </section>

    <section v-if="response.examples.length" class="space-y-2">
      <h3 class="font-medium">Examples</h3>
      <ul class="space-y-2">
        <li v-for="example in response.examples" :key="`${example.targetText}-${example.translation}`">
          <p>{{ example.targetText }}</p>
          <p class="text-muted-foreground">{{ example.translation }}</p>
        </li>
      </ul>
    </section>

    <p v-if="response.followUp" class="font-medium">{{ response.followUp }}</p>
  </div>
</template>
