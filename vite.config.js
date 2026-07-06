import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base doit correspondre EXACTEMENT au nom du depot GitHub Pages
export default defineConfig({
  base: '/jerseys-world/',
  plugins: [react()],
})
