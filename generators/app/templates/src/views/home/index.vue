<template>
  <div>home</div>
  <div> {{ $store.state.msg }}</div>
  <div> {{ store.state.msg }}</div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/index'
console.log('home')

const store = useStore()

console.log(store.state.msg)

</script>

<style lang="scss" scoped>
div {
  color: $color;
}
</style>
