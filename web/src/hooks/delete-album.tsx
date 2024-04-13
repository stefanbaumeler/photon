import { useMDeleteAlbums } from '@photon/schema'
import { useRouter } from 'next/router'
import { asArray } from '@/util/as'

type Props = {
    id?: string | string[]
    callback?: () => void
}

export const useDeleteAlbum = ({
    id, callback
}: Props) => {
    const router = useRouter()
    const idsToDelete = id ? asArray(id) : router.query.id

    const [, deleteMedia] = useMDeleteAlbums()

    return async () => {
        await deleteMedia({
            ids: idsToDelete
        })

        console.log('after')

        callback && callback()
        router.push('/albums')
    }
}
