import { useDetailsContext, useSearchContext, useSelectionContext } from '@/providers'
import { QAlbumsDocument, QFavoritesDocument, useMSetMediaStatus } from '@photon/schema'
import { EMediumStatus } from '@/types/app'
import { useRouter } from 'next/router'
import { asArray } from '@/util/as'

const useSetMediaStatus = (media: { id: string }[] | Set<{ id: string }> | { id: string }, status: EMediumStatus) => {
    const details = useDetailsContext()
    const selection = useSelectionContext()
    const search = useSearchContext()

    const router = useRouter()

    const ids = asArray(media).map(({ id }) => id)

    const [setMediaStatus] = useMSetMediaStatus({
        variables: {
            media: ids,
            status
        },
        refetchQueries: [
            {
                query: QFavoritesDocument
            },
            {
                query: QAlbumsDocument
            }
        ]
    })

    return () => {
        setMediaStatus().then(() => {
            search.instantSearch.refresh()
            selection.clear()
            details?.close()

            if (status === EMediumStatus.ARCHIVED) {
                router.push('/archive', null, {
                    shallow: true
                })
            }
        })
    }
}

export default useSetMediaStatus
