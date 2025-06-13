import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssPresetEnv from 'postcss-preset-env'
import { fileURLToPath } from 'url';
import {resolve, dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
  ],
  
  css: {
    postcss:{
      // 使用postcss-preset-env插件，这个插件支持css变量和一些未来css语法以及自动补全(autoprefixer)
      plugins:[postcssPresetEnv()]
    }
  },

  resolve: {
    alias: {
      // @ 替代为 src
      '@': resolve(__dirname, 'src'),
      // @component 替代为 src/component
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },

  // 其他配置项...
  optimizeDeps: {
    include: ['ws']
  },

  server: {
    proxy: {
      '/socket.io': 'http://localhost:5000'
    }
  }
})
