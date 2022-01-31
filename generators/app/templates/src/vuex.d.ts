/* eslint-disable no-unused-vars */
// 为html模板中的$store添加类型
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

// 声明自己的 store state
import { State } from './store/index'

declare module '@vue/runtime-core' {
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
