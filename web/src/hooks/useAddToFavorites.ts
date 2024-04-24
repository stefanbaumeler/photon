import { useMInsertFavorites } from '@photon/schema/dist/client'

export const useAddToFavorites = (mediaIds: string[]) => {
    const [, addToFavorites] = useMInsertFavorites()

    return () => {
        addToFavorites({
            ids: mediaIds
        })
    }
}
