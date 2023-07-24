import { useMAddToFavorites } from '@photon/schema'

export const useAddToFavorites = (mediaIds: string[]) => {
    const [, addToFavorites] = useMAddToFavorites()

    return () => {
        addToFavorites({
            media: mediaIds
        })
    }
}
