import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base is the GitHub Pages project path (https://kejit80888752.github.io/NatureSoul-Resort/)
export default defineConfig({
  base: '/NatureSoul-Resort/',
  server: {
    port: Number(process.env.PORT) || 5174,
  },
  plugins: [react()],
})
