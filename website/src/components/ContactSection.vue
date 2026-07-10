<script setup>
import BauhausMark from './BauhausMark.vue'
import { reveal as vReveal } from '../directives/reveal.js'
import { site, author, supervisor, contact } from '../data/site.js'

const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="bg-ink text-paper">
    <div class="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
      <!-- accent stripe -->
      <div class="mb-14 flex h-2 w-full" aria-hidden="true">
        <span class="h-full flex-1 bg-red"></span>
        <span class="h-full flex-1 bg-yellow"></span>
        <span class="h-full flex-1 bg-blue"></span>
      </div>

      <div class="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div v-reveal>
          <span class="kicker text-paper/60">Get in touch</span>
          <h2
            class="mt-4 font-display text-4xl font-bold leading-[1.03] tracking-tight sm:text-5xl md:text-6xl"
          >
            Let’s talk<br />grippers &amp; robotics.
          </h2>
          <p class="mt-6 max-w-md leading-relaxed text-paper/70">
            Questions about the design, the build, or collaboration? Reach out through
            any of these channels.
          </p>
        </div>

        <!-- links -->
        <nav v-reveal="120" class="self-end">
          <ul class="divide-y divide-paper/20 border-y-2 border-paper/30">
            <li v-for="c in contact" :key="c.key">
              <a
                :href="c.url"
                :target="c.key === 'email' ? undefined : '_blank'"
                rel="noopener"
                class="group flex items-center justify-between py-4 font-display text-lg font-semibold transition-colors hover:text-yellow"
              >
                {{ c.label }}
                <span class="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- meta row -->
      <div
        class="mt-16 flex flex-col gap-6 border-t-2 border-paper/30 pt-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-center gap-3">
          <BauhausMark :size="30" />
          <div class="font-mono text-xs leading-relaxed text-paper/60">
            <p class="text-paper">{{ site.title }}</p>
            <p>{{ site.courseCode }} · {{ author.university }}</p>
          </div>
        </div>
        <div class="font-mono text-xs text-paper/60">
          <p>{{ author.name }} ({{ author.studentId }}) · Supervised by {{ supervisor.name }}</p>
          <p class="mt-1">© {{ year }} · Built with Vue + Vite</p>
        </div>
      </div>
    </div>
  </footer>
</template>
