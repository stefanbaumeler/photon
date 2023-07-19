import { useMUpdateAlbum } from '@photon/schema'
import { useSelectionContext } from '@/providers'
import { useRouter } from 'next/router'

const useSetAlbumCover = (idAlbum?: string, idMedium?: string) => {
    const selection = useSelectionContext()
    const router = useRouter()

    idMedium = idMedium || [...selection.selected][0]?.id

    const [, setAlbumCover] = useMUpdateAlbum()

    return () => {
        if (idAlbum) {
            setAlbumCover({
                idAlbum,
                fields: {
                    cover: idMedium
                }
            }).then(() => {
                selection.clear()
                router.push('/albums')
            })
        }
    }
}

export default useSetAlbumCover
