import { useDetailsContext } from 'web/src/providers'
import { TAlbum, useQAlbums } from '@photon/schema'
import { useEffect, useState } from 'react'
import { Detail } from 'web/src/components'
import { useTranslation } from 'react-i18next'
import { ETrans } from 'web/src/types/translations'
import { formatDate } from 'web/src/util/date'
import { EDateFormat } from 'web/src/types/app'
import { DetailsSection } from 'web/src/components/Details/DetailsSection'

export const DetailsAlbums = () => {
    const details = useDetailsContext()
    const [albums, setAlbums] = useState<TAlbum[]>()
    const { t } = useTranslation()

    const albumsResult = useQAlbums({
        variables: {
            idMedium: details.medium.id
        },
        skip: !!albums
    })

    useEffect(() => {
        if (albumsResult.data) {
            setAlbums(albumsResult.data.albums)
        }
    }, [albumsResult.data])

    if (!albums?.length) {
        return <></>
    }

    const DetailsAlbum = ({ album }: { album: TAlbum}) => {
        const count = t(ETrans.ELEMENT_COUNT, {
            count: album.albumMedia.length
        })

        const date = formatDate(album.dateCreated, EDateFormat.SHORT)

        return <Detail
            icon={album.cover}
            title={album.title || ''}
            values={[count, date]}
        />
    }

    return <DetailsSection title={t(ETrans.ALBUM_PLURAL)}>
        {albums?.map((album, key) => <DetailsAlbum
            album={album}
            key={key}
        />)}
    </DetailsSection>
}
