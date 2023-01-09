import { QAlbumDocument, useMUpdateAlbum } from '@/api'
import { useSelectionContext } from '@/providers'

const useSetAlbumCover = (idAlbum?: string, idMedium?: string) => {
    const selection = useSelectionContext()

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
            })
        }
    }
}

export default useSetAlbumCover
