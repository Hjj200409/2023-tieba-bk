import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import veauryVitePlugin from 'veaury/vite'

export default defineConfig({
  plugins: [
    vue(),
    react(),
    veauryVitePlugin({
      vueOptions: {},
      reactOptions: {}
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})