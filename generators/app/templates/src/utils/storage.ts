// 获取本地缓存
// T是范型,调用方法时可以添加类型如：getItem<{a:string}>('user')
export const getItem = <T>(key: string) => {
  const data = window.localStorage.getItem(key)
  if (!data) return null
  // 避免转换出错比如不是完整的json格式
  try {
    return JSON.parse(data) as T // 指定最终返回的数据类型为调用方法传入的类型
  } catch (err) {
    return null
  }
}

// 设置本地缓存
export const setItem = (key: string, value: object | string | null) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 移除本地缓存
export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}
