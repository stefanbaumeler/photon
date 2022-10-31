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

    if (details?.active) {
        ids = [details.medium.id]
    }

    if (selection.mode === ESelectionMode.SELECT) {
        ids = Array.from(selection.selected).map((selected) => selected.id)
    }

    const [setMediaStatus] = useSetMediaStatusMutation({
        variables: {
            media: ids,
            status
        },
        refetchQueries: [MediaQueryDocument]
    })

    return () => {
        setMediaStatus().then(() => {
            selection.clear()

            if (status === EMediumStatus.ARCHIVED) {
                router.push('/archive', null, {
                    shallow: true
                })
            }
        })
    }
}

export default useSetMediaStatus
