import { QAlbumDocument, useMSetAlbumCover } from '@/api'
import { useSelectionContext } from '@/providers'

const useSetAlbumCover = (idAlbum: string, idMedium?: string) => {
    const selection = useSelectionContext()

    idMedium = idMedium || [...selection.selected][0]?.id

    const [setAlbumCover] = useMSetAlbumCover({
        variables: {
            idAlbum,
            idMedium
        },
        refetchQueries: [{
            query: QAlbumDocument,
            variables: {
                id: idAlbum
            }
        }]
    })

    return () => {
        setAlbumCover().then(() => {
            selection.clear()
        })
    }
}

export default useSetAlbumCover
