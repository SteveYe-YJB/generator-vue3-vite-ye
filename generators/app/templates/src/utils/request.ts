import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '@/store'
import router from '@/router/' // 最后加/避免识别到router.d.ts0

const request = axios.create({
  // baseURL: 'https://shop.fed.lagou.com/api/admin'
})

// 请求拦截器
request.interceptors.request.use(function (config: any) {
  // 统一设置用户身份token
  const user = store.state.user
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 控制登录过期的锁
let isRefreshing = false

// 响应拦截器
request.interceptors.response.use(function (response) {
  const status = response.data.status

  // 正确的情况
  if (!status || status === 200) {
    return response
  }

  // 统一处理接口响应错误,比如token异常,服务端异常
  // 统一处理登录过期,410000后端规定
  if (status === 410000) {
    // 锁住状态不处理,直接返回
    if (isRefreshing) return Promise.reject(response)
    isRefreshing = true
    ElMessageBox.confirm('您的登录已过期，您可以取消停留在此页面，或确认重新登录', '登录过期', {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(() => {
    // 清除本地过期的登录状态
      store.commit('setUser', null)
      // 跳转到登录页面
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    // 抛出异常
    }).finally(() => {
      isRefreshing = false
    })

    // 在内部消化掉这个业务异常,代码不会往后走
    return Promise.reject(response)
  }

  // 其它错误情况
  ElMessage.error(response.data.msg || '请求失败，请稍后重试')
  // 手动返回一个 Promise 异常
  return Promise.reject(response)
}, function (error) {
  return Promise.reject(error)
})
export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data)as T
  })
}
