import { useMUpdateAlbum } from '@photon/schema/dist/client'
import { useRouter } from 'next/navigation'
import { useSelectionContext } from '@/providers/SelectionProvider'

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
