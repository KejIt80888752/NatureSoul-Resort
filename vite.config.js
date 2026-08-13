import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base is the GitHub Pages project path (https://<user>.github.io/naturesoul-resort-site/)
export default defineConfig({
  base: '/naturesoul-resort-site/',
  plugins: [react()],
})
