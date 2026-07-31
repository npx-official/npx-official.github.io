import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // هذا القسم سيجعل Vite يبحث عن الملفات في writeups و public
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url))
      }
    },
    assetsInlineLimit: 0
  },
  define: {
    '__VUE_PROD_DEVTOOLS__': false
  }
})
