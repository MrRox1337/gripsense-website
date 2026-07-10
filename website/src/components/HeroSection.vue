<script setup>
import BlogCard from './BlogCard.vue'
import { reveal as vReveal } from '../directives/reveal.js'
import { site, author, supervisor } from '../data/site.js'
import { weekPosts, meetings, stats } from '../content.js'
</script>

<template>
  <section id="home" class="relative overflow-hidden pt-[4.5rem]">
    <!-- decorative Bauhaus geometry -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -right-16 top-24 h-72 w-72 rounded-full bg-yellow/70"></div>
      <div class="absolute right-40 top-10 h-24 w-24 bg-blue"></div>
      <div
        class="absolute right-24 top-72 h-0 w-0 border-b-[90px] border-l-[52px] border-r-[52px] border-b-red border-l-transparent border-r-transparent"
      ></div>
    </div>

    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <!-- headline block -->
      <div class="grid gap-10 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div v-reveal>
          <div class="flex items-center gap-4">
            <span class="kicker text-ink-soft">{{ site.courseCode }}</span>
            <span class="h-[3px] w-16 bg-red"></span>
            <span class="kicker text-ink-soft">Dissertation</span>
          </div>

          <h1
            class="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            Smart <span class="text-red">Object-in-Hand</span> Aware
            <span class="text-blue">Universal Gripper</span>
          </h1>

          <p class="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            {{ site.tagline }}
          </p>

          <div class="mt-10 flex flex-wrap gap-4">
            <a
              href="#blog"
              class="inline-flex items-center gap-2 bg-ink px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5"
            >
              Read the research log <span>→</span>
            </a>
            <a
              href="#about"
              class="inline-flex items-center gap-2 border-2 border-ink px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              About the project
            </a>
          </div>
        </div>

        <!-- overview / spec card -->
        <aside
          v-reveal="120"
          class="grid-paper self-start border-2 border-ink bg-paper p-6 sm:p-8"
        >
          <h2 class="kicker text-ink-soft">Project overview</h2>
          <p class="mt-4 leading-relaxed text-ink-soft">
            The Picker-Bot has, until now, existed only in simulation. This dissertation
            takes it into the physical world by removing a fragile assumption — that an
            object is always neatly in hand — and replacing it with a gripper that
            <strong class="font-semibold text-ink"
              >senses what it is holding</strong
            >, from the millimetre-scale sensor up to a single-board computer.
          </p>

          <dl class="mt-8 grid grid-cols-3 divide-x-2 divide-ink border-t-2 border-ink">
            <div class="px-2 pt-4 text-center">
              <dt class="font-display text-3xl font-bold text-red">{{ stats.weeks }}</dt>
              <dd class="mt-1 font-mono text-[0.62rem] uppercase tracking-widest text-ink-soft">
                Log entries
              </dd>
            </div>
            <div class="px-2 pt-4 text-center">
              <dt class="font-display text-3xl font-bold text-blue">{{ stats.meetings }}</dt>
              <dd class="mt-1 font-mono text-[0.62rem] uppercase tracking-widest text-ink-soft">
                Meetings
              </dd>
            </div>
            <div class="px-2 pt-4 text-center">
              <dt class="font-display text-3xl font-bold text-ink">
                {{ stats.totalWeeks }}
              </dt>
              <dd class="mt-1 font-mono text-[0.62rem] uppercase tracking-widest text-ink-soft">
                Week plan
              </dd>
            </div>
          </dl>

          <div class="mt-6 space-y-1 border-t-2 border-ink pt-4 font-mono text-xs text-ink-soft">
            <p>
              <span class="text-ink">Author</span> · {{ author.name }} ({{ author.studentId }})
            </p>
            <p><span class="text-ink">Supervisor</span> · {{ supervisor.name }}</p>
            <p><span class="text-ink">Institution</span> · {{ author.university }}</p>
          </div>
        </aside>
      </div>

      <!-- card grid -> blog posts -->
      <div class="pb-20">
        <div v-reveal class="mb-8 flex items-end justify-between border-b-2 border-ink pb-4">
          <div>
            <span class="kicker text-ink-soft">Latest from the log</span>
            <h2 class="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Research entries
            </h2>
          </div>
          <a
            href="#blog"
            class="hidden font-mono text-xs font-semibold uppercase tracking-widest text-ink link-underline sm:inline"
          >
            View all →
          </a>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <BlogCard
            v-for="(post, i) in weekPosts"
            :key="post.id"
            :post="post"
            :index="i"
          />
        </div>
      </div>
    </div>
  </section>
</template>
