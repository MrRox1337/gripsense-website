import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the built site works from ANY GitHub Pages path,
  // e.g. https://<user>.github.io/<any-repo-name>/ — no need to hard-code a repo name.
  base: './',
  plugins: [vue(), tailwindcss()],
  server: {
    // Allow Vite's dev server to read the sibling ../Progress folder (txt + images)
    // which lives one level above this website/ root.
    fs: {
      allow: ['..'],
    },
  },
})
