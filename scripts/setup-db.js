import { exec } from 'child_process'
import dotenv from 'dotenv'

dotenv.config({
    path: process.env.NODE_ENV ? `./api/.env.${process.env.NODE_ENV}` : './api/.env'
})

exec(`createdb ${process.env.PG_DATABASE_NAME}`, () => {
    exec('npx prisma db push --schema ../api/src/database/schema.prisma')
})
