import { useDetailsContext, useSearchContext, useSelectionContext } from '@/providers'
import { QAlbumsDocument, QFavoritesDocument, TMedium, useMSetMediaStatus } from '@photon/schema'
import { EMediumStatus } from '@/types/app'
import { useRouter } from 'next/router'

const useSetMediaStatus = (idMedia: TMedium[] | Set<TMedium> | TMedium, status: EMediumStatus) => {
    const details = useDetailsContext()
    const selection = useSelectionContext()
    const search = useSearchContext()

    const router = useRouter()

    let ids: string[]

    const idMediaAsMedium = idMedia as TMedium

    if (typeof idMediaAsMedium.id === 'undefined') {
        const arr = Array.from(idMedia as TMedium[] | Set<TMedium>)

        ids = arr.map((medium) => medium.id)
    }
    else {
        ids = [idMediaAsMedium.id]
    }

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
