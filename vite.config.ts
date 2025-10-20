import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/WAapp/',
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true
  }
})
