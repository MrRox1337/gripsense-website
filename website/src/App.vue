<script setup>
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import BlogSection from './components/BlogSection.vue'
import MeetingsSection from './components/MeetingsSection.vue'
import FilesSection from './components/FilesSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <SiteNav />
  <main>
    <HeroSection />
    <AboutSection />
    <BlogSection />
    <MeetingsSection />
    <FilesSection />
  </main>
  <ContactSection />
</template>
