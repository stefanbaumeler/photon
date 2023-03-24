// docker exec -t db_c pg_dump photos -c --if-exists -U stefanbaumeler > dump.sql

import { getEnv } from '../env'
import { promisify } from 'util'
import { exec } from 'child_process'
import path from 'path'
import reset from '../src/search/reset'
import https from 'https'
import fs from 'fs'
import AdmZip from 'adm-zip'
import { setDbUrl } from '../src/database'

const exc = promisify(exec)

export default async (setup: string, force = false) => {
    const env = getEnv()
    setDbUrl()
    const uploadsDir = path.join(__dirname, '../', env.API_UPLOADS_DIR)
    const zipPath = path.join(__dirname, `${setup}/uploads.zip`)

    const unzip = async () => {
        const zip = new AdmZip(zipPath)

        const dirents = fs.readdirSync(uploadsDir, {
            withFileTypes: true
        })

        const files = dirents
            .filter((dirent) => dirent.isFile())
            .map((dirent) => dirent.name)

        for (const file of files) {
            fs.unlinkSync(path.join(uploadsDir, file))
        }

        await zip.extractAllTo(uploadsDir)
    }

    if (fs.existsSync(zipPath) && !force) {
        // console.log(`Found cached files for setup ${setup}. If you want to refetch the files from the server, run "yarn seed ${setup} -f"`)
        await unzip()
    } else {
        const download = fs.createWriteStream(zipPath)

        https.get(`https://stefan-baumeler.com/photon/${setup}-data.zip`, async (response) => {
            response.pipe(download)

            await download.on('finish', async () => {
                download.close()
                await unzip()
            })
        })
    }

    try {
        const res = await exc(`PGPASSWORD=postgres psql ${env.DB_DATABASE} -U ${env.DB_USER} -h ${env.DB_HOST} -p ${env.DB_PORT} -f ${path.join(__dirname, setup, 'dump.sql')}`)
        if (res.stderr) {
            console.log(res.stderr)
        }
    }
    catch (err) {
        console.log(err)
    }
    await reset()
}
