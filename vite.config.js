import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // three.js lives in its own lazy-loaded chunk (only fetched for the
    // opening envelope's particle effect), so a larger chunk is expected.
    chunkSizeWarningLimit: 1000,
  },
})
