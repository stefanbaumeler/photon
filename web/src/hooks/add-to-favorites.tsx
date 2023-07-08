import { QFavoritesDocument, QMediaDocument, useMAddToFavorites } from '@photon/schema'
import { useSelectionContext } from '@/providers'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

const useAddToFavorites = (mediaIds: string[]) => {
    const selection = useSelectionContext()
    const instantSearch = useInstantSearch()

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
            instantSearch.refresh()
            selection.clear()
        })
    }
}

export default useAddToFavorites
