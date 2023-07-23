import { useMAddToFavorites } from '@photon/schema'

const useAddToFavorites = (mediaIds: string[]) => {
    const [, addToFavorites] = useMAddToFavorites()

    return () => {
        addToFavorites({
            media: mediaIds
        })
    }
}

export default useAddToFavorites
