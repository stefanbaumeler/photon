import { useDetailsContext } from '@/providers'
import { TAlbum, useQAlbums } from '@photon/schema'
import { useEffect, useMemo, useState } from 'react'
import { Detail } from '@/components'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { formatDate } from '@/util/date'
import { EDateFormat } from '@/types/app'
import { DetailsSection } from './DetailsSection'

export const DetailsAlbums = () => {
    const details = useDetailsContext()
    const [albums, setAlbums] = useState<TAlbum[]>()
    const { t } = useTranslation()

    const [albumsResult] = useQAlbums({
        variables: {
            idMedium: details.medium.id
        }
    })

    useEffect(() => {
        if (albumsResult.data) {
            setAlbums(albumsResult.data.albums)
        }
    }, [albumsResult.data])

    const a = useMemo(() => {
        const DetailsAlbum = ({ album }: { album: TAlbum}) => {
            const count = t(ETrans.ELEMENT_COUNT, {
                count: album.media.length
            })

            const date = formatDate(album.dateCreated, EDateFormat.SHORT)

            return <Detail
                icon={album.cover}
                title={album.title || ''}
                values={[count, date]}
            />
        }

        return <>
            {albums?.map((album, key) => <DetailsAlbum
                album={album}
                key={key}
            />)}
        </>
    }, [albums, t])

    if (!albums?.length) {
        return <></>
    }

    return <DetailsSection title={t(ETrans.ALBUM_PLURAL)}>
        {a}
    </DetailsSection>
}
