import { useRouter } from 'next/router'
import { QAlbumsDocument, useMCreateAlbum } from '@photon/schema'

const useCreateAlbum = () => {
    const router = useRouter()

    const [, createAlbumMutation] = useMCreateAlbum()

    return () => {
        createAlbumMutation({}).then((result) => {
            router.push(`/albums/${result.data.createAlbum.id}`)
        })
    }
}

export default useCreateAlbum
