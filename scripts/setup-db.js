const { exec } = require('child_process')
const dotenv = require('dotenv')

dotenv.config({
    path: process.env.NODE_ENV ? `./api/.env.${process.env.NODE_ENV}` : './api/.env'
})

exec(`createdb ${process.env.PG_DATABASE_NAME}`, () => {
    exec('npx -w api knex migrate:latest')
})
