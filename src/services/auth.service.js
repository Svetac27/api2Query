import apiClient from './api.service.js'

export default {
  async login(email, password) {
    return await apiClient.post('/authentication/identity/callback', {
      user: { email, password }
    })
  },
  async getTables(token) {
    return await apiClient.post('/structure', { token })
  }
}
