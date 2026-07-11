import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      // Reduces Safari tab crashes when the dev server restarts mid-session.
      overlay: false,
    },
  },
})