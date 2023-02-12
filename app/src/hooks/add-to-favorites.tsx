import { QFavoritesDocument, QMediaDocument, useMAddToFavorites } from '@photon/schema'
import { useSelectionContext, useMediaContext } from '@/providers'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

const useAddToFavorites = (mediaIds: string[]) => {
    const selection = useSelectionContext()
    const media = useMediaContext()
    const instantSearch = useInstantSearch()

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
            instantSearch.refresh()
            selection.clear()
        })
    }
}

export default useAddToFavorites
