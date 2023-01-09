import { Thumbnail } from './index'
import { EThumbnailType, TThumbnail } from '../types/app'
import { useEffect, useState } from 'react'
import { ETrans } from '../types/translations'
import { useTranslation } from 'react-i18next'
import useAddToNewAlbum from '../hooks/add-to-new-album'
import useAddToAlbum from '../hooks/add-to-album'
import { useQAlbums } from '../api'

export const Thumbnails = () => {
    const { t } = useTranslation()

    const { data: albums } = useQAlbums()
    const addToNewAlbum = useAddToNewAlbum()
    const addToAlbum = useAddToAlbum()

    const [thumbnails, setThumbnails]  = useState([])

    useEffect(() => {
        const albumThumbnails = albums?.albums.map<TThumbnail>((album) => ({
            type: EThumbnailType.DEFAULT,
            title: album.title,
            idMedium: album.cover.id,
            onClick: () => addToAlbum(album.id)
        })) || []

        albumThumbnails.push({
            type: EThumbnailType.ADD,
            title: t(ETrans.NEW_ALBUM),
            onClick: addToNewAlbum
        })

        setThumbnails(albumThumbnails)
    }, [albums])

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
