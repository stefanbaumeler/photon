'use client'

import { useQAlbumsOfMedium } from '@photon/schema/dist/client'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { useParams } from 'next/navigation'
import { InfobarSection } from '@/components/shared/Infobar/components/InfobarSection'
import { InfobarAlbum } from '@/components/shared/Infobar/components/InfobarAlbum'

export const InfobarAlbums = () => {
    const { t } = useTranslation()
    const params = useParams()

    const id = Array.isArray(params.idMedium) ? params.idMedium[0] : params.idMedium

    const [{ data: result }] = useQAlbumsOfMedium({
        variables: {
            id: id ?? ''
        },
        pause: !id
    })

    const albums  = result?.mediumAlbums.albums

    return albums?.length ? <InfobarSection title={t(ETrans.ALBUM_PLURAL)}>
        {albums?.map((album, key) => <InfobarAlbum
            album={album}
            key={key}
        />)}
    </InfobarSection> : null
}
