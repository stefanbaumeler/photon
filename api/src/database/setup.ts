import { exec } from 'child_process'
import { setDbUrl } from '.'
import { getEnv } from '../../env'

const env = getEnv()
setDbUrl()

exec(`docker exec db_c createdb ${env.DB_DATABASE} -U ${env.DB_USER}`, (error) => {
    if (error !== null) {
        throw error
    }
})

exec('prisma db push --schema ../api/prisma/schema.prisma --accept-data-loss', (schemaError) => {
    if (schemaError !== null) {
        throw schemaError
    }
})
