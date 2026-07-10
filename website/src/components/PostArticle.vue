<script setup>
import { computed } from 'vue'
import { formatInline } from '../content.js'
import FigureBlock from './FigureBlock.vue'
import { reveal as vReveal } from '../directives/reveal.js'

const props = defineProps({
  post: { type: Object, required: true },
  expanded: { type: Boolean, default: false },
})
defineEmits(['toggle'])

// Collapsed preview: the first two paragraphs only, no figures.
const previewBlocks = computed(() => {
  const out = []
  for (const b of props.post.blocks) {
    if (b.kind === 'para') {
      out.push(b)
      if (out.length >= 2) break
    }
  }
  return out
})

const visibleBlocks = computed(() =>
  props.expanded ? props.post.blocks : previewBlocks.value,
)
</script>

<template>
  <article
    :id="post.id"
    v-reveal
    class="scroll-mt-24 border-t-[3px] border-ink pt-8"
  >
    <div class="grid gap-8 md:grid-cols-[8rem_1fr]">
      <!-- left rail: big number + meta -->
      <div class="md:sticky md:top-24 md:self-start">
        <div class="font-display text-6xl font-bold leading-none text-ink/15 md:text-7xl">
          {{ String(post.number).padStart(2, '0') }}
        </div>
        <div class="mt-3 kicker text-ink-soft">{{ post.label }}</div>
        <div class="mt-1 font-mono text-xs text-ink-soft">
          {{ post.readingTime }} min read
        </div>
        <span
          v-if="post.isDraft"
          class="mt-3 inline-block bg-red px-2 py-0.5 font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-paper"
        >
          In progress
        </span>
      </div>

      <!-- right: title + body -->
      <div>
        <h3
          class="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          {{ post.title }}
        </h3>

        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="border border-ink/25 px-2 py-0.5 font-mono text-[0.68rem] text-ink-soft"
          >
            {{ tag }}
          </span>
        </div>

        <div
          class="prose-bauhaus mt-7"
          :class="!expanded && 'relative'"
        >
          <template v-for="(block, i) in visibleBlocks" :key="i">
            <p v-if="block.kind === 'para'" v-html="formatInline(block.text)"></p>

            <ul
              v-else-if="block.kind === 'list'"
              class="my-5 space-y-2.5"
            >
              <li
                v-for="(item, j) in block.items"
                :key="j"
                class="flex gap-3 text-ink-soft"
              >
                <span class="mt-2 h-1.5 w-1.5 shrink-0 bg-red"></span>
                <span v-html="formatInline(item)"></span>
              </li>
            </ul>

            <FigureBlock
              v-else-if="block.kind === 'figure'"
              :file="block.file"
              :caption="block.caption"
            />
          </template>

          <!-- fade hint over the collapsed preview -->
          <div
            v-if="!expanded"
            class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-paper to-transparent"
          ></div>
        </div>

        <button
          type="button"
          class="group mt-6 inline-flex items-center gap-2 border-2 border-ink bg-paper px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper"
          @click="$emit('toggle', post.id)"
        >
          {{ expanded ? 'Collapse entry' : 'Read full entry' }}
          <span
            class="transition-transform duration-200"
            :class="expanded ? 'rotate-180' : 'group-hover:translate-y-0.5'"
            >↓</span
          >
        </button>
      </div>
    </div>
  </article>
</template>
