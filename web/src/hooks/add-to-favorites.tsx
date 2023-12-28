import { useMInsertFavorites } from '@photon/schema'

export const useAddToFavorites = (mediaIds: string[]) => {
    const [, addToFavorites] = useMInsertFavorites()

    return () => {
        addToFavorites({
            ids: mediaIds
        })
    }
}
