import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // <- permite conexiones externas
    port: 5173,         // <- asegúrate que este es tu puerto real
    strictPort: false,  // <- para evitar errores si el puerto está ocupado
    cors: true,        // <- habilita CORS por si lo necesitas
    origin: 'https://0fa1345e9f13.ngrok-free.app' // opcional pero recomendado
  }
})
