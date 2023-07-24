import { useMEmptyTrash } from '@photon/schema'

const useEmptyTrash = () => {
    const [, emptyTrash] = useMEmptyTrash()

    return async () => {
        await emptyTrash({})
    }
}

export default useEmptyTrash
