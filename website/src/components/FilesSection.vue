<script setup>
import SectionHeader from './SectionHeader.vue'
import { reveal as vReveal } from '../directives/reveal.js'
import { files } from '../data/site.js'

const accentBg = {
  red: 'bg-red text-paper',
  blue: 'bg-blue text-paper',
  yellow: 'bg-yellow text-ink',
  ink: 'bg-ink text-paper',
}
</script>

<template>
  <section id="files" class="bg-paper-2/60">
    <div class="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
      <SectionHeader
        index="04"
        kicker="Deliverables & resources"
        title="Files"
        accent="ink"
      />

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="(f, i) in files"
          :key="f.key"
          v-reveal="i * 60"
          :href="f.url"
          target="_blank"
          rel="noopener"
          class="group flex flex-col justify-between border-2 border-ink bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#141414]"
        >
          <div class="flex items-start justify-between">
            <span
              :class="accentBg[f.accent]"
              class="flex h-11 w-11 items-center justify-center font-display text-lg font-bold"
            >
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span
              class="text-2xl text-ink transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              >↗</span
            >
          </div>

          <div class="mt-8">
            <h3 class="font-display text-xl font-bold leading-tight tracking-tight text-ink">
              {{ f.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ f.desc }}</p>
          </div>
        </a>
      </div>

      <p class="mt-8 font-mono text-xs text-ink-soft">
        * Links currently point to placeholders — set real URLs in
        <span class="text-ink">src/data/site.js</span>.
      </p>
    </div>
  </section>
</template>
