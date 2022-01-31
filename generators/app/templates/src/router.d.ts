// 为router添加meta字段的ts检测
import 'vue-router'

declare module 'vue-router' {
  // eslint-disable-next-line no-unused-vars
  interface RouteMeta {
    title?: string // 路由标题
    requiresAuth?: boolean // 判断是否需要检测当前路由需要登陆,加？为可选
  }
}
