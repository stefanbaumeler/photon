import { useDetailsContext, useSelectionContext, useMediaContext } from '@/providers'
import { QAlbumMediaDocument, QAlbumsDocument,
    QFavoritesDocument,
    QMediaDocument,
    TMedium,
    useMSetMediaStatus } from '@/api'
import { EMediumStatus } from '@/types/app'
import { useRouter } from 'next/router'

const useSetMediaStatus = (idMedia: TMedium[] | Set<TMedium> | TMedium, status: EMediumStatus) => {
    const details = useDetailsContext()
    const selection = useSelectionContext()
    const media = useMediaContext()

    const router = useRouter()

    const idAlbum = Array.isArray(router.query.idAlbum) ? router.query.idAlbum.join('') : router.query.idAlbum

    let ids: string[]
    let previousStatus

    const idMediaAsMedium = idMedia as TMedium

    if (typeof idMediaAsMedium.id === 'undefined') {
        const arr = Array.from(idMedia as TMedium[] | Set<TMedium>)

        ids = arr.map((medium) => medium.id)
        previousStatus = (arr[0]?.status || EMediumStatus.ALL) as EMediumStatus
    }
    else {
        ids = [idMediaAsMedium.id]
        previousStatus = idMediaAsMedium.status as EMediumStatus
    }

    const [setMediaStatus] = useMSetMediaStatus({
        variables: {
            media: ids,
            status
        },
        refetchQueries: [
            idAlbum ? {
                query: QAlbumMediaDocument,
                variables: {
                    id: idAlbum
                }
            } : undefined,
            {
                query: QMediaDocument,
                variables: {
                    status: previousStatus,
                    sort: media.sort
                }
            },
            {
                query: QMediaDocument,
                variables: {
                    status,
                    sort: media.sort
                }
            },
            QFavoritesDocument,
            QAlbumsDocument
        ]
    })

    return () => {
        setMediaStatus().then(() => {
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
