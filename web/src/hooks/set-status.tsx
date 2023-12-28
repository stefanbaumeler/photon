import { useMUpdateMedia } from '@photon/schema'
import { EMediumStatus } from '@/types/app'
import { asArray } from '@/util/as'

type Props = {
    media: { id: string }[] | Set<{ id: string }> | { id: string }
    status: EMediumStatus
}

export const useSetMediaStatus = ({
    media, status
}: Props) => {
    const ids = asArray(media).map(({ id }) => id)
    const [, updateMedia] = useMUpdateMedia()

    return async () => {
        await updateMedia({
            ids,
            status
        })
    }
}
