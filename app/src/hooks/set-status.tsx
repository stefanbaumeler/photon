import { useContext } from 'react'
import { DetailsContext, SelectionContext } from '@/providers'
import { MediaQueryDocument, useSetMediaStatus as useSetMediaStatusMutation } from '@/types/api'
import { EMediumStatus, ESelectionMode } from '@/types/app'
import { useRouter } from 'next/router'

const useSetMediaStatus = (status: string) => {
    const details = useContext(DetailsContext)
    const selection = useContext(SelectionContext)
    const router = useRouter()

    let ids: string[] = []
    let previousStatus = EMediumStatus.DEFAULT

    if (details?.active) {
        ids = [details.medium.id]
        previousStatus = details.medium.status as EMediumStatus
    }

    if (selection.mode === ESelectionMode.SELECT) {
        ids = Array.from(selection.selected).map((selected) => selected.id)
        previousStatus = Array.from(selection.selected)[0]?.status as EMediumStatus
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
