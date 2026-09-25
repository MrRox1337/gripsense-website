<script setup>
import { computed } from 'vue'
import { resolveImage } from '../content.js'

const props = defineProps({
  file: { type: String, required: true },
  alt: { type: String, default: '' },
  accent: { type: String, default: 'yellow' }, // yellow | blue | red
})

// Real photo if it has been dropped into Progress/images, else null.
const src = computed(() => resolveImage(props.file))

const accentBg = { yellow: 'bg-yellow', blue: 'bg-blue', red: 'bg-red' }
</script>

<template>
  <div class="relative w-40 shrink-0 sm:w-48">
    <!-- offset Bauhaus block behind the frame -->
    <span :class="accentBg[accent]" class="absolute left-2 top-2 h-full w-full"></span>

    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="relative aspect-[4/5] w-full border-2 border-ink bg-paper-2 object-cover"
      loading="lazy"
    />

    <!-- Placeholder shown until the matching file exists -->
    <div
      v-else
      class="grid-paper relative flex aspect-[4/5] w-full items-center justify-center border-2 border-dashed border-ink/40 bg-paper-2"
    >
      <div class="px-3 text-center">
        <p class="kicker text-ink-soft">Photo</p>
        <p class="mt-2 break-all font-mono text-[0.65rem] text-ink-soft">
          add <span class="font-semibold text-ink">Progress/images/{{ file }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
