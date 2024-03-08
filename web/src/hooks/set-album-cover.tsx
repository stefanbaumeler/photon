import { useMUpdateAlbum } from '@photon/schema'
import { useSelectionContext } from '@/providers'
import { useRouter } from 'next/router'

export const useSetAlbumCover = (idAlbum?: string, idMedium?: string) => {
    const selection = useSelectionContext()
    const router = useRouter()

    idMedium = idMedium || [...selection.selected][0]

    const [, setAlbumCover] = useMUpdateAlbum()

    return () => {
        if (idAlbum) {
            setAlbumCover({
                id: idAlbum,
                cover: idMedium
            }).then(() => {
                selection.clear()
                router.push('/albums')
            })
        }
    }
}
