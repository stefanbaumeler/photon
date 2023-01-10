import { QFavoritesDocument, QMediaDocument, useMRemoveFromFavorites } from '@photon/schema'
import { useSelectionContext, useMediaContext } from '@/providers'

const useRemoveFromFavorites = (mediaIds: string[]) => {
    const selection = useSelectionContext()
    const media = useMediaContext()

    const [removeFromFavorites] = useMRemoveFromFavorites({
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
        removeFromFavorites().then(() => {
            selection.clear()
        })
    }
}

export default useRemoveFromFavorites
