import { useMAddToFavorites } from '@photon/schema'
import { useSelectionContext } from '@/providers'

const useAddToFavorites = (mediaIds: string[]) => {
    const selection = useSelectionContext()

    const [, addToFavorites] = useMAddToFavorites()

    return () => {
        addToFavorites({
            media: mediaIds
        }).then(() => {
            selection.clear()
        })
    }
}

export default useAddToFavorites
