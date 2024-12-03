import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/car': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        secure: false
      },
      '/user': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        secure: false
      },


    }
  }
})
