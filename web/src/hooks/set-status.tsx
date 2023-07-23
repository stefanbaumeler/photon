import { useMSetMediaStatus } from '@photon/schema'
import { EMediumStatus } from '@/types/app'
import { asArray } from '@/util/as'

type Props = {
    media: { id: string }[] | Set<{ id: string }> | { id: string }
    status: EMediumStatus
    callback?: () => void
}

const useSetMediaStatus = ({
    media, status, callback
}: Props) => {
    const ids = asArray(media).map(({ id }) => id)
    const [, setMediaStatus] = useMSetMediaStatus()

    return async () => {
        await setMediaStatus({
            media: ids,
            status
        })

        callback && callback()
    }
}

export default useSetMediaStatus
