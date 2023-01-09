import { exec } from 'child_process'
import { setDbUrl } from './index'
import { getEnv } from '../../env'

const env = getEnv()

setDbUrl()

exec(`docker exec photon-db-1 createdb ${env.DB_DATABASE} -U ${env.DB_USER}`, () => {
    exec('npx prisma db push --schema ../api/prisma/schema.prisma')
})
