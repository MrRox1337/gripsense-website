<script setup>
// The project's geometric identity mark: a Bauhaus composition of the three
// primaries as circle · triangle · square. Scales with the `size` prop.
defineProps({
  size: { type: Number, default: 34 },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    role="img"
    aria-label="Project mark"
    class="shrink-0"
  >
    <rect x="1" y="1" width="46" height="46" fill="none" stroke="#141414" stroke-width="2" />
    <!-- blue quarter block -->
    <rect x="1" y="1" width="23" height="23" fill="#005bbb" />
    <!-- yellow circle -->
    <circle cx="35.5" cy="12.5" r="11.5" fill="#ffc400" />
    <!-- red triangle -->
    <polygon points="12.5,47 1,25 24,25" fill="#e4002b" />
    <!-- ink square -->
    <rect x="25" y="25" width="22" height="22" fill="#141414" />
  </svg>
</template>
