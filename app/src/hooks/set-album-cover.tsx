import { AlbumQueryDocument,
    useSetAlbumCover as useSetAlbumCoverMutation } from '@/types/api'
import { useContext } from 'react'
import { SelectionContext } from '@/providers'

const useSetAlbumCover = (idAlbum: string, idMedium?: string) => {
    const selection = useContext(SelectionContext)

    idMedium = idMedium || [...selection.selected][0]?.id

    const [setAlbumCover] = useSetAlbumCoverMutation({
        variables: {
            idAlbum,
            idMedium
        },
        refetchQueries: [{
            query: AlbumQueryDocument,
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
