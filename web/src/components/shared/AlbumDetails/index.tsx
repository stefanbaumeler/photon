'use client'

import { EDateFormat } from '@/types/app'
import { formatDate } from '@/util/date'
import { AlbumDetailsDates } from '@/components/shared/AlbumDetails/components/AlbumDetailsDates'
import { AlbumsDetailsBack } from '@/components/shared/AlbumDetails/components/AlbumsDetailsBack'
import { AlbumsDetailsTitle } from '@/components/shared/AlbumDetails/components/AlbumsDetailsTitle'
import { useQMedia } from '@photon/schema/dist/client'
import { useParams } from 'next/navigation'

export const AlbumDetails = () => {
    const params = useParams()

    const id = Array.isArray(params.idAlbum) ? params.idAlbum[0] : params.idAlbum

    const [mediaQuery] = useQMedia({
        variables: {
            album: id
        }
    })

    const media = mediaQuery.data?.media

    const earliest = media?.[0] ? formatDate(media[0].dateTaken, EDateFormat.LONG) : ''
    const latest = media?.[0] ? formatDate(media[media.length - 1].dateTaken, EDateFormat.LONG) : ''

    return <div className="album-details">
        <div className="album-details__header">
            <AlbumsDetailsBack />
            <AlbumsDetailsTitle />
            <AlbumDetailsDates
                earliest={earliest}
                latest={latest}
            />
        </div>
    </div>
}
