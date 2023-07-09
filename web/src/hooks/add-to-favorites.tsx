import { QFavoritesDocument, QMediaDocument, useMAddToFavorites } from '@photon/schema'
import { useSearchContext, useSelectionContext } from '@/providers'

const useAddToFavorites = (mediaIds: string[]) => {
    const selection = useSelectionContext()
    const search = useSearchContext()

    const [addToFavorites] = useMAddToFavorites({
        variables: {
            media: mediaIds
        },
        refetchQueries: [
            {
                query: QFavoritesDocument
            },
            {
                query: QMediaDocument
            }
        ]
    })

    return () => {
        addToFavorites().then(() => {
            search.refetch()
            selection.clear()
        })
    }
}

export default useAddToFavorites
