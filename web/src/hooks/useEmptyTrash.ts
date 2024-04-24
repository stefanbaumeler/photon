import { useMEmptyTrash } from '@photon/schema/dist/client'

export const useEmptyTrash = () => {
    const [, emptyTrash] = useMEmptyTrash()

    return async () => {
        await emptyTrash({})
    }
}
