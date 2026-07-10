<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BauhausMark from './BauhausMark.vue'
import { navLinks } from '../data/site.js'

const active = ref('home')
const menuOpen = ref(false)
let observer

onMounted(() => {
  // Scroll-spy: highlight the nav item for the section currently in view.
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) active.value = entry.target.id
      })
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  )
  navLinks.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onBeforeUnmount(() => observer && observer.disconnect())

function go() {
  menuOpen.value = false
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b-[3px] border-ink bg-paper/90 backdrop-blur-md"
  >
    <nav class="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
      <!-- brand -->
      <a href="#home" class="flex items-center gap-3" @click="go">
        <BauhausMark :size="34" />
        <span class="hidden font-display text-sm font-bold leading-none tracking-tight sm:block">
          OBJECT-IN-HAND<br /><span class="text-ink-soft">UNIVERSAL GRIPPER</span>
        </span>
      </a>

      <!-- desktop links -->
      <ul class="hidden items-center gap-7 md:flex">
        <li v-for="link in navLinks" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="link-underline font-mono text-xs font-medium uppercase tracking-widest transition-colors"
            :class="active === link.id ? 'text-ink' : 'text-ink-soft hover:text-ink'"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- mobile toggle -->
      <button
        class="flex h-9 w-9 items-center justify-center border-2 border-ink md:hidden"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="relative block h-3 w-4">
          <span
            class="absolute left-0 top-0 h-0.5 w-4 bg-ink transition-transform"
            :class="menuOpen && 'translate-y-[5px] rotate-45'"
          ></span>
          <span
            class="absolute bottom-0 left-0 h-0.5 w-4 bg-ink transition-transform"
            :class="menuOpen && '-translate-y-[5px] -rotate-45'"
          ></span>
        </span>
      </button>
    </nav>

    <!-- mobile menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <ul v-if="menuOpen" class="border-t-2 border-ink bg-paper px-5 py-4 md:hidden">
        <li v-for="link in navLinks" :key="link.id" class="border-b border-ink/10 last:border-0">
          <a
            :href="`#${link.id}`"
            class="block py-3 font-mono text-sm uppercase tracking-widest"
            :class="active === link.id ? 'text-red' : 'text-ink'"
            @click="go"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </transition>
  </header>
</template>
