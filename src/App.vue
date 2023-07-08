<script setup>
import { ref } from 'vue'
import Api2Query from '@/components/Api2Query.vue'
import { useAuthStore } from '@/stores/auth.store'
const authStore = useAuthStore()

// const token = ref('')

// const setToken = () => {
//   authStore.setToken(token.value)
// }

const user = {
  email: 'admin@api2.dev',
  password: 'admin123456'
}

const onSubmit = async (values) => {
  let loginResponse = null
  try {
    loginResponse = await authStore.login(values.email, values.password)
  } catch (error) {
    console.log(error, loginResponse)
  }
}
</script>

<template>
  <main>
    <button @click="onSubmit(user)" class="login-btn">Log in</button>
    <!-- <input type="text" v-model="token" />
    <button @click="setToken">Set token</button> -->
    <Api2Query />
  </main>
</template>

<style scoped>
.login-btn {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  float: right;
}
</style>
