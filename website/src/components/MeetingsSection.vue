<script setup>
import SectionHeader from './SectionHeader.vue'
import { reveal as vReveal } from '../directives/reveal.js'
import { formatInline, meetings } from '../content.js'
import { supervisor } from '../data/site.js'
</script>

<template>
  <section id="meetings" class="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
    <SectionHeader
      index="03"
      kicker="Supervision logbook"
      title="Meetings"
      accent="yellow"
    />

    <p class="-mt-6 mb-12 max-w-2xl font-mono text-sm text-ink-soft">
      Chronological record of supervision meetings with {{ supervisor.name }}.
    </p>

    <!-- timeline -->
    <ol class="relative border-l-[3px] border-ink">
      <li
        v-for="(m, i) in meetings"
        :key="m.id"
        v-reveal="i * 80"
        class="relative ml-6 pb-14 last:pb-0 sm:ml-10"
      >
        <!-- node -->
        <span
          class="absolute -left-[calc(1.5rem+8px)] top-1.5 flex h-4 w-4 items-center justify-center sm:-left-[calc(2.5rem+8px)]"
        >
          <span class="h-4 w-4 border-2 border-ink bg-yellow"></span>
        </span>

        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span class="font-mono text-xs font-semibold uppercase tracking-widest text-ink-soft">
            {{ m.label }}
          </span>
          <time
            :datetime="m.dateISO"
            class="font-mono text-xs font-semibold uppercase tracking-widest text-red"
          >
            {{ m.dateLabel }}
          </time>
          <span class="h-px flex-1 bg-ink/15"></span>
        </div>

        <h3
          class="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl"
        >
          {{ m.title }}
        </h3>

        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="tag in m.tags"
            :key="tag"
            class="border border-ink/25 px-2 py-0.5 font-mono text-[0.68rem] text-ink-soft"
          >
            {{ tag }}
          </span>
        </div>

        <div class="prose-bauhaus mt-5 max-w-2xl">
          <template v-for="(block, j) in m.blocks" :key="j">
            <p v-if="block.kind === 'para'" v-html="formatInline(block.text)"></p>
            <ul v-else-if="block.kind === 'list'" class="my-4 space-y-2">
              <li
                v-for="(item, k) in block.items"
                :key="k"
                class="flex gap-3 text-ink-soft"
              >
                <span class="mt-2 h-1.5 w-1.5 shrink-0 bg-blue"></span>
                <span v-html="formatInline(item)"></span>
              </li>
            </ul>
          </template>
        </div>
      </li>
    </ol>
  </section>
</template>
