import { useMDeleteAlbum } from '@photon/schema'
import { useRouter } from 'next/router'
import { asArray } from '@/util/as'

type Props = {
    id?: string | string[]
    callback?: () => void
}

const useDeleteAlbum = ({
    id, callback
}: Props) => {
    const router = useRouter()
    const idsToDelete = id ? asArray(id) : router.query.id

    const [, deleteMedia] = useMDeleteAlbum()

    return async () => {
        await deleteMedia({
            ids: idsToDelete
        })

        callback && callback()
        router.push('/albums')
    }
}

export default useDeleteAlbum
