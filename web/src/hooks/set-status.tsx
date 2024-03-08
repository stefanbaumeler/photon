import { useMUpdateMedia } from '@photon/schema'
import { EMediumStatus } from '@/types/app'

type Props = {
    media: string[]
    status: EMediumStatus
}

export const useSetMediaStatus = ({
    media, status
}: Props) => {
    const [, updateMedia] = useMUpdateMedia()
    return async () => {
        await updateMedia({
            ids: media,
            status
        })
    }
}
