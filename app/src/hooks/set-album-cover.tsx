import { QAlbumDocument, useMUpdateAlbum } from '@photon/schema'
import { useSelectionContext } from '@/providers'
import { useRouter } from 'next/router'

const useSetAlbumCover = (idAlbum?: string, idMedium?: string) => {
    const selection = useSelectionContext()
    const router = useRouter()

    idMedium = idMedium || [...selection.selected][0]?.id

    const [setAlbumCover] = useMUpdateAlbum({
        variables: {
            idAlbum,
            fields: {
                cover: idMedium
            }
        },
        refetchQueries: [{
            query: QAlbumDocument,
            variables: {
                id: idAlbum
            }
        }]
    })

    return () => {
        if (idAlbum) {
            setAlbumCover().then(() => {
                selection.clear()
                router.push('/albums')
            })
        }
    }
}

export default useSetAlbumCover
