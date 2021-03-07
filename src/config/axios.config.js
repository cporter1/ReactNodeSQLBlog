import axios from 'axios'
// All the axios options for backend requests

const app = axios.create({
    baseURL: [
        'http://192.168.1.66:3000',
        'http://192.168.1.157:3000',
        'http://localhost:3000',
        'http://10.0.0.164:3000',
        'http://10.0.0.97:3000',
      ],
    withCredentials: true,
    credentials: 'same-origin',
})

app.interceptors.response.use(
    response => (response),
    error => (Promise.reject(error.response.data.err))
)

export default app;