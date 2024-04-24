import { useMDeleteAlbums } from '@photon/schema/dist/client'
import { useParams, useRouter } from 'next/navigation'
import { asArray } from '@/util/as'

type Props = {
    id?: string | string[]
    callback?: () => void
}

export const useDeleteAlbum = ({
    id, callback
}: Props) => {
    const router = useRouter()
    const params = useParams()
    const idsToDelete = id ? asArray(id) : params.id

    const [, deleteMedia] = useMDeleteAlbums()

    return async () => {
        if (idsToDelete) {
            await deleteMedia({
                ids: idsToDelete
            })

            callback && callback()
            router.push('/albums')
        }
    }
}
