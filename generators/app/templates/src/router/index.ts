import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
// import { store } from '@/store'

// 路由跳转进度条
import nprogress from 'nprogress' // 需要安装npm i --save-dev @types/nprogress 进行类型补充
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: { title: '首页' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(), // 路由模式
  routes // 路由规则
})

// 全局前置守卫,不需要next,直接return false 就可以中断路由
router.beforeEach((to, from) => {
  nprogress.start() // 开始加载进度条
  // 检测是否需要登陆才可以访问
  // if (to.meta.requiresAuth && !store.state.user) {
  //   // 此路由需要授权，请检查是否已登录
  //   // 如果没有，则重定向到登录页面
  //   return {
  //     path: '/login',
  //     // 保存我们所在的位置，以便以后再来
  //     query: { redirect: to.fullPath }
  //   }
  // }
})

// 全局后置守卫
router.afterEach(() => {
  nprogress.done() // 加载进度条
})

export default router
