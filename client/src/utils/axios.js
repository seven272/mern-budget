import axios from 'axios'

const BASE_URL =
//  import.meta.env.MODE === 'development'
//     ? 'http://prank-sound.ru/project1/api'
//     : '/api'
 import.meta.env.MODE === 'development'
    ? 'http://185.251.89.77:5030/api'
    : '/api'
  // import.meta.env.MODE === 'development'
  //   ? 'http://localhost:5001/api'
  //   : '/api'
//Свойство withCredentials в библиотеке Axios для работы с HTTP-запросами указывает, включать ли в запрос учётные данные (например, cookies и заголовки авторизации).
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
export default axiosInstance
