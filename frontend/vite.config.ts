import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 10080,
    allowedHosts: true,
    proxy: {
      '/api': 'http://127.0.0.1:10081',
    },
  },
})
