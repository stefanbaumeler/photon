import { useContext } from 'react'
import { DetailsContext, DialogContext, SelectionContext } from '@/providers'
import { useDeleteMedia as useDeleteMediaMutation } from '@/types/api'
import { useAlbums, useMedia } from '@/api/hooks'

const useDeleteMedia = () => {
    const media = useMedia()
    const albums = useAlbums()
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const details = useContext(DetailsContext)

    const [deleteMedia] = useDeleteMediaMutation({
        variables: {
            ids: Array.from(selection.selected.size ? selection.selected : [details?.medium]).map((item) => item?.id)
        }
    })

    return () => {
        deleteMedia().then(() => {
            Promise.all([media.refetch(), albums.refetch()]).then(() => {
                selection.clear()
                dialog.close()
                details?.close()
            })
        })
    }
}

export default useDeleteMedia
