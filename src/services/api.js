import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.1.5:3001',
  timeout: 5000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    console.log('Request Config:', config)
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response Error:', error)
    return Promise.reject(error)
  }
)

export default api
