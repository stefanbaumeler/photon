import { useRouter } from 'next/router'
import { QAlbumsDocument, useMCreateAlbum } from '../api'

const useCreateAlbum = () => {
    const router = useRouter()

    const [createAlbumMutation] = useMCreateAlbum({
        variables: {
            album: {},
            media: []
        },
        refetchQueries: [QAlbumsDocument]
    })

    return () => {
        createAlbumMutation().then((result) => {
            router.push(`/albums/${result.data.createAlbum.id}`)
        })
    }
}

export default useCreateAlbum
