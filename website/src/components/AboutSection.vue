<script setup>
import SectionHeader from './SectionHeader.vue'
import BauhausMark from './BauhausMark.vue'
import { reveal as vReveal } from '../directives/reveal.js'
import { author, supervisor } from '../data/site.js'
</script>

<template>
  <section id="about" class="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
    <SectionHeader index="01" kicker="Who / With whom" title="About" accent="blue" />

    <div class="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <!-- author -->
      <div v-reveal>
        <div class="flex items-center gap-4">
          <div class="flex h-14 w-14 items-center justify-center border-2 border-ink bg-yellow">
            <span class="font-display text-2xl font-bold text-ink">{{
              author.name.charAt(0)
            }}</span>
          </div>
          <div>
            <h3 class="font-display text-2xl font-bold tracking-tight text-ink">
              {{ author.name }}
            </h3>
            <p class="font-mono text-xs uppercase tracking-widest text-ink-soft">
              {{ author.role }} · {{ author.studentId }}
            </p>
          </div>
        </div>

        <div class="prose-bauhaus mt-7 max-w-2xl">
          <p v-for="(para, i) in author.bio" :key="i">{{ para }}</p>
        </div>

        <div class="mt-8">
          <p class="kicker text-ink-soft">Focus areas</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="f in author.focus"
              :key="f"
              class="border-2 border-ink px-3 py-1 font-mono text-xs text-ink"
            >
              {{ f }}
            </span>
          </div>
        </div>
      </div>

      <!-- supervisor -->
      <aside v-reveal="120" class="self-start border-2 border-ink bg-paper-2 p-6 sm:p-8">
        <div class="flex items-center justify-between">
          <span class="kicker text-ink-soft">Supervision</span>
          <BauhausMark :size="28" />
        </div>

        <h3 class="mt-6 font-display text-2xl font-bold leading-tight tracking-tight text-ink">
          {{ supervisor.name }}
        </h3>
        <p class="mt-1 font-mono text-xs uppercase tracking-widest text-blue">
          {{ supervisor.role }}
        </p>

        <hr class="my-5 rule-heavy" />

        <p class="leading-relaxed text-ink-soft">{{ supervisor.note }}</p>

        <p class="mt-6 font-mono text-xs text-ink-soft">
          <span class="text-ink">Institution</span><br />{{ supervisor.university }}
        </p>
      </aside>
    </div>
  </section>
</template>
