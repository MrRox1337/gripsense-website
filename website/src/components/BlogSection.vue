<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import SectionHeader from './SectionHeader.vue'
import PostArticle from './PostArticle.vue'
import { weekPosts, stats } from '../content.js'

// Track which entries are expanded.
const expanded = reactive({})

function toggle(id) {
  expanded[id] = !expanded[id]
}

// If the URL points at an entry (e.g. a card link -> #week-2), expand it.
function expandFromHash() {
  const id = window.location.hash.replace('#', '')
  if (id && weekPosts.some((p) => p.id === id)) {
    expanded[id] = true
  }
}

onMounted(() => {
  expandFromHash()
  window.addEventListener('hashchange', expandFromHash)
})
onBeforeUnmount(() => window.removeEventListener('hashchange', expandFromHash))
</script>

<template>
  <section id="blog" class="bg-paper-2/60">
    <div class="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
      <SectionHeader
        index="02"
        kicker="Weekly progress"
        title="Research Log"
        accent="red"
      />

      <div class="space-y-14">
        <PostArticle
          v-for="post in weekPosts"
          :key="post.id"
          :post="post"
          :expanded="!!expanded[post.id]"
          @toggle="toggle"
        />
      </div>

      <p
        v-if="weekPosts.length < stats.totalWeeks"
        class="mt-16 border-2 border-dashed border-ink/30 bg-paper p-5 text-center font-mono text-xs text-ink-soft"
      >
        Weeks {{ String(weekPosts.length + 1).padStart(2, '0') }}–{{ stats.totalWeeks }} will
        appear here automatically as <span class="text-ink">Week_N.txt</span> files are added
        to the Progress folder.
      </p>
    </div>
  </section>
</template>
