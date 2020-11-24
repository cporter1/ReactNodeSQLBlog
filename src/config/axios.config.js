import axios from 'axios'


const app = axios.create({
    baseURL: [
        'http://10.0.0.97:3000',
        'http://localhost:3000',
        'http://10.0.0.164:3000'
      ],
    withCredentials: true,
    credentials: true,
})

app.interceptors.response.use(
    response => (response),
    error => (Promise.reject(error.response.data.err))
)

export default app;