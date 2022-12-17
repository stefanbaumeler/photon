import { exec } from 'child_process'

exec(`docker exec photon-db-1 createdb ${process.env.PG_DATABASE_NAME} -U ${process.env.PG_DATABASE_USER}`, () => {
    exec('npx prisma db push --schema ../api/src/database/schema.prisma')
})
