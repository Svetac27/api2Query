import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import authService from '@/services/auth.service.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useStorage('token', null),
    tables: useStorage('tables', {})
  }),
  hydrate(state, initialState) {
    // in this case we can completely ignore the initial state since we
    // want to read the value from the browser
    // state.user = useLocalStorage('pinia/auth/login', 'bob')
    state.token = useLocalStorage('token', null)
    state.user = useLocalStorage('user', {})
  },

  getters: {
    loggedIn: (state) => !!state.token
  },

  actions: {
    async login(username, password) {
      try {
        const response = await authService.login(username, password)
        const { token, user } = response.data
        this.token = token
        this.user = user
        return response
      } catch (err) {
        this.token = null
        this.user = null
        this.error = err
        throw new Error('Login failed: ' + err)
      }
    },
    async setToken(token) {
      this.token = token
    },
    async getTables() {
      try {
        await authService.getTables().then((response) => {
          this.tables = response.data
        })
      } catch (err) {
        this.error = err
        throw new Error('Get tables failed: ' + err)
      }
    }
  }
})
