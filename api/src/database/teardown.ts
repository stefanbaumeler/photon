import { exec } from 'child_process'
import { setDbUrl } from '.'
import { getEnv } from '../../env'

const env = getEnv()

setDbUrl()

exec(`docker exec db_c dropdb --if-exists ${env.DB_DATABASE} -U ${env.DB_USER}`, (error) => {
    if (error !== null) {
        throw error
    }
})

exec('rm ./packages/api/uploads/*')
