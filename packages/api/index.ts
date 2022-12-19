import dotenv from 'dotenv'
import { startServer } from './src/server'

dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
})

console.log(process.env.API_URL)

startServer()
