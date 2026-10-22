import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Dev only: leave VITE_API_BASE_URL empty and set VITE_DEV_PROXY_TARGET so the browser talks to
  // Vite and Vite forwards /api/* to the backend (no CORS issues).
  const target = env.VITE_DEV_PROXY_TARGET
  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5174,
      strictPort: true,
      proxy: target ? { '/api': { target, changeOrigin: false } } : undefined,
    },
    preview: { port: 5174 },
  }
})
