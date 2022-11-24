import { useRouter } from 'next/router'
import { QAlbumsDocument, useMCreateAlbum } from '@photon/shared'

const useCreateAlbum = () => {
    const router = useRouter()

    const [createAlbumMutation] = useMCreateAlbum({
        variables: {
            media: []
        },
        refetchQueries: [QAlbumsDocument]
    })

    return () => {
        createAlbumMutation().then((result) => {
            router.push(`/albums/${result.data.createAlbum}`)
        })
    }
}

export default useCreateAlbum
