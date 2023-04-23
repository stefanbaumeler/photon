import { Client } from 'typesense'
import { getEnv } from '../../env'
import { TMedium } from '@photon/schema'

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

export interface SearchMediumProps extends Omit<TMedium, 'favoredBy'> {
    dateTakenSort: number
    isFavorite: boolean
    isArchived: boolean
    isTrash: boolean
    albums: string[]
    favoredBy?: string[]
}
