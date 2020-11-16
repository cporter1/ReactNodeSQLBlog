import axios from 'axios'

const baseURL = 'http://10.0.0.164:3000/'

const app = axios.create({
    baseURL,
    withCredentials: true
})

app.interceptors.response.use(
    response => (response),
    error => (Promise.reject(error.response.data.err))
)

export default app;