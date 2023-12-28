import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import devEnv from './data/dev'
import testEnv from './data/test'
import { getEnv } from '../env'
import { setDbUrl } from '../src/database'
import path from 'path'
import fs from 'fs'
import AdmZip from 'adm-zip'
import https from 'https'

export async function seedDatabase (setup: string, force = false) {
    const env = getEnv()
    setDbUrl()
    const uploadsDir = path.join(__dirname, '../', env.API_UPLOADS_DIR)
    const zipPath = path.join(__dirname, `./data/${setup}/uploads.zip`)

    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir)
    }

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

        zip.extractAllTo(uploadsDir)
    }

    if (fs.existsSync(zipPath) && !force) {
        // console.log(`Found cached files for setup ${setup}. If you want to refetch the files from the server, run "yarn seed ${setup} -f"`)
        await unzip()
    } else {
        const download = fs.createWriteStream(zipPath)

        https.get(`https://stefan-baumeler.com/photon/${setup}-data.zip`, async (response) => {
            response.pipe(download)

            download.on('finish', async () => {
                download.close()
                await unzip()
            })
        })
    }

    if (setup === 'dev') {
        await devEnv()
        return
    }

    if (setup === 'test') {
        await testEnv()
    }
}

export const seed = async (setup = 'dev', force = false) => {
    await seedDatabase(setup, force)
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
}
