<template>
  <component
    :is="icon"
    v-if="icon"
    :size="size"
    :weight="weight"
    :color="color"
    :stroke-width="strokeWidth"
    :aria-label="label"
    :aria-hidden="label ? undefined : true"
    :role="label ? 'img' : undefined"
    focusable="false"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as icons from 'reicon-vue'
import type { IconWeight } from 'reicon-vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    name: Exclude<keyof typeof icons, 'createIcon'>
    size?: number | string
    weight?: IconWeight
    color?: string
    strokeWidth?: number | string
    label?: string
  }>(),
  {
    size: 24,
    weight: 'Outline',
  },
)

const icon = computed(() => (Object.hasOwn(icons, props.name) ? icons[props.name] : undefined))
</script>
