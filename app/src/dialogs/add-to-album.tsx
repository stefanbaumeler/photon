import { ETrans } from '@/types/translations'
import { Thumbnails } from '@/components'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { DialogContext } from '@/providers'
import { EThumbnailType, TThumbnail } from '@/types/app'
import { useAlbums } from '@/api/hooks'
import useAddToNewAlbum from '@/hooks/add-to-new-album'
import useAddToAlbum from '@/hooks/add-to-album'

const useAddToAlbumDialog = () => {
    const { t } = useTranslation()
    const dialog = useContext(DialogContext)
    const albums = useAlbums()
    const addToNewAlbum = useAddToNewAlbum()
    const addToAlbum = useAddToAlbum()

    const albumThumbnails = albums.state.map<TThumbnail>((album) => ({
        type: EThumbnailType.DEFAULT,
        title: album.title,
        idMedium: album.idMedium,
        onClick: () => addToAlbum(album.id)
    }))

    albumThumbnails.unshift({
        type: EThumbnailType.ADD,
        title: t(ETrans.NEW_ALBUM),
        onClick: addToNewAlbum
    })

    return () => dialog.open({
        title: t(ETrans.ADD_TO),
        buttons: [
            {
                label: t(ETrans.CANCEL),
                action: dialog.close,
                type: 'secondary'
            }
        ],
        content: <Thumbnails thumbnails={albumThumbnails} />
    })
}

export default useAddToAlbumDialog
