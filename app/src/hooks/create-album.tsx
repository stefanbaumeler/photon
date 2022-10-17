import { useAlbums } from '@/api/hooks'
import { useRouter } from 'next/router'
import { useCreateAlbum as useCreateAlbumMutation } from '@/types/api'

const useCreateAlbum = () => {
    const albums = useAlbums()
    const router = useRouter()

    const [createAlbumMutation] = useCreateAlbumMutation({
        variables: {
            media: []
        }
    })

    return () => {
        createAlbumMutation().then((result) => {
            router.push(`/albums/${result.data.createAlbum}`)
        })
    }
}

export default useCreateAlbum
