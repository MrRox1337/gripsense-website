<script setup>
import { reveal as vReveal } from '../directives/reveal.js'

const props = defineProps({
  post: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

// Rotate the three primaries across the card index tabs.
const accents = ['bg-red', 'bg-blue', 'bg-yellow', 'bg-ink']
const accent = accents[props.index % accents.length]
const isYellow = accent === 'bg-yellow'
</script>

<template>
  <a
    v-reveal="index * 60"
    :href="`#${post.id}`"
    class="group flex flex-col border-2 border-ink bg-paper transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#141414] focus-visible:-translate-y-1"
  >
    <!-- index tab -->
    <div :class="accent" class="flex items-center justify-between px-4 py-2">
      <span
        class="font-mono text-xs font-semibold tracking-widest"
        :class="isYellow ? 'text-ink' : 'text-paper'"
      >
        {{ post.label.toUpperCase() }}
      </span>
      <span
        class="font-mono text-xs"
        :class="isYellow ? 'text-ink/70' : 'text-paper/80'"
      >
        {{ post.readingTime }} MIN
      </span>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <h3
        class="font-display text-xl font-bold leading-tight tracking-tight text-ink"
      >
        {{ post.title }}
        <span v-if="post.isDraft" class="align-middle text-xs font-normal text-red"
          >· draft</span
        >
      </h3>

      <time
        :datetime="post.dateISO"
        class="mt-2 block font-mono text-[0.68rem] uppercase tracking-widest text-ink-soft"
      >
        {{ post.dateLabel }}
      </time>

      <p class="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
        {{ post.excerpt }}
      </p>

      <div class="mt-5 flex flex-wrap items-center gap-2">
        <span
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          class="border border-ink/25 px-2 py-0.5 font-mono text-[0.68rem] text-ink-soft"
        >
          {{ tag }}
        </span>
      </div>

      <span
        class="mt-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-ink"
      >
        Read entry
        <span class="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
    </div>
  </a>
</template>
