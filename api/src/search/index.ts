import { Client } from 'typesense'
import { getEnv } from '../../env'
import { Prisma } from '@prisma/client'
import { TUser } from '@photon/schema'

const env = getEnv()

let search: InstanceType<typeof Client>

export const getTypesense = () => {
    if (search) {
        return search
    }

    search = new Client({
        apiKey: env.TYPESENSE_ADMIN_KEY,
        nodes: [
            {
                host: env.TYPESENSE_HOST,
                port: parseInt(env.TYPESENSE_PORT, 10),
                protocol: parseInt(env.TYPESENSE_SECURE || '1', 10) ? 'https' : 'http'
            }
        ]
    })

    return search
}

export type SearchMedium = {
    id: string
    dateTaken?: string | null
    dateTakenSort?: number | null
    title?: string | null
    generatedTags?: string[] | null
    meta: Prisma.JsonValue
    mimetype?: string | null
    filenameDisk?: string | null
    status?: string | null
    favoredBy?: TUser | null
}
