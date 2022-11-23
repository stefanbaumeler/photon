const { exec } = require('child_process')
const dotenv = require('dotenv')

dotenv.config({
    path: process.env.NODE_ENV ? `./api/.env.${process.env.NODE_ENV}` : './api/.env'
})

const f = exec('node ./scripts/truncate-db.js')

f.stdout.pipe(process.stderr)
const ex = exec('yarn workspace @photon/api knex seed:run')

ex.stdout.pipe(process.stdout)
