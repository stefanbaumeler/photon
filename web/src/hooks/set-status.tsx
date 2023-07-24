import { useMSetMediaStatus } from '@photon/schema'
import { EMediumStatus } from '@/types/app'
import { asArray } from '@/util/as'

type Props = {
    media: { id: string }[] | Set<{ id: string }> | { id: string }
    status: EMediumStatus
}

const useSetMediaStatus = ({
    media, status
}: Props) => {
    const ids = asArray(media).map(({ id }) => id)
    const [, setMediaStatus] = useMSetMediaStatus()

    return async () => {
        await setMediaStatus({
            media: ids,
            status
        })
    }
}

export default useSetMediaStatus
