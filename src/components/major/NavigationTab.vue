<script setup>
import { onMounted, ref } from 'vue'

const active_tab = ref('query')

onMounted(() => {
  const currentUrl = window.location.href
  active_tab.value = currentUrl.includes('response') ? 'response' : 'query'
})
</script>

<template>
  <section>
    <a :class="{ query: true, active: active_tab === 'query' }" href="/query"> Create Query </a>
    <a :class="{ response: true, active: active_tab === 'response' }" href="/response">Response</a>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/global.scss' as *;
section {
  display: flex;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin-right: 10px;
    height: 40px;
    width: 120px;
    font-size: 16px;
    color: $primary;
    cursor: pointer;
    &.active {
      background-color: $active;
      border: 0;
      border-bottom: 3px solid #d2d2d2;
      box-sizing: border-box;
    }
  }
}
</style>
