import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/apis': {
        //代理地址
        target: 'http://119yb.cc', //测试环境
        changeOrigin: true, //是否跨域run
        ws: true,
        pathRewrite: {
          '^/apis': ''
        }
      },
      '/youdao': {
        //代理地址
        target: 'http://fanyi.youdao.com', //测试环境
        changeOrigin: true, //是否跨域run
        ws: true,
        pathRewrite: {
          '^/youdao': ''
        }
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
