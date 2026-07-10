<script setup>
import { computed } from 'vue'
import { resolveImage } from '../content.js'

const props = defineProps({
  file: { type: String, required: true },
  caption: { type: String, default: '' },
})

// Real image if the student has dropped it into Progress/images, else null.
const src = computed(() => resolveImage(props.file))
</script>

<template>
  <figure class="my-9">
    <!-- Actual image -->
    <img
      v-if="src"
      :src="src"
      :alt="caption"
      class="w-full border-2 border-ink bg-paper-2 object-cover"
      loading="lazy"
    />

    <!-- Placeholder shown until the matching file exists -->
    <div
      v-else
      class="grid-paper relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border-2 border-dashed border-ink/40 bg-paper-2"
    >
      <!-- decorative Bauhaus shapes -->
      <span class="absolute left-6 top-6 h-10 w-10 rounded-full bg-yellow"></span>
      <span
        class="absolute bottom-6 right-6 h-0 w-0 border-b-[42px] border-l-[24px] border-r-[24px] border-b-red border-l-transparent border-r-transparent"
      ></span>
      <span class="absolute right-20 top-8 hidden h-8 w-8 bg-blue sm:block"></span>

      <div class="z-10 px-6 text-center">
        <p class="kicker text-ink-soft">Image placeholder</p>
        <p class="mt-2 font-mono text-xs text-ink-soft">
          add <span class="font-semibold text-ink">Progress/images/{{ file }}</span>
        </p>
      </div>
    </div>

    <figcaption
      v-if="caption"
      class="mt-3 flex gap-3 border-l-2 border-ink pl-3 font-mono text-[0.78rem] leading-snug text-ink-soft"
    >
      <span class="font-semibold text-ink">FIG</span>
      <span>{{ caption }}</span>
    </figcaption>
  </figure>
</template>
