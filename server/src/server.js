import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import { connectDB } from './config/db.js'
import corsOptions from './config/corsOptions.js'
import recordsRoute from './routes/recordsRoute.js'
import authRoute from './routes/authRoute.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
// чтобы парсить вложенные данные(например обьекты) передаваемые в req.body
app.use(express.urlencoded({ extended: true }))
app.use('/api', recordsRoute)
app.use('/api/auth', authRoute)

const start = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Сервер успешно запущен на порту ${PORT}`)
    })
  } catch (error) {
    console.log(`Ошибка при подкючении с серверу ` + error)
  }
}

start()
