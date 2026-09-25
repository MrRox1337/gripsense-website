<script setup>
import SectionHeader from './SectionHeader.vue'
import BauhausMark from './BauhausMark.vue'
import PortraitBlock from './PortraitBlock.vue'
import { reveal as vReveal } from '../directives/reveal.js'
import { author, supervisor } from '../data/site.js'
</script>

<template>
  <section id="about" class="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
    <SectionHeader index="01" kicker="Who / With whom" title="About" accent="blue" />

    <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <!-- author -->
      <article v-reveal>
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end">
          <PortraitBlock :file="author.photo" :alt="author.name" accent="yellow" />
          <div>
            <span class="kicker text-ink-soft">Author</span>
            <h3 class="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {{ author.name }}
            </h3>
            <p class="mt-1 font-mono text-xs uppercase tracking-widest text-red">
              {{ author.role }}
            </p>
            <p class="mt-1 font-mono text-xs text-ink-soft">{{ author.university }}</p>
          </div>
        </div>

        <hr class="my-6 rule-heavy" />

        <div class="prose-bauhaus max-w-2xl">
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
      </article>

      <!-- supervisor -->
      <aside v-reveal="120" class="self-start border-2 border-ink bg-paper-2 p-6 sm:p-8">
        <div class="flex items-center justify-between">
          <span class="kicker text-ink-soft">Supervision</span>
          <BauhausMark :size="28" />
        </div>

        <div class="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end">
          <PortraitBlock :file="supervisor.photo" :alt="supervisor.name" accent="blue" />
          <div>
            <h3 class="font-display text-2xl font-bold leading-tight tracking-tight text-ink">
              {{ supervisor.name }}
            </h3>
            <p class="mt-1 font-mono text-xs uppercase tracking-widest text-blue">
              {{ supervisor.role }}
            </p>
            <p class="mt-1 font-mono text-xs text-ink-soft">{{ supervisor.title }}</p>
          </div>
        </div>

        <hr class="my-6 rule-heavy" />

        <div class="space-y-4 leading-relaxed text-ink-soft">
          <p v-for="(para, i) in supervisor.bio" :key="i">{{ para }}</p>
        </div>

        <p class="mt-6 font-mono text-xs text-ink-soft">
          <span class="text-ink">Institution</span><br />{{ supervisor.university }}
        </p>
      </aside>
    </div>
  </section>
</template>
