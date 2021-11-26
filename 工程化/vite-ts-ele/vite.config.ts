import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require("path");
const VITE_OUTPUT_PATH = loadEnv('', process.cwd()).VITE_OUTPUT_PATH
const VITE_VIEWS_PATH = loadEnv('', process.cwd()).VITE_VIEWS_PATH
const VITE_OUTPUT_PUBLIC_PATH  = loadEnv('', process.cwd()).VITE_OUTPUT_PUBLIC_PATH
const VITE_PROXY_URL = loadEnv('', process.cwd()).VITE_PROXY_URL
const VITE_PROXY_BASE_URL = loadEnv('', process.cwd()).VITE_PROXY_BASE_URL

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  base: "./",
  plugins: [
    vue()
  ],
  build: {
    outDir: VITE_OUTPUT_PATH,
    assetsDir: VITE_OUTPUT_PUBLIC_PATH,
  },
  server: {
    proxy: {
      // 如果是 /api 打头，则访问地址如下
      [`${VITE_PROXY_URL}`]: {
        target: VITE_PROXY_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/`${VITE_PROXY_URL}`/, ""),
      },
    }
  }
})