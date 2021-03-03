import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
