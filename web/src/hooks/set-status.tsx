import { useDialogContext, useSearchContext, useSelectionContext } from '@/providers'
import { useMSetMediaStatus } from '@photon/schema'
import { EMediumStatus } from '@/types/app'
import { useRouter } from 'next/router'
import { asArray } from '@/util/as'

const useSetMediaStatus = (media: { id: string }[] | Set<{ id: string }> | { id: string }, status: EMediumStatus) => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const search = useSearchContext()

    const router = useRouter()

    const ids = asArray(media).map(({ id }) => id)

    const [, setMediaStatus] = useMSetMediaStatus()

    return () => {
        setMediaStatus({
            media: ids,
            status
        }).then(() => {
            dialog.close()
            selection.clear()

            if (status === EMediumStatus.ARCHIVED) {
                search.setStatus(status)

                router.push('/archive', null, {
                    shallow: true
                })
            }
        })
    }
}

export default useSetMediaStatus
