import { useMEmptyTrash } from '@photon/schema'

export const useEmptyTrash = () => {
    const [, emptyTrash] = useMEmptyTrash()

    return async () => {
        await emptyTrash({})
    }
}
