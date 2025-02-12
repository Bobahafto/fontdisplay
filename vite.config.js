import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
      host: '0.0.0.0',  // Erlaubt den Zugriff von anderen Geräten
      port: 5173,       // Standardport von Vite (kann geändert werden)
    }
})
