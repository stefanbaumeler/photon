import { exec } from 'child_process'
import dotenv from 'dotenv'

dotenv.config({
    path: process.env.NODE_ENV ? `./api/.env.${process.env.NODE_ENV}` : './api/.env'
})

exec(`dropdb ${process.env.PG_DATABASE_NAME}`)
exec('rm ./api/uploads/*')
