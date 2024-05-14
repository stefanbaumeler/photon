import { ETrans } from '@/types/translations'
import { formatDate } from '@/util/date'
import { EDateFormat, TCover } from '@/types/app'
import { useTranslation } from 'react-i18next'
import { TFlatMedium } from '@photon/schema/dist/client'
import { Detail } from '@/components/shared/Detail'

type TAlbumDetail = {
    id: string
    media?: Partial<TFlatMedium>[] | null
    cover?: TCover | null
    dateCreated: string
    title?: string | null
}

type Props = {
    album: TAlbumDetail
}

export const InfobarAlbum = ({ album }: Props) => {
    const { t } = useTranslation()

    const count = t(ETrans.ELEMENT_COUNT_NUMBER, {
        count: album.media?.length
    })

    const date = formatDate(album.dateCreated, EDateFormat.SHORT)

    return <Detail
        icon={album.cover ?? undefined}
        title={album.title ?? undefined}
        values={[count, date]}
        testId="album-detail"
        href={`/albums/${album.id}`}
    />
}
