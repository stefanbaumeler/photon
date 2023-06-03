import { QFavoritesDocument, QMediaDocument, useMRemoveFromFavorites } from '@photon/schema'
import { useSelectionContext, useDetailsContext, useSearchContext } from 'web/src/providers'
import { useRouter } from 'next/router'

const useRemoveFromFavorites = (mediaIds: string[]) => {
    const selection = useSelectionContext()
    const { hits: media } = useSearchContext()
    const search = useSearchContext()
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
            search.instantSearch.refresh()

            if (topLevelRoute === 'favorites') {
                if (idMedium) {
                    const index = media.findIndex((medium) => medium.id === idMedium)

                    let newSelected = media[index + 1]

                    if (!newSelected) {
                        newSelected = media[index - 1]
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
