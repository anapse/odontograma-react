import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/odontomap/', // Esta debe ser el nombre de tu repositorio
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    host: true,         
    port: 5173,         
    strictPort: false,  
    cors: true
  }
})
