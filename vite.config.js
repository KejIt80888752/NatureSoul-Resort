import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Two sites are built from this one codebase:
//
//   npm run build            → guest website  → github.io/NatureSoul-Resort/
//   npm run build:dashboard  → staff dashboard → github.io/NatureSoul-Dashboard/
//
// They are deployed to separate repositories, so the dashboard code never ships
// with the public site and the two have completely separate links.
const isDashboard = process.env.VITE_APP === 'dashboard'

export default defineConfig({
  base: isDashboard ? '/NatureSoul-Dashboard/' : '/NatureSoul-Resort/',
  server: {
    port: Number(process.env.PORT) || 5174,
  },
  build: {
    outDir: isDashboard ? 'dist-dashboard' : 'dist',
    rollupOptions: {
      input: isDashboard
        ? resolve(__dirname, 'dashboard.html')
        : resolve(__dirname, 'index.html'),
    },
  },
  plugins: [react()],
})
