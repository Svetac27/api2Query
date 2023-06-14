<script setup>
import { onMounted, ref } from 'vue'
import PostRequest from './major/PostRequest.vue'
import GetQuery from './major/GetQuery.vue'
import NavigationTab from './major/NavigationTab.vue'

onMounted(() => {
  const currentUrl = window.location.href
  active_tab.value = currentUrl.includes('response') ? 'response' : 'query'
})

var active_tab = ref('query')
</script>

<template>
  <section>
    <navigation-tab />
    <get-query v-if="active_tab === 'query'" />
    <post-request v-if="active_tab === 'response'" />
  </section>
</template>
<style lang="scss" scoped></style>
