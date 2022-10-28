const { exec } = require('child_process')
const dotenv = require('dotenv')

dotenv.config({
    path: process.env.NODE_ENV ? `./api/.env.${process.env.NODE_ENV}` : './api/.env'
})

exec('yarn workspace @photon/api knex seed:run', (a, b, c) => {
    console.log(a, b, c)
})
