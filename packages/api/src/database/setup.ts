import { exec } from 'child_process'
import dotenv from 'dotenv'
import { setDbUrl } from './'

dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
    override: true
})

setDbUrl()

exec(`docker exec photon-db-1 createdb ${process.env.DB_DATABASE} -U ${process.env.DB_USER}`, () => {
    exec('npx prisma db push --schema ../api/prisma/schema.prisma')
})
