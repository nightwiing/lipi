<template>
  <fieldset :disabled="disabled" class="min-w-0 space-y-4 disabled:opacity-50">
    <legend class="text-base font-medium">{{ label }}</legend>
    <div class="flex flex-wrap gap-3">
      <Button
        v-for="option in options"
        :key="option.value"
        type="button"
        :variant="model === option.value ? 'default' : 'outline'"
        :aria-pressed="model === option.value"
        :disabled="disabled"
        @click="model = option.value"
      >
        {{ option.label }}
      </Button>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

defineProps<{
  label: string
  options: readonly { label: string; value: string }[]
  disabled?: boolean
}>()

const model = defineModel<string>({ required: true })
</script>
