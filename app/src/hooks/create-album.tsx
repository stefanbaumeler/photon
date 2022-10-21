import { useRouter } from 'next/router'
import { AlbumsQueryDocument, useCreateAlbum as useCreateAlbumMutation } from '@/types/api'

const useCreateAlbum = () => {
    const router = useRouter()

    const [createAlbumMutation] = useCreateAlbumMutation({
        variables: {
            media: []
        },
        refetchQueries: [AlbumsQueryDocument]
    })

    return () => {
        createAlbumMutation().then((result) => {
            router.push(`/albums/${result.data.createAlbum}`)
        })
    }
}

export default useCreateAlbum
