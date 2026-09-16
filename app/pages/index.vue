<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const learnerName = ref('')
const { data: health } = await useFetch('/api/health')
</script>

<template>
  <main class="mx-auto flex min-h-dvh w-full max-w-xl items-center px-6 py-12">
    <section class="w-full space-y-8">
      <div class="space-y-3">
        <p class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
          {{ health?.status === 'ok' ? 'Server connected' : 'Connecting to server' }}
        </p>
        <h1 class="text-4xl font-semibold tracking-tight">Lang Tutor</h1>
        <p class="text-muted-foreground">
          Nuxt, Nitro server routes, and the Sera component system are ready.
        </p>
      </div>

      <form class="flex gap-3" @submit.prevent>
        <Input v-model="learnerName" aria-label="Your name" placeholder="Your name" />
        <Button type="submit">Continue</Button>
      </form>
    </section>
  </main>
</template>
