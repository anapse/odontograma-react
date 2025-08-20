import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/odontograma-react/' : '/';
  
  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: false,
      cors: true
    }
  }
})
