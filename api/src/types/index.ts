import { TMeta } from '@photon/schema/server'

export * from './user'
export * from './album'

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace PrismaJson {
        type Meta = TMeta
    }
}
