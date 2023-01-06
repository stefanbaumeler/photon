import { exec } from 'child_process'
import { setDbUrl } from './'
import { getEnv } from '../../env'

const env = getEnv()

setDbUrl()

exec(`docker exec photon-db-1 dropdb ${env.DB_DATABASE} -U ${env.DB_USER}`)
exec('rm ./packages/api/uploads/*')
