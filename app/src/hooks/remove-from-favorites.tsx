import { QFavoritesDocument, QMediaDocument, useMRemoveFromFavorites } from '@photon/schema'
import { useSelectionContext, useMediaContext, useDetailsContext } from '@/providers'
import { useInstantSearch } from 'react-instantsearch-hooks-web'
import { useRouter } from 'next/router'

const useRemoveFromFavorites = (mediaIds: string[]) => {
    const selection = useSelectionContext()
    const media = useMediaContext()
    const instantSearch = useInstantSearch()
    const router = useRouter()
    const details = useDetailsContext()

    const [removeFromFavorites] = useMRemoveFromFavorites({
        variables: {
            media: mediaIds
        },
        refetchQueries: [
            {
                query: QMediaDocument,
                variables: {
                    sort: media.sort
                }
            },
            {
                query: QFavoritesDocument
            }
        ]
    })

    return () => {
        removeFromFavorites().then(() => {
            const topLevelRoute = router.pathname.split('/')[1]
            const idMedium = Array.isArray(router.query.idMedium) ? router.query.idMedium.join('') : router.query.idMedium
            instantSearch.refresh()

            if (topLevelRoute === 'favorites') {
                if (idMedium) {
                    const index = media.media.findIndex((medium) => medium.id === idMedium)

                    let newSelected = media.media[index + 1]

                    if (!newSelected) {
                        newSelected = media.media[index - 1]
                    }

                    if (newSelected) {
                        details.open(newSelected)
                    }
                }
            }
            selection.clear()
        })
    }
}

export default useRemoveFromFavorites
