import { QFavoritesDocument, QMediaDocument, useMRemoveFromFavorites } from '@photon/schema'
import { useSelectionContext, useMediaContext } from '@/providers'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

const useRemoveFromFavorites = (mediaIds: string[]) => {
    const selection = useSelectionContext()
    const media = useMediaContext()
    const instantSearch = useInstantSearch()

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
            instantSearch.refresh()
            selection.clear()
        })
    }
}

export default useRemoveFromFavorites
