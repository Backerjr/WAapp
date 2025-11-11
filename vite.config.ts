import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Use VITE_BASE_PATH env var if set, otherwise use /WAapp/ for production, / for dev
  const basePath = process.env.VITE_BASE_PATH || (mode === 'production' ? '/WAapp/' : '/');
  
  return {
    plugins: [react()],
    // base URL for production builds, or root for development
    base: basePath,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        zustand: resolve(__dirname, './src/lib/state/zustand-lite'),
        'zustand/middleware': resolve(__dirname, './src/lib/state/zustand-persist-lite'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5000,
      allowedHosts: true
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        }
      }
    }
  }
})
