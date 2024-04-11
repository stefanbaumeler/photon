import { useDetailsContext } from '@/providers'
import { TAlbum, useQAlbumsOfMedium } from '@photon/schema'
import { useMemo } from 'react'
import { Detail } from '@/components'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { formatDate } from '@/util/date'
import { EDateFormat } from '@/types/app'
import { DetailsSection } from '../index'

export const DetailsAlbums = () => {
    const details = useDetailsContext()
    const { t } = useTranslation()

    const [{ data: result }] = useQAlbumsOfMedium({
        variables: {
            id: details.medium.id
        }
    })

    const albums  = result?.mediumAlbums

    const a = useMemo(() => {
        const DetailsAlbum = ({ album }: { album: TAlbum}) => {
            const count = t(ETrans.ELEMENT_COUNT_NUMBER, {
                count: album.media?.length
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

    return albums?.length ? <DetailsSection title={t(ETrans.ALBUM_PLURAL)}>
        {a}
    </DetailsSection> : null
}
