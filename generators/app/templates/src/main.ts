import { createApp } from 'vue'
import App from './App.vue'
// 引入vueRouter
import router from './router/index'
// 引入vueX
import { store, key } from './store'
// 引入全局样式
import './styles/index.scss'

const app = createApp(App)

// 自动注册全局组件
const modules = import.meta.globEager('./components/**/index.ts')
for (const path in modules) {
  app.use(modules[path].default)
}

app.use(router)
app.use(store, key)
app.mount('#app')
