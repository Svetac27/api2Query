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
    <a :class="['btn', { query: true, active: active_tab === 'query' }]" href="/query">
      Create Query
    </a>
    <a :class="['btn', { response: true, active: active_tab === 'response' }]" href="/response"
      >Response</a
    >
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
    margin-right: 10px;
    width: 150px;
    font-size: 16px;
    color: $primary;
    cursor: pointer;
    &.active {
      box-sizing: content-box;
      border: 3px solid rgba(#d2d2d2, 0.4);
      box-sizing: content-box;
    }
    &:hover {
      border: 3px solid rgba(#d2d2d2, 0.4);
    }
  }
}
</style>
