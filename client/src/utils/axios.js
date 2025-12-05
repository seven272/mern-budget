import axios from 'axios'

const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/api'
    : '/api'
//Свойство withCredentials в библиотеке Axios для работы с HTTP-запросами указывает, включать ли в запрос учётные данные (например, cookies и заголовки авторизации).
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
export default axiosInstance
