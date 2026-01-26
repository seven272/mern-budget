import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: true,
    port: 5173, // This is the port which we will use in docker
    allowedHosts: [
      'http://185.251.89.77',
      'http://185.251.89.77:8030',
      'sportplans.ru',
      'www.sportplans.ru',
    ],
  },
  preview: {
    port: 4444,
    strictPort: true,
  },
})
