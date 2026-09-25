<script setup>
import SectionHeader from './SectionHeader.vue'
import FigureBlock from './FigureBlock.vue'
import { reveal as vReveal } from '../directives/reveal.js'
import { projectPlan } from '../data/site.js'
</script>

<template>
  <section id="plan" class="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
    <SectionHeader index="03" kicker="Timeline" title="Project Plan" accent="red" />

    <p class="-mt-6 mb-4 max-w-2xl font-mono text-sm text-ink-soft">
      Gantt chart of the dissertation schedule.
    </p>

    <div v-reveal>
      <FigureBlock :file="projectPlan.image" :caption="projectPlan.caption" />
    </div>
  </section>
</template>
