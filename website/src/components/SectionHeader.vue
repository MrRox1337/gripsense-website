<script setup>
import { reveal as vReveal } from '../directives/reveal.js'

defineProps({
  index: { type: String, default: '' }, // e.g. "02"
  kicker: { type: String, required: true }, // eyebrow label
  title: { type: String, required: true },
  accent: { type: String, default: 'red' }, // red | blue | yellow | ink
})

const accentBar = {
  red: 'bg-red',
  blue: 'bg-blue',
  yellow: 'bg-yellow',
  ink: 'bg-ink',
}
</script>

<template>
  <header v-reveal class="mb-12 md:mb-16">
    <div class="flex items-center gap-4">
      <span class="kicker text-ink-soft">{{ kicker }}</span>
      <span :class="accentBar[accent]" class="h-[3px] w-16"></span>
      <span v-if="index" class="kicker text-ink-soft">— {{ index }}</span>
    </div>
    <h2
      class="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl"
    >
      <slot name="title">{{ title }}</slot>
    </h2>
  </header>
</template>
