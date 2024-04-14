import { ETrans } from '@/types/translations'
import { formatDate } from '@/util/date'
import { EDateFormat, TCover } from '@/types/app'
import { Detail } from '@/components'
import { useTranslation } from 'react-i18next'
import { TMedium } from '@photon/schema'

type TAlbumDetail = {
    id: string
    media?: Partial<TMedium>[]
    cover?: TCover
    dateCreated: string
    title?: string
}

type Props = {
    album: TAlbumDetail
    onClick: () => void
}

export const DetailsAlbum = ({
    album, onClick
}: Props) => {
    const { t } = useTranslation()
    const count = t(ETrans.ELEMENT_COUNT_NUMBER, {
        count: album.media?.length
    })

    const date = formatDate(album.dateCreated, EDateFormat.SHORT)

    return <Detail
        icon={album.cover}
        title={album.title}
        values={[count, date]}
        testId="album-detail"
        href={`/albums/${album.id}`}
        onClick={onClick}
    />
}
