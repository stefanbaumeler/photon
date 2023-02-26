import { exec } from 'child_process'
import { setDbUrl } from './'
import { getEnv } from '../../env'

getEnv()
setDbUrl()

exec('npx prisma db push --schema ../api/prisma/schema.prisma --accept-data-loss', (schemaError) => {
    if (schemaError !== null) {
        throw schemaError
    }
})
