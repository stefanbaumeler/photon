import { QFavoritesDocument, QMediaDocument, useMAddToFavorites } from '@photon/schema'
import { useSelectionContext, useMediaContext } from '@/providers'

const useAddToFavorites = (mediaIds: string[]) => {
    const selection = useSelectionContext()
    const media = useMediaContext()

    const [addToFavorites] = useMAddToFavorites({
        variables: {
            media: mediaIds
        },
        refetchQueries: [{
            query: QMediaDocument,
            variables: {
                sort: media.sort
            }
        }, QFavoritesDocument]
    })

    return () => {
        addToFavorites().then(() => {
            selection.clear()
        })
    }
}

export default useAddToFavorites
