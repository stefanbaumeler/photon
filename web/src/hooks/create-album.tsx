import { useRouter } from 'next/navigation'
import { useMCreateAlbum } from '@photon/schema/dist/client'

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
