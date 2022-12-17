import { exec } from 'child_process'

exec(`docker exec photon-db-1 dropdb ${process.env.PG_DATABASE_NAME} -U ${process.env.PG_DATABASE_USER}`)
exec('rm ./packages/api/uploads/*')
