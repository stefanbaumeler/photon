import { useMDeleteFavorites } from '@photon/schema'
import { useDetailsContext, useSearchContext } from '@/providers'
import { useRouter } from 'next/router'

export const useRemoveFromFavorites = (mediaIds: string[]) => {
    const { hits: media } = useSearchContext()
    const router = useRouter()
    const details = useDetailsContext()

    const [, removeFromFavorites] = useMDeleteFavorites()

    return () => {
        removeFromFavorites({
            ids: mediaIds
        }).then(() => {
            const topLevelRoute = router.pathname.split('/')[1]

            if (topLevelRoute === 'favorites') {
                const idMedium = Array.isArray(router.query.idMedium) ? router.query.idMedium.join('') : router.query.idMedium

                if (idMedium) {
                    const index = media.findIndex((medium) => medium.id === idMedium)

                    let newSelected = media[index + 1]

                    if (!newSelected) {
                        newSelected = media[index - 1]
                    }

                    if (newSelected) {
                        details.open(newSelected.id)
                    }
                }
            }
        })
    }
}
