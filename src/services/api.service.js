import axios from 'axios'
import { useAuthStore } from '../stores/auth.store'

const apiClient = axios.create({
  baseURL: 'https://api2.dev/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const userStore = useAuthStore()
    const token = userStore.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
