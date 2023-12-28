import { Thumbnail } from '.'
import { EThumbnailType, TThumbnail } from '@/types/app'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useAddToNewAlbum, useAddToAlbum } from '@/hooks/'
import { useQAlbums } from '@photon/schema'

export const Thumbnails = () => {
    const { t } = useTranslation()

    const [{ data: albums }] = useQAlbums()
    const addToNewAlbum = useAddToNewAlbum()
    const addToAlbum = useAddToAlbum()

    const thumbnails = albums?.albums.map<TThumbnail>((album) => ({
        type: EThumbnailType.DEFAULT,
        title: album.title,
        idMedium: album.cover?.id,
        onClick: () => addToAlbum(album.id)
    })) || []

    thumbnails.push({
        type: EThumbnailType.ADD,
        title: t(ETrans.NEW_ALBUM),
        onClick: addToNewAlbum
    })

    return <div className="thumbnails">
        {thumbnails.map((thumbnail, k) => <Thumbnail
            title={thumbnail.title}
            idMedium={thumbnail.idMedium}
            key={k}
            onClick={thumbnail.onClick}
            type={thumbnail.type}
        />)}
    </div>
}
