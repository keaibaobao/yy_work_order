import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "node:path";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig({
  base:'/',
  plugins: [
      vue(),
    // 修改 svg 相关配置
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(__dirname, './src/icons/svg')],
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  server:{
    port:3022,
    open:false,
    hmr:true,//开启热加载
    proxy:{
      '/api':{
        target:'http://localhost:8099',
        changeOrigin:true,
        rewrite:path=>path.replace(/^\/api/,'')
      }
    }
  },
  resolve:{
    //使用@路径
    alias:{
      "@": path.resolve("./src")
    }
  },
  build:{
    outDir:'build',
    assetsDir:'assets'
  }
})
