import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      cache: false // 禁用 eslint 缓存
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      // 给scss添加全局变量
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  server: {
    port: 3001,
    proxy: {
      // 字符串简写写法
      // /foo/123 => http://localhost:4567/foo/123
      // '/foo': 'http://localhost:4567/foo',
      // 选项写法
      '/admin': {
        // /admin/login => https://shop.fed.lagou.com/api/admin/login
        target: 'https://shop.fed.lagou.com/api', // 代理的目标地址
        // 兼容基于名字的虚拟主机
        // 不同的origin指向不同的端口
        // a.com localhost:xxx
        // b.com localhost:xxx
        // HTTP 请求头部的 origin 字段
        // 我们在开发模式：默认的 origin 是真实的 origin：localhost:3000
        // changeOrigin: true，代理服务会把 origin 修改为目标地址 http://jsonplaceholder.typicode.com
        changeOrigin: true

        // 路径重写
        // http://jsonplaceholder.typicode.com/api/xxx
        //    /api/xxx => http://jsonplaceholder.typicode.com/api/xxx
        // http://jsonplaceholder.typicode.com/xxx
        //    /api/xxx => http://jsonplaceholder.typicode.com/api/xxx
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
