import { QFavoritesDocument, useMAddToFavorites } from '@photon/schema'
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
            }
        ]
    })

    return () => {
        addToFavorites().then(() => {
            search.instantSearch.refresh()
            selection.clear()
        })
    }
}

export default useAddToFavorites
