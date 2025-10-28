import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : process.env.NODE_ENV === 'production' ? '/WAapp/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true
  }
})
