import { useContext } from 'react'
import { DetailsContext, SelectionContext } from '@/providers'
import { MediaQueryDocument, TMedium, useSetMediaStatus as useSetMediaStatusMutation } from '@photon/shared'
import { EMediumStatus } from '@/types/app'
import { useRouter } from 'next/router'

const useSetMediaStatus = (idMedia: TMedium[] | Set<TMedium> | TMedium, status: EMediumStatus) => {
    const details = useContext(DetailsContext)
    const selection = useContext(SelectionContext)
    const router = useRouter()

    let ids: string[]
    let previousStatus

    const idMediaAsMedium = idMedia as TMedium

    if (typeof idMediaAsMedium.id !== 'undefined') {
        ids = [idMediaAsMedium.id]
        previousStatus = idMediaAsMedium.status as EMediumStatus
    }
    else {
        const arr = Array.from(idMedia as TMedium[] | Set<TMedium>)

        ids = arr.map((medium: TMedium) => medium.id)
        previousStatus = (arr[0]?.status || EMediumStatus.DEFAULT) as EMediumStatus
    }

    const [setMediaStatus] = useSetMediaStatusMutation({
        variables: {
            media: ids,
            status
        },
        refetchQueries: [{
            query: MediaQueryDocument,
            variables: {
                status: previousStatus
            }
        },
        {
            query: MediaQueryDocument,
            variables: {
                status
            }
        }]
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
