import { QAlbumDocument, useMSetAlbumCover } from '@photon/shared'
import { useContext } from 'react'
import { SelectionContext } from '@/providers'

const useSetAlbumCover = (idAlbum: string, idMedium?: string) => {
    const selection = useContext(SelectionContext)

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
