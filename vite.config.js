import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  
  // ✅ base للمسار الصحيح (لـ GitHub Pages)
  base: '/',
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
  // إخفاء شعار Vue DevTools في الإنتاج
  define: {
    '__VUE_PROD_DEVTOOLS__': false
  },
  
  // التأكد من نسخ الملفات الثابتة من public
  publicDir: 'public',
  
  // إعدادات البناء
  build: {
    // تنظيف مجلد dist قبل البناء
    emptyOutDir: true,
    // ✅ تصحيح manualChunks - استخدام دالة بدلاً من كائن
    rollupOptions: {
      output: {
        manualChunks(id) {
          // تقسيم ملفات Vue إلى chunk منفصل
          if (id.includes('node_modules/vue') || id.includes('node_modules/vue-router')) {
            return 'vendor'
          }
          // تقسيم مكتبات أخرى
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  
  // إعدادات خادم التطوير
  server: {
    port: 5173,
    open: true,
    host: true
  }
})
