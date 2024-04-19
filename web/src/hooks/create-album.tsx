import { useRouter } from 'next/router'
import { useMCreateAlbum } from '@photon/schema'

export const useCreateAlbum = () => {
    const router = useRouter()

    const [, createAlbumMutation] = useMCreateAlbum()

    return () => {
        createAlbumMutation({}).then((result) => {
            if (result.data) {
                router.push(`/albums/${result.data.createAlbum.id}`)
            }
        })
    }
}
